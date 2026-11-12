# PRD (Product Requirements Document) — RideShare AAB
**Kursi:** Programimi për Pajisje Mobile (2026/2027) • **Kolegji AAB**
**Studenti:** Adnit Kamberi
**Data & Versioni:** Java 01 • Versioni 1.0 (draft për MVP)

## 1. Përdoruesi dhe Problemi Real
- **Kush e përjeton?** Studentët e AAB që udhëtojnë çdo ditë nga qytete të tjera drejt kampusit, si udhëtarë ose si shoferë me vende të lira.
- **Kur ndodh?** Në mëngjes para ligjëratave dhe pasdite pas tyre, kur shumë studentë lëvizin në të njëjtën kohë.
- **Si e zgjidhin sot?** Pyesin në biseda dhe grupe, presin përgjigje ose përdorin autobus e taksi. Shoferi nuk e di kush ka nevojë për vendet e lira.

## 2. Evidenca
Në ligjëratë punuam me një skenar të sajuar: Arta kërkon udhëtim për në AAB, Dreni niset në të njëjtën orë me dy vende të lira, por nuk e gjejnë njëri-tjetrin sepse informacioni është i shpërndarë. Biseda reale me studentë nuk kam bërë ende; janë hapi i parë për ta verifikuar problemin.

## 3. Hipoteza e Vlerës
> **Nëse** studentët kanë një PWA ku shoferi publikon nisjen, orën dhe vendet e lira, ndërsa udhëtari sheh listën dhe kërkon një vend,
> **atëherë** udhëtari e gjen udhëtimin pa pyetur nëpër grupe dhe shoferi i mbush vendet bosh.

## 4. Rrjedha Kryesore e Përdoruesit
1. **Lista:** udhëtari sheh udhëtimet për në AAB me orën dhe vendet e lira.
2. **Detajet:** hap një udhëtim dhe sheh vendtakimin dhe shoferin.
3. **Kërkesa:** shtyp “Kërko një vend”; kërkesa mbetet “Në pritje”.
4. **Përgjigjja:** shoferi e pranon ose e refuzon; udhëtari sheh statusin.

## 5. Kufijtë e MVP-së
- **BRENDA MVP-së (3 veçori):**
  1. Shoferi publikon udhëtimin me orën dhe vendet e lira.
  2. Udhëtari sheh listën dhe detajet dhe dërgon kërkesën për vend.
  3. Shoferi përgjigjet dhe statusi ruhet për të dy.
- **JASHTË MVP-së:**
  - Pagesat në aplikacion (para në dorë).
  - Harta me lëvizje live (mjafton vendtakimi i shkruar).
  - Chat-i i brendshëm (telefonatë ose mesazh direkt).

## 6. Kriteret e Pranimit
- [ ] **AC-1:** Lista shfaq për çdo udhëtim nisjen, orën dhe vendet e lira.
- [ ] **AC-2:** Pas kërkesës, udhëtari sheh “Në pritje”; një klikim i dytë nuk krijon kërkesë të dytë.
- [ ] **AC-3:** Pas pranimit, vendet e lira ulen me një; kur nuk ka vende, kërkesa nuk dërgohet.
- [ ] **AC-4:** Vetëm shoferi i udhëtimit mund ta pranojë ose ta refuzojë kërkesën.

## 7. Modeli Minimal i të Dhënave
```sql
profilet (id, emri, roli)
udhetimet (id, shofer_id, nisja, destinacioni, ora, vendtakimi, vende)
kerkesat (id, udhetim_id, udhetar_id, statusi, krijuar)
```

## 8. Rreziku Kryesor që Duhet Testuar
- **Rreziku:** A do të kenë besim studentët të udhëtojnë me dikë që nuk e njohin personalisht?
- **Prova:** biseda me disa studentë që udhëtojnë çdo ditë, para se të ndërtohet hyrja dhe roli i shoferit.
