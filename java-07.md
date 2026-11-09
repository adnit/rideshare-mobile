# RideShare · Java 7

Ruaje si **java-07.md**, pranë README në rrënjën e repository-t tënd. Plotëso me vëzhgimet e tua dhe plotëso çdo vend bosh përpara dorëzimit. Ruaj titujt dhe etiketat. Para/Pas janë dy URL të plota commit-esh nga i njëjti repository, me kodin e plotë prej 40 shenjash.

Pas Commit dhe Push, hap formularin e lëndës për **Java 7** dhe vendos linkun kryesor të repository-t. Rezultati vjen te komenti **Kontrolli automatik i dorëzimit**, nga github-actions[bot], në Issue-n tënd. Lexo 5/5 dhe çdo ✅/❌; nëse korrigjon, bëj Push dhe komento **rikontrollo** te i njëjti Issue. 5/5 është kontroll teknik, jo notë.

## Rasti im
GitHub: adnit
Kodi: P7-718
Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Rasti 2 · Pa vende
ID i udhëtimit në projektin tim: 3
Të dhënat fiktive të rastit: Gjakovë → AAB, ora 10:20, 2 vende; ora për provën e re 10:25. Rasti kufitar: 0 vende.

## Parashikimi
Në listë pres kartën “Gjakovë → AAB · 10:20” me “Vende të lira: 2”. Te /udhetimi/3 pres të njëjtën orë, vendtakimin dhe butonin “Kërko vend”, që hap “Simulim: Në pritje” pa rezervim real. Kur udhëtimi ka 0 vende, karta duhet të tregojë “Plot”, butoni te detajet duhet të jetë i çaktivizuar dhe asnjë faqe nuk duhet të premtojë vend. Arta duhet të kuptojë se duhet të zgjedhë një udhëtim tjetër dhe të ketë një rrugë të shpejtë për t’u kthyer te lista.

## Dy probleme
1. Me 0 vende, faqja e kërkesës mbetet rrugë pa dalje. Hapat: vendosa 0 vende për ID 3 dhe hapa drejtpërdrejt /udhetimi/3/kerkesa. Faqja shkruan vetëm “Nuk ka vende të lira.” me lidhjen “← Kthehu te detajet”; nuk i thotë Artës të zgjedhë udhëtim tjetër dhe nuk ka lidhje te lista.
2. I njëjti udhëtim shkruhet ndryshe në dy ekrane. Lista tregon “Gjakovë → AAB · 10:20” dhe “Plot” kur s’ka vende, ndërsa detajet tregojnë titullin “Gjakovë – AAB” dhe “Vende të lira: 0”. Nuk është gabim, por është paqartësi e vogël: Arta sheh dy formate për të njëjtën gjë.

## Korrigjimi
Skedari: aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx
Ky skedar është faqja e kërkesës demonstrative: lexon udhëtimin nga Neon me gjejUdhetimin(id) dhe, kur ka vende, shfaq “Simulim: Në pritje” pa ruajtur asgjë. Kur ka 0 vende, shfaqte vetëm “Nuk ka vende të lira.”. Shtova një fjali që thotë se kërkesa nuk u dërgua dhe që Arta duhet të zgjedhë udhëtim tjetër, plus butonin “Kthehu te lista”. Arsyeja: me 0 vende faqja nuk premton vend, por tani nuk e lë përdoruesin në rrugë pa dalje.

## Versionet
Para: https://github.com/adnit/rideshare-mobile/commit/66ab5bd03aec779b4b79895af03f1390be2fcfb0
Pas: https://github.com/adnit/rideshare-mobile/commit/d41e9d3ab584bf8ea305087c85ef61250ad6bdb3

## Provat që bëra
### Prova 1
Hapat: Hapa listën me ID 3 në 10:20 dhe 2 vende, klikova “Shiko” te karta Gjakovë, pastaj “Kërko vend”.
Pritshmëria: Karta dhe detajet tregojnë të njëjtin udhëtim (ID 3, 10:20, 2 vende); kërkesa tregon simulim, jo rezervim.
Vëzhgimi: Karta: “Gjakovë → AAB · 10:20 · Vende të lira: 2”. Adresa /udhetimi/3 tregoi 10:20, “Qendra e qytetit”, 2 vende dhe “Kërko vend”. Kërkesa tregoi “Simulim: Në pritje” dhe “Kërkesa për Gjakovë nuk është dërguar te shoferi.” Kufiri: asgjë nuk ruhet dhe shoferi nuk njoftohet.

### Prova 2
Hapat: Vendosa 0 vende për ID 3 në Neon, hapa listën, /udhetimi/3 dhe drejtpërdrejt /udhetimi/3/kerkesa; pastaj klikova “Kthehu te lista”.
Pritshmëria: Asnjë premtim për vend; faqja e kërkesës tregon pse dhe të kthen te lista.
Vëzhgimi: Karta tregoi “Plot”. Te detajet butoni “Nuk ka vende të lira” ishte i çaktivizuar dhe nuk kishte lidhje kërkese. Te /udhetimi/3/kerkesa u shfaq “Nuk ka vende të lira.”, “Kërkesa nuk u dërgua. Zgjidh një udhëtim tjetër nga lista.” dhe butoni “Kthehu te lista”, që hapi listën me tri kartat. Korrigjimi punoi.

### Prova 3
Hapat: Ndryshova vetëm orën e ID 3 në 10:25 dhe vendet përsëri në 2; rifreskova listën, detajet dhe kërkesën. Në fund e ktheva në 10:20.
Pritshmëria: Parashikimi: lista dhe detajet tregojnë 10:25 dhe kërkesa kthehet te simulimi, pa mesazhin për 0 vende.
Vëzhgimi: Karta tregoi “Gjakovë → AAB · 10:25 · Vende të lira: 2”, detajet 10:25 me “Kërko vend”, dhe kërkesa “Simulim: Në pritje”. Doli si u parashikua, sepse faqet lexojnë çdo herë nga Neon dhe kushti varet vetëm nga numri i vendeve.

## Ndryshimi i ri
Nuk e kam demonstruar ende me kolegun: isha i sëmurë dhe nuk isha në orë. Kontrollin me hyrje tjetër e bëra te Prova 3 (ora 10:25). Përgatitem ta shpjegoj skedarin dhe kushtin e vendeve në takimin e radhës.

## Ndihma nga AI
AI (Claude) më ndihmoi të ndiqja hapat e profesorit hap pas hapi dhe formantoi dokumentin.