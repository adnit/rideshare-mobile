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
Skedari: [PLOTËSO]
[PLOTËSO] Çfarë bën ky skedar, çfarë ndryshove dhe pse?

## Versionet
Para: [PLOTËSO]
Pas: [PLOTËSO]

## Provat që bëra
### Prova 1
Hapat: [PLOTËSO]
Pritshmëria: [PLOTËSO]
Vëzhgimi: [PLOTËSO]

### Prova 2
Hapat: [PLOTËSO]
Pritshmëria: [PLOTËSO]
Vëzhgimi: [PLOTËSO]

### Prova 3
Hapat: [PLOTËSO]
Pritshmëria: [PLOTËSO]
Vëzhgimi: [PLOTËSO]

## Ndryshimi i ri
[PLOTËSO] Hyrja që ndryshoi kolegu, çfarë parashikove dhe pse doli ai rezultat. Nëse nuk e ke demonstruar ende, shkruaje qartë.

## Ndihma nga AI
[PLOTËSO] Shëno ndihmën dhe çfarë verifikove vetë, ose: Nuk përdora AI.
