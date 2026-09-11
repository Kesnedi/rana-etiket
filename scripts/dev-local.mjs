import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
  throw new Error('Yerel SQLite başlatıcısı production ortamında kullanılamaz.');
}
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve('next/package.json'));
nextRequire('@next/env').loadEnvConfig(root, true, { info() {}, error() {} });
for (const [key, minimum] of [['ADMIN_PASSWORD', 12], ['AUTH_SECRET', 32]]) {
  if ((process.env[key]?.length ?? 0) < minimum) throw new Error(`${key} en az ${minimum} karakter olmalı.`);
}
if (!process.env.ADMIN_EMAIL) throw new Error('ADMIN_EMAIL tanımlanmalı.');
if (!process.env.SITE_URL || !['127.0.0.1', 'localhost'].includes(new URL(process.env.SITE_URL).hostname)) {
  throw new Error('Yerel SITE_URL localhost veya 127.0.0.1 olmalı.');
}
if (new URL(process.env.SITE_URL).protocol === 'http:' && process.env.COOKIE_SECURE === 'true') {
  throw new Error('HTTP yerel geliştirme için COOKIE_SECURE=false kullanın.');
}
const database = path.join(root, 'prisma', 'dev.db');
if (!existsSync(database)) throw new Error('Mevcut prisma/dev.db bulunamadı. Yerel yedeğinizi geri yükleyin; production veritabanına bağlanılmadı.');
// Process-level values take precedence over .env.local in Next.js. Never load
// .env.vercel.production or reuse a remote DATABASE_URL for local development.
process.env.NODE_ENV = 'development';
process.env.DATABASE_URL = `file:${database.replaceAll('\\', '/')}`;
process.env.RANA_LOCAL_DATABASE = 'sqlite';
const source = readFileSync(path.join(root, 'prisma/schema.prisma'), 'utf8');
if (!/provider\s*=\s*"postgresql"/.test(source)) throw new Error('Production PostgreSQL şeması bekleniyordu.');
const schema = source.replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"')
  .replace(/provider\s*=\s*"prisma-client-js"/, 'provider = "prisma-client-js"\n  output = "./client"');
const generatedDir = path.join(root, 'prisma/.local');
const schemaPath = path.join(generatedDir, 'schema.prisma');
mkdirSync(generatedDir, { recursive: true });
const generatedSchema = path.join(generatedDir, 'client/schema.prisma');
if (!existsSync(generatedSchema) || readFileSync(generatedSchema, 'utf8') !== schema || !existsSync(path.join(generatedDir, 'client/index.js'))) {
  writeFileSync(schemaPath, schema);
  const result = spawnSync(process.execPath, [require.resolve('prisma/build/index.js'), 'generate', '--schema', schemaPath], { env: process.env, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
const { PrismaClient } = require(path.join(generatedDir, 'client'));
const db = new PrismaClient();
try {
  const counts = await Promise.all([db.product.count(), db.sector.count(), db.blogPost.count(), db.adminSession.count(), db.rateLimit.count()]);
  console.log(`Yerel SQLite bağlantısı hazır: ${counts[0]} ürün, ${counts[1]} sektör, ${counts[2]} blog. Oturum tabloları erişilebilir.`);
} finally { await db.$disconnect(); }
if (!process.argv.includes('--generate-only')) {
  const args = process.argv.slice(2);
  const portIndex = args.findIndex(arg => arg === '--port' || arg === '-p');
  const localUrl = new URL(process.env.SITE_URL);
  const port = portIndex >= 0 ? args[portIndex + 1] : (localUrl.port || '3000');
  if (!/^\d+$/.test(port || '') || Number(port) < 1 || Number(port) > 65535) throw new Error('Geçersiz yerel port.');
  localUrl.port = port;
  process.env.SITE_URL = localUrl.origin;
  if (portIndex >= 0) args.splice(portIndex, 2);
  // An occupied port must fail rather than silently changing the browser Origin.
  const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', '--hostname', '127.0.0.1', '--port', port, ...args], { env: process.env, stdio: 'inherit' });
  child.on('exit', code => process.exit(code ?? 0));
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
}
