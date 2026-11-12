# RideShare — Java 9

## Çfarë ndërtova
Te detajet e udhëtimit shtova butonin “☆ Ruaj udhëtimin” për përdoruesin e kyçur. Pas klikimit ekrani reagon menjëherë: ylli mbushet, numri i të preferuarave rritet me një dhe shfaqet “Po presim konfirmimin e serverit.”, ndërsa butoni nuk nis ruajtje të tjera. Suksesi “★ I ruajtur” shfaqet vetëm pasi serveri kthen përgjigjen. Nëse ruajtja dështon, ylli dhe numri kthehen te vlerat e konfirmuara para klikimit dhe shfaqet “Nuk u ruajt. Provo përsëri.”

Komponenti (src/components/Preferimi.tsx) mban veç gjendjen e konfirmuar nga serveri dhe pamjen e përkohshme gjatë pritjes. Ruajtja bëhet në server (src/app/udhetimi/[id]/actions.ts dhe src/lib/preferimet.ts): identiteti merret nga sesioni, jo nga formulari, dhe preferimi ruhet në tabelën preferimet në Neon. Tabela ka çelës të dyfishtë (github_id, udhetim_id), prandaj një përdorues dhe një udhëtim kanë vetëm një rresht; shtimi përdor ON CONFLICT DO NOTHING. Kush nuk është i kyçur sheh “Hyr për ta ruajtur udhëtimin te të preferuarat.”

## Provat që bëra
### Prova 1: Ruajtja e suksesshme mbetet pas rifreskimit.
Hapat: me një përdorues të kyçur që nisi me 0 preferime hapa /udhetimi/2 dhe klikova “☆ Ruaj udhëtimin”, pastaj rifreskova faqen.
Pritshmëria: gjatë pritjes ylli dhe numri 1 shfaqen menjëherë si “Po ruhet…”; pas përgjigjes “★ I ruajtur”; pas rifreskimit preferimi mbetet sepse lexohet nga serveri.
Vëzhgimi: gjatë pritjes u shfaq “★ Po ruhet…”, butoni i çaktivizuar dhe “Të preferuarat 1”. Pas përgjigjes: “★ I ruajtur” dhe “U ruajt te të preferuarat.” Në databazë u krijua një rresht për udhëtimin 2. Pas rifreskimit u shfaq sërish “★ I ruajtur” me numrin 1. Një përdorues tjetër i kyçur e pa udhëtimin si të paruajtur, me 0 preferime.

### Prova 2: Gabimi i serverit nuk lë një sukses të rremë në ekran.
Hapat: në mjedisin lokal shtova përkohësisht një refuzim prove në veprimin e serverit, para shkrimit në databazë (aktivizohej vetëm me një variabël mjedisi), dhe klikova “☆ Ruaj udhëtimin” nga një udhëtim i paruajtur.
Pritshmëria: gjatë pritjes ylli dhe numri 1; pas refuzimit ylli bosh, numri 0 dhe “Provo përsëri”, pa rresht në databazë.
Vëzhgimi: gjatë pritjes u shfaq “★ Po ruhet…” me “Të preferuarat 1”; pas refuzimit butoni u bë “☆ Provo përsëri”, mesazhi “Nuk u ruajt. Provo përsëri.” dhe numri u kthye në 0. Në databazë nuk kishte asnjë rresht. Pastaj e hoqa refuzimin e provës nga kodi para commit-it dhe ruajtja punoi sërish (Prova 1).

### Prova 3: Klikimet e përsëritura nuk krijojnë kopje.
Hapat: klikova disa herë gjatë pritjes; pastaj hapa të njëjtin udhëtim në dy faqe dhe klikova ruajtjen në të dyja njëkohësisht.
Pritshmëria: butoni nuk pranon klikime gjatë pritjes, dhe edhe dy kërkesa të njëkohshme krijojnë vetëm një rresht për çiftin përdorues–udhëtim.
Vëzhgimi: klikimet gjatë pritjes nuk nisën ruajtje të reja. Me dy faqet njëkohësisht, të dyja treguan “★ I ruajtur” dhe “Të preferuarat 1”, dhe në databazë kishte vetëm një rresht për udhëtimin 1. Butoni i çaktivizuar nuk mjafton vetëm: kopjen e ndalon çelësi i dyfishtë në databazë.

## Ku gjendet puna
- Repository: https://github.com/adnit/rideshare-mobile
- SQL: aplikacioni/schema-java09.sql
- Skedarë të rinj: src/components/Preferimi.tsx, src/lib/preferimet.ts, src/app/udhetimi/[id]/actions.ts
- I ndryshuar: src/app/udhetimi/[id]/page.tsx

## Çfarë mbetet për përmirësim
Mund vetëm të shtosh një preferim; heqja e tij (opsionale këtë javë) dhe një faqe me listën e të preferuarave mbeten për më vonë. Pa internet ruajtja dështon dhe ekrani kthehet prapa, por ende nuk ka mesazh të veçantë për mungesën e lidhjes.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
AI (Claude) më ndihmoi të projektoj ndarjen e gjendjes, të shkruaj komponentin, veprimin e serverit dhe tabelën. Shpjegimin me kolegun nuk e kam bërë ende. Përgatitem ta shpjegoj pse një yll i mbushur nuk mjafton si provë ruajtjeje: ylli ndryshon në shfletues para përgjigjes, ndërsa vetëm përgjigjja e serverit dhe rreshti në databazë tregojnë që ruajtja ndodhi.
