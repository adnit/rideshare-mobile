# RideShare — Java 6 · PWA dhe puna offline

## Çfarë ndërtova
- **Manifesti** (src/app/manifest.ts) i jep aplikacionit emrin RideShare AAB, ikonat 192×192 dhe 512×512 dhe pamjen standalone; Next.js e shërben te /manifest.webmanifest.
- **Service worker** (public/sw.js), i regjistruar nga src/components/Pwa.tsx në layout, ruan në cache rideshare-public-v1 vetëm dokumentin offline, ikonat dhe listën publike. Për listën provon fillimisht serverin dhe ruan përgjigjen me kohën; kur serveri nuk arrihet, lexon kopjen.
- **Kopja publike** vjen nga /api/udhetimet dhe përmban vetëm gjashtë fushat publike të udhëtimit: pa profile, sesione ose sekrete. Faqja public/offline.html e shfaq atë vetëm për lexim; paneli, hyrja dhe ruajtjet nuk ruhen offline.

## Provat që bëra
### Prova 1: Manifesti dhe vizita online
Hapa /manifest.webmanifest: emri RideShare AAB, ikonat 192×192 dhe 512×512. Hapa faqen kryesore me internet; te Application → Service Workers /sw.js ishte aktiv dhe te Cache Storage → rideshare-public-v1 ishte /api/udhetimet. Te /offline.html pashë tri udhëtimet, mesazhin “Lista erdhi nga serveri” dhe kohën e ruajtjes. Instalimin në telefon nuk e provova.

### Prova 2: Pa internet dhe pas rifreskimit
Te tab-i i RideShare zgjodha Network → Offline në DevTools dhe rifreskova faqen. U hap lexuesi offline me tri kartat dhe kohën e kopjes së fundit. Butoni “Kërko vend” ishte i çaktivizuar, sepse kopja është vetëm për lexim: vendet mund të kenë ndryshuar dhe pa server asnjë rezervim nuk konfirmohet.

### Prova 3: Lidhja rikthehet
Me RideShare offline, në Neon ndryshova orën e ID 2 nga 08:15 në 08:25; kopja offline tregonte ende 08:15. Pasi e ktheva rrjetin në Online dhe klikova “Rifresko listën”, ID 2 tregoi 08:25 nga serveri me kohë të re ruajtjeje. Pastaj e riktheva orën në 08:15.

## Ku gjendet puna
- Repository: https://github.com/adnit/rideshare-mobile
- Skedarë të rinj: src/app/manifest.ts, src/app/api/udhetimet/route.ts, src/components/Pwa.tsx, public/sw.js, public/offline.html, public/icons/icon-192.png, public/icons/icon-512.png
- I ndryshuar: src/app/layout.tsx (importi dhe <Pwa />)

## Çfarë mbetet për përmirësim
Në vizitën e parë pa internet nuk ka ende kopje, prandaj lexuesi shfaq “Ende nuk ka listë të ruajtur”. Kopja mund të jetë e vjetër dhe shfletuesi mund ta fshijë; nuk është backup i databazës. Offline mund vetëm të lexosh; kërkesat dhe ruajtjet kërkojnë lidhje me serverin.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) me ndihmoi ne formatimin dhe shkrimin e ketije dokumenti.
