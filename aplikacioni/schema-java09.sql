-- Java 9 · Udhëtimet e preferuara. Ekzekuto në Neon SQL Editor, në databazën e RideShare.
-- Një preferim i përket një përdoruesi dhe një udhëtimi. Çelësi i dyfishtë (PRIMARY KEY)
-- lejon vetëm një rresht për çiftin përdorues–udhëtim, edhe kur kërkesa vjen disa herë.
CREATE TABLE IF NOT EXISTS preferimet (
  github_id TEXT NOT NULL REFERENCES profilet (github_id) ON DELETE CASCADE,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet (id) ON DELETE CASCADE,
  krijuar TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (github_id, udhetim_id)
);

SELECT github_id, udhetim_id, krijuar FROM preferimet ORDER BY krijuar;
