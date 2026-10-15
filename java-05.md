# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova
- **Identiteti:** kush je. E vërteton GitHub përmes OAuth; ID-ja e përdoruesit vjen nga sesioni i NextAuth, jo nga një fushë e formularit.
- **Roli:** çfarë lloj përdoruesi je (udhetar ose shofer). Ruhet në tabelën profilet në Neon; çdo hyrje e re fillon si udhetar dhe roli ndryshohet vetëm nga databaza.
- **Pronësia:** cilin udhëtim e zotëron. Kolona shofer_id te udhetimet. Serveri e ruan orën vetëm kur përdoruesi i sesionit është shofer dhe udhëtimi i përket atij (UPDATE ... WHERE id = ... AND shofer_id = ...).

Paneli /panel shfaq hyrjen, rolin dhe formularin; kontrolli i vërtetë bëhet në server te src/lib/lejet.ts.

## Provat që bëra
### Prova 1: Hyrja, rifreskimi dhe dalja
Para hyrjes, /panel shfaqi butonin “Hyr me GitHub”. Pasi hyra me GitHub, paneli tregoi emrin tim dhe rolin; pas rifreskimit emri dhe roli mbetën. Pasi klikova “Dil”, paneli kërkoi përsëri hyrje.

### Prova 2: Shoferi ndryshon udhëtimin e vet
Si shofer i ID 2 e ndryshova orën në 08:25. Paneli shfaqi “Ora u ruajt me sukses. Kontrollo listën dhe detajet.” Karta 2 në listë, detajet e /udhetimi/2 dhe SQL Editor treguan 08:25. Pastaj e riktheva orën në 08:15.

### Prova 3: Veprimi pa leje refuzohet
Në formularin e hapur ndryshova në DevTools vlerën e fushës së fshehur id nga 2 në 1 dhe klikova “Ruaj orën”. Paneli shfaqi “Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.” Në Neon verifikova që ID 1 mbeti 08:00 dhe i përket ende DEMO-SHOFER-2.

## Ku gjendet puna
- Repository: https://github.com/adnit/rideshare-mobile
- SQL: aplikacioni/schema-java05.sql
- Skedarë të rinj: src/lib/auth.ts, src/app/api/auth/[...nextauth]/route.ts, src/components/Hyrja.tsx, src/lib/lejet.ts, src/app/panel/actions.ts, src/app/panel/page.tsx
- I ndryshuar: src/app/page.tsx (lidhja “Hyr / Paneli im”); paketa e re next-auth@4.24.15

## Çfarë mbetet për përmirësim
Kërkesa për vend është ende simulim. Hapi tjetër: udhëtari i kyçur ruan kërkesën në databazë dhe shoferi i udhëtimit e pranon ose e refuzon, me të njëjtin kontroll pronësie në server. Gjithashtu roli tani caktohet me dorë në SQL Editor.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) më ndihmoi të bëjë testimet dhe shkruaj këtë dokument.
