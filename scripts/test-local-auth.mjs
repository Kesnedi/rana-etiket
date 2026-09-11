import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve('next/package.json'));
nextRequire('@next/env').loadEnvConfig(root, true, { info() {}, error() {} });
const base = new URL(process.argv[2] || 'http://127.0.0.1:3000');
assert.ok(['127.0.0.1', 'localhost'].includes(base.hostname), 'Bu test yalnızca yerel sunucuya gönderilebilir.');
const { PrismaClient } = require(path.join(root, 'prisma/.local/client'));
const db = new PrismaClient({ datasourceUrl: `file:${path.join(root, 'prisma/dev.db').replaceAll('\\', '/')}` });
let cookie;
try {
  const before = await Promise.all([db.product.count(), db.sector.count(), db.blogPost.count()]);
  for (const route of ['/', '/admin']) {
    const r = await fetch(new URL(route, base));
    assert.equal(r.status, 200, `${route} HTTP`);
    const html = await r.text();
    assert.ok(route === '/' ? html.includes('RANA') : html.includes('password'), `${route} içerik`);
    console.log(`${route}: HTTP 200 ve içerik doğrulandı.`);
  }
  const send = (origin, password) => fetch(new URL('/api/auth', base), {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password }),
  });
  assert.equal((await send('https://invalid.example', 'invalid-password')).status, 403);
  console.log('Yabancı Origin: 403.');
  assert.equal((await send(base.origin, 'invalid-password')).status, 401);
  console.log('Hatalı şifre: 401.');
  // SITE_URL is accepted even if the current local server uses another port.
  const login = await send(base.origin, process.env.ADMIN_PASSWORD);
  assert.equal(login.status, 200, 'Admin login');
  const setCookie = login.headers.get('set-cookie');
  assert.ok(setCookie?.includes('HttpOnly') && /SameSite=strict/i.test(setCookie));
  cookie = setCookie.split(';')[0];
  assert.ok((await db.adminSession.count()) > 0, 'DB session yazımı');
  const dashboard = await fetch(new URL('/admin/dashboard', base), { headers: { Cookie: cookie } });
  assert.equal(dashboard.status, 200);
  assert.ok((await dashboard.text()).includes('Dashboard'));
  console.log('Admin login: HTTP 200; DB oturumu, HttpOnly/SameSite cookie ve dashboard doğrulandı.');
  const logout = await fetch(new URL('/api/auth', base), { method: 'DELETE', headers: { Origin: base.origin, Cookie: cookie } });
  assert.equal(logout.status, 200);
  cookie = undefined;
  assert.deepEqual(await Promise.all([db.product.count(), db.sector.count(), db.blogPost.count()]), before);
  console.log(`Çıkış başarılı; katalog korundu: ${before.join(' / ')}.`);
} finally {
  if (cookie) await fetch(new URL('/api/auth', base), { method: 'DELETE', headers: { Origin: base.origin, Cookie: cookie } });
  await db.$disconnect();
}
