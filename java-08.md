# RideShare — Java 8

## Çfarë ndërtova
Te detajet e udhëtimit shtova zgjedhjen e vendtakimit në komponentin e klientit src/components/Vendtakimi.tsx. Arta mund ta shkruajë vendtakimin dhe ta konfirmojë: teksti që po shkruhet dhe vendtakimi i konfirmuar janë dy vlera të ndara me useState, dhe konfirmimi ruan tekstin e pastruar me trim(). Butoni “Përdor vendndodhjen time” kërkon pozicionin me navigator.geolocation.getCurrentPosition vetëm pas klikimit; suksesi tregon saktësinë në metra, ndërsa refuzimi, koha e mbaruar, pozicioni i padisponueshëm ose mungesa e mbështetjes tregojnë mesazh dhe lënë fushën manuale aktive. Leximi i udhëtimit nga Neon mbetet në server; komponenti përdoret edhe te faqja e provës /java-08-test me të dhëna fiktive.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Hapat: Hapa /java-08-test dhe /udhetimi/2, rifreskova faqen pa klikuar asgjë; pastaj klikova “Përdor vendndodhjen time” me lejen e pranuar dhe një pozicion prove me saktësi 37 m.
Pritshmëria: Faqja hapet pa kërkuar vendndodhjen; vetëm klikimi e nis kërkesën dhe suksesi e përfundon pritjen.
Vëzhgimi: Në hapje getCurrentPosition nuk u thirr dhe gjendja ishte idle. Pas klikimit u shfaq “Po kërkojmë vendndodhjen…”, pastaj “Pozicioni u mor…” dhe “Saktësia rreth 37 m”; butoni u bë sërish i përdorshëm. Shkrova Biblioteka dhe e konfirmova vetë, sepse koordinatat nuk e japin emrin e vendit.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Hapat: Me lejen e vendndodhjes të bllokuar klikova “Përdor vendndodhjen time”, pastaj shkrova Parkingu dhe klikova “Konfirmo në telefon”. Si simulim i timeout-it, në një shfletues prove zëvendësova getCurrentPosition me një funksion që kthen gabimin { code: 3 }.
Pritshmëria: Refuzimi dhe koha e mbaruar e përfundojnë pritjen, shfaqin mesazh dhe lejojnë vendtakimin manual.
Vëzhgimi: Refuzimi shfaqi “Leja u refuzua. Shkruaj vendtakimin vetë.” dhe Parkingu u konfirmua. Simulimi i timeout-it shfaqi fillimisht pritjen me butonin të çaktivizuar, pastaj “Koha mbaroi. Provo sërish ose shkruaj vendtakimin vetë.”, butoni u bë aktiv dhe Biblioteka u konfirmua manualisht. Pa navigator.geolocation u shfaq mesazhi për mungesën e mbështetjes dhe fusha manuale punoi.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Hapat: Para commit-it kontrollova listën e skedarëve që do të publikohen dhe kërkova në kod koordinata, adresa dhe skedarë .env.
Pritshmëria: Asnjë koordinatë reale, adresë ose sekret në skedarët e publikuar.
Vëzhgimi: Publikohen vetëm komponenti, faqja e provës, detajet, stilet, java-08.md dhe mobile-week08.json. Nuk u gjet asnjë koordinatë apo adresë; .env.local, node_modules dhe .next nuk janë në listë. Koordinatat e provës u përdorën vetëm në shfletuesin e testit dhe nuk ruhen; komponenti nuk e shfaq pozicionin, vetëm saktësinë.

## Ku gjendet puna
- Repository: https://github.com/adnit/rideshare-mobile
- Komponenti: aplikacioni/src/components/Vendtakimi.tsx
- Detajet: aplikacioni/src/app/udhetimi/[id]/page.tsx
- Faqja e provës: aplikacioni/src/app/java-08-test/page.tsx
- Konfigurimi i testit: mobile-week08.json

## Çfarë mbetet për përmirësim
Vendtakimi ruhet vetëm në gjendjen lokale të faqes: pas rifreskimit humbet dhe Dritoni nuk e sheh. Hapi i ardhshëm është ta ruaj në Neon për udhëtimin dhe kërkesën, me kontrollin e lejes në server, që shoferi ta lexojë.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Implementova komponentin Vendtakimi.tsx, faqen e provës dhe skedarin e të dhënave mobile-week08.json, duke validuar funksionalitetin përmes provave të automatizuara me pozicion fiktiv. Analizova logjikën e ndarjes së tekstit/vendtakimit dhe trajtimin e error.code, ndërsa AI shërbeu ekskluzivisht për formatimin e raportit.

## Prova me një hyrje të re
Provën me kolegun nuk e kam bërë ende; hyrjen e provova në shfletues dhe do ta përsëris me kolegun në klasë.
- Hyrja që provova: tekst me vetëm hapësira, pasi Biblioteka ishte konfirmuar.
- Parashikimi im para klikimit: shfaqet mesazh që kërkon plotësim dhe vendtakimi mbetet Biblioteka.
- Çfarë pashë realisht: “Shkruaj vendtakimin para se ta konfirmosh.” dhe vendtakimi i konfirmuar mbeti Biblioteka.
- Skedari dhe funksioni që e shpjegojnë: aplikacioni/src/components/Vendtakimi.tsx, funksioni konfirmo(): teksti.trim() bosh ndalon përditësimin e vendtakimit.
- Çfarë kuptova ose korrigjova: trim() e kthen tekstin me hapësira në bosh, prandaj kontrolli bëhet pas pastrimit dhe zgjedhja e mëparshme nuk fshihet.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.
