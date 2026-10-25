# Hades Web Güvenlik v2.2 — Beklenen sonuçlar

**Tarama hedefi:** `https://hadesxrd.github.io/hades-target-lab/`

Tarayıcı motorunun gerçek koduna göre beklenenler:

| Bulgu kodu / envanter | Dayanak | Beklenti |
|---|---|---|
| `mixed` | Ana HTML'deki `http://example.invalid/hades-demo-only.js` (etkisiz veri bloğu) | Bulgu |
| `form-http` | Ana HTML formunun `http://example.invalid/never-submit` adresi | Bulgu |
| `source-map` | JavaScript içindeki `sourceMappingURL` yorumları ve public `.map` dosyaları | Bulgu |
| `possible-static-secret` | JS'deki tamamen sahte GitHub ve AWS anahtar desenleri | Bulgu (değer maskeli) |
| OpenAPI envanteri | `<link href="openapi.json">` ve `openapi.json` | Envanter; bulgu olarak sayılmayabilir |
| API endpoint envanteri | `fetch(...)` ve HTML linkleri | Envanter; endpointlere otomatik istek yapılmaz |
| Firebase envanteri | JS `firebaseConfig` ve `.firebaseapp.com` işareti | Envanter; Firebase açık kanıtı değildir |
| Bağımlılık envanteri | `axios@1.6.0` ve `lodash@4.17.21` yazıları | Envanter; CVE doğrulaması değildir |
| `csp`, `framing`, `hsts`, `nosniff`, `referrer` | GitHub Pages'in gerçek HTTP başlıklarına bağlı | Kesin garanti yok |
| TLS | GitHub Pages geçerli HTTPS sertifikası | Geçerli sertifika beklenir; TLS açığı beklenmez |
| Cookie, redirect, CORS | GitHub Pages sunucu davranışına bağlı | Kasten kırık dinamik durum üretilemez |

**Sıfır bulgu çıkarsa:** Logda ana sayfanın HTTP 200 döndüğüne, JS dosyasının indirildiğine, `source_map` URL'lerinin GET aldığına ve toplam istek sayısına bak. Ekrandaki eski raporu yeni sonuç sanma.

**Yasal sınır:** Bu yalnızca kendi test alanındır. Tüm sahte kullanıcı kayıtları ve token desenleri kurgudur.
