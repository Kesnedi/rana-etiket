# Rana Etiket & Matbaa

## Yerel geliştirme ve production veritabanı ayrımı

`npm run dev`, mevcut `prisma/dev.db` dosyasını kullanan yerel SQLite sunucusunu başlatır.
PostgreSQL kurmanız gerekmez. `scripts/dev-local.mjs`, production şemasından aynı modellere
sahip SQLite şemasını ve istemcisini `prisma/.local/` içine üretir. Production istemcisini,
şemasını veya migration geçmişini değiştirmez; migration/reset/seed çalıştırmaz.
Mevcut yerel veritabanı bulunmazsa hata vererek durur.

`.env.local`, Next.js'te `.env` dosyasından önceliklidir. Yerel başlatıcı, yalnızca kendi
işleminde `DATABASE_URL` değerini mevcut SQLite dosyasına yönlendirir. Ortam dosyalarını
değiştirmez ve `.env.vercel.production` dosyasını yüklemez. Yönetici bilgileri Next.js'in
standart ortam sırasıyla okunur. `ADMIN_PASSWORD` en az 12, `AUTH_SECRET` en az 32 karakter
olmalıdır. HTTP yerel geliştirmede `COOKIE_SECURE=false` olmalıdır.

Yerel istemci/bağlantı kontrolü: `npm run db:local:generate`.
Yerel giriş testi: `node scripts/test-local-auth.mjs http://127.0.0.1:3000`.
Test secret değerleri yazdırmadan giriş, oturum cookie'si, dashboard, çıkış ve katalog
sayılarının korunduğunu kontrol eder.

Başka port gerekiyorsa `npm run dev -- --port 3001` kullanın; başlatıcı SITE_URL portunu
yalnızca bu işlem için eşler. Varsayılan 3000 portu doluysa eski proje terminalini
Ctrl+C ile kapatıp tekrar başlatın. Yerel derleme dosyaları `.next-local/` altında tutulur.

`npm run build`, Vercel/production içindir: PostgreSQL `DATABASE_URL` üzerinden migration
ve seed çalıştırır. Yerel SQLite testi için kullanılmamalıdır. Production akışı ve
`prisma/schema.prisma` PostgreSQL olarak korunur. Standart `npx prisma db pull` production
şemasını hedefler; yerel bağlantıyı kontrol etmek için `db:local:generate` kullanın.

Rana Etiket için kutu, ambalaj, etiket, tekstil etiketi ve kurumsal baskı kataloğu. Fiyat yerine ürün bazlı WhatsApp ve teklif formu akışını kullanır.

## Kurulum

Gereksinimler: Node.js 20+, npm veya pnpm.

```bash
npm install
npm run dev
```

Yerel geliştirme için mevcut `.env` ve `prisma/dev.db` dosyalarını kullanın. Eski `setup` scripti PostgreSQL geçişinden önce yazılmıştır; yerel onarım için çalıştırmayın. Yönetici hesabı `ADMIN_EMAIL` ve `ADMIN_PASSWORD` ile belirlenir.

Production kontrolü:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
npm run lint
npm run typecheck
npm run build
npm start
```

Yönetim paneli `/admin` adresindedir. Ürünler, kategoriler, sektörler, blog, görseller, ana sayfa, hakkımızda, üretim, iletişim/harita ayarları ve teklif talepleri panelden yönetilir. Medya yüklemeleri `public/uploads` altında benzersiz adlarla saklanır; teklif ekleri `storage/quotes` içinde yetkili admin oturumuyla okunur. İleride S3/R2’ye geçirmek için `lib/storage.ts` adapter’ını değiştirin.

WhatsApp numarası, Google Maps bağlantıları, yönlendirme URL’leri ve adres `Yönetim > Site ayarları` içinden güncellenir. Teklif formu yüklemeleri 8 MB ile sınırlıdır, uzantı ve içerik doğrulanır; formda honeypot, kaynak doğrulama ve IP tabanlı rate-limit bulunur.

Yerel veritabanı `prisma/dev.db` olarak korunur. Yedek almak için uygulamayı durdurup bu dosyayı kopyalayın. Vercel production, ana Prisma şeması ve `DATABASE_URL` üzerinden PostgreSQL kullanır.

`/kvkk`, `/gizlilik-politikasi` ve `/cerez-politikasi` sayfaları başlangıç metnidir; canlı kullanımdan önce hukuk danışmanı tarafından kontrol edilmelidir.
