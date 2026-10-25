# HADES BUG DENEME — v2.2 kontrol laboratuvarı

Bu paket özellikle **Hades-Web-Guvenlik-v2.2** ZIP'indeki `scanner.py` okunarak hazırlandı. Yalnızca sentetik veri içerir ve GitHub Pages ile statik yayımlanır.

## A) Depoya doğru yükleme — 404 çözümü

`https://github.com/hadesxrd/hades-target-lab` deposunun ana (`main`) dizinindeki **`bug bounty/` klasörü yerine**, ZIP'in içindeki `index.html` ve diğer dosyaları doğrudan depo köküne yükle.

- Doğru: `hades-target-lab/index.html`
- Yanlış: `hades-target-lab/bug bounty/index.html`

GitHub'da: **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Ardından aç:

**https://hadesxrd.github.io/hades-target-lab/**

Sitenin açık olması Hades'in bütün kontrollerini çalıştıracağı anlamına gelmez; varsayılan v2.2 en fazla 24 GET isteği yapar.

## B) Hades v2.2 ile test

1. Yerelde Hades v2.2 `Start.cmd` ile çalışır; panel adresi `http://127.0.0.1:8878/`.
2. Ana sayfa GitHub Pages URL'sini tarama kutusuna yapıştır.
3. İzinli kapsam kutusunu **yalnızca sana ait bu test sitesi için** onayla.
4. JavaScript, Source Map ve OpenAPI seçeneklerini açık tut; isteğe bağlı 3 sayfalık keşif modunu aç.
5. Sonuçta `source-map`, `possible-static-secret`, `form-http`, `mixed` gibi kodları ara. API yolları ve OpenAPI şemaları `Bulgular`dan farklı `Envanter` alanında olabilir.
6. Sonuçları `expected-v22-results.json` ve `BEKLENEN-SONUCLAR-v2.2.md` ile karşılaştır.

## C) 8 kategori için dürüst test sınırları

| v2.2 kategorisi | Bu GitHub Pages sitesinde | Beklenti |
|---|---|---|
| Yönlendirme zinciri | GitHub yönetir | 3xx üretme garantisi yok |
| API referansları | JS, HTML, OpenAPI, sahte `/api/v1/...json` | Endpoint envanterinde gösterilmeli; API'ler aktif test edilmez |
| Çerez ayarları | GitHub yanıt başlığı yönetir | Kusurlu `Set-Cookie` simüle edilemez |
| Güvenlik başlıkları | GitHub yanıtında ne varsa | CSP/XFO/HSTS gibi uyarılar ortama bağlı; garanti değil |
| Taşıma güvenliği | GitHub geçerli HTTPS sunar | TLS testi başarıyla geçmeli, TLS açığı görünmemesi normal |
| Source map | `assets/app.js.map`, `assets/api-probe.js.map` | `source-map` uyarısı / envanter |
| OpenAPI şemaları | `openapi.json` | Şema ve yollar envanterde |
| Bağımlılık envanteri | `assets/app.js` içinde sentetik `axios@1.6.0`, `lodash@4.17.21` | Sürüm ipucu envanteri |

Ek tespit: Ana sayfada inert `http://example.invalid/...` script referansı `mixed` uyarısı ve **gönderilmeyen** formun `http://example.invalid/never-submit` hedefi `form-http` uyarısı üretmelidir. Dış alan adları `.invalid` olduğu için gerçek sunucuya form gönderilmez; JavaScript türü yürütülebilir değildir.

Sahte `ghp_...`, `AKIA...` kalıpları yalnızca format eşleşmesi içindir; hiçbir gerçek hesabı açmaz. Gerçek token ekleme.

### Kritik ayrım

GitHub Pages'teki statik `api/v1/users/1002.json` herkese açıktır. Bunun adı **gerçek IDOR/BOLA açığı değildir**; v2.2'nin API kimlik denetimi yapmadığını da değiştirmez. Tarayıcının bunu yüksek riskli doğrulanmış açık olarak raporlamaması doğrudur.

## D) Kopyalanabilecek test URL'leri

- `https://hadesxrd.github.io/hades-target-lab/`
- `https://hadesxrd.github.io/hades-target-lab/openapi.json`
- `https://hadesxrd.github.io/hades-target-lab/assets/app.js`
- `https://hadesxrd.github.io/hades-target-lab/assets/app.js.map`
- `https://hadesxrd.github.io/hades-target-lab/api/v1/debug/config.json`
- `https://hadesxrd.github.io/hades-target-lab/api/v1/users/1002.json`

Not: `openapi.json` URL'sini tek başına tararsan şema envanteri çıkar, ancak ana HTML ve JS taranmamış olur. Tam test için **ana sayfanın URL'sini** kullan.

## E) Güvenlik

Bu lab sadece kullanıcıya ait GitHub Pages projesi için hazırlanmıştır. Site yalnızca sahte veriler, statik dosyalar ve eylemsiz test işaretleri içerir. Gerçek gizli anahtarları GitHub'a koyma.
