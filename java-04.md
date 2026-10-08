# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova
Lista dhe detajet nuk përdorin më të dhëna të shkruara në kod. Faqet thërrasin lexoUdhetimet dhe gjejUdhetimin te src/lib/udhetimet.ts, të cilat bëjnë pyetje SQL në tabelën udhetimet në Neon. Lidhja hapet te src/lib/db.ts me DATABASE_URL, që lexohet vetëm në server. Faqet janë force-dynamic, prandaj çdo rifreskim e lexon databazën përsëri.

## Provat që bëra
### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
Ndryshova orën e ID 2 nga 08:15 në 08:25 në SQL Editor, pa prekur kodin. Pas rifreskimit, karta 2 në listë tregoi 08:25 dhe detajet e /udhetimi/2 po ashtu 08:25.
E ktheva orën në 08:15 dhe pas rifreskimit lista dhe detajet treguan sërish 08:15. ID 3 ka ende zero vende me butonin “Nuk ka vende të lira” të çaktivizuar, dhe /udhetimi/99 shfaq “Udhëtimi nuk u gjet”.

### Prova 2: Lista bosh dhe rikthimi
Shtova WHERE false vetëm te pyetja e lexoUdhetimet dhe rifreskova listën. U shfaq “Nuk ka udhëtime për momentin.”, pa karta dhe pa mesazh gabimi. Asnjë rresht nuk u fshi nga databaza.
E hoqa WHERE false, rifreskova dhe u kthyen tri kartat.

### Prova 3: Lidhja mungon, rikthimi dhe siguria
Ndryshova përkohësisht emrin DATABASE_URL në DATABASE_URL_PA_TEST te .env.local dhe rinisa serverin. Lista shfaqi “Nuk u lidhëm me databazën. Provo përsëri.” me lidhjen “Provo përsëri”.
E riktheva emrin DATABASE_URL, rinisa serverin dhe pas rifreskimit u kthyen tri kartat. Skedari .env.local nuk shfaqet te ndryshimet e git-it, sepse .gitignore ka rreshtin .env*.

## Ku gjendet puna
- Tabela dhe tri rreshtat: aplikacioni/schema.sql
- Skedar i ri: aplikacioni/src/lib/db.ts
- Skedarë të ndryshuar: src/lib/udhetimet.ts, src/app/page.tsx, src/app/udhetimi/[id]/page.tsx, src/app/udhetimi/[id]/kerkesa/page.tsx dhe src/components/KartaUdhetimi.tsx
- Paketa të reja në package.json: @neondatabase/serverless dhe server-only
- Repository: https://github.com/adnit/rideshare-mobile

## Çfarë mbetet për përmirësim
Aplikacioni vetëm lexon: udhëtimet ndryshohen nga SQL Editor, jo nga aplikacioni. Kërkesa “Në pritje” mbetet simulim; nuk ka rezervim real dhe numri i vendeve nuk ulet. Hapi i ardhshëm është hyrja e përdoruesit, që të dihet kush është shofer dhe kush udhëtar.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) më ndihmoi të rishkruaj këtë file dhe verifikoj se gjithcka është në rregull.
