# Rana Etiket & Matbaa

Rana Etiket için kutu, ambalaj, etiket, tekstil etiketi ve kurumsal baskı kataloğu. Fiyat yerine ürün bazlı WhatsApp ve teklif formu akışını kullanır.

## Kurulum

Gereksinimler: Node.js 20+, npm veya pnpm.

```bash
npm install
npm run setup
npm run dev
```

`setup` komutu `.env` oluşturur, Prisma veritabanını hazırlar, başlangıç kataloğunu ve özgün SVG/WebP mockup görsellerini üretir. Yerel yönetici hesabı `ADMIN_EMAIL` ile belirlenir; rastgele şifre `.env` içinde tutulur. `ADMIN_PASSWORD` ve `AUTH_SECRET` değerlerini canlı ortamda güçlü değerlerle değiştirin.

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

Yerel veritabanı `prisma/dev.db` olarak oluşur. Yedek almak için uygulamayı durdurup bu dosyayı kopyalayın. Canlı deployment sırasında SQLite yerine platformun kalıcı SQL/R2 bağlayıcılarını kullanın; `.openai/hosting.json` içindeki mantıksal bağlamalar hazır bırakılmıştır.

`/kvkk`, `/gizlilik-politikasi` ve `/cerez-politikasi` sayfaları başlangıç metnidir; canlı kullanımdan önce hukuk danışmanı tarafından kontrol edilmelidir.
