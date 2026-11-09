"use client";

import { useState } from "react";

// Emrat teknikë që lexon testi te data-state; mesazhet për Artën janë në shqip.
type Gjendja = "idle" | "loading" | "success" | "denied" | "timeout" | "unavailable";

export function Vendtakimi() {
  // Teksti që po shkruhet dhe vendtakimi i konfirmuar janë dy vlera të ndara.
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [gabim, setGabim] = useState("");
  const [gjendja, setGjendja] = useState<Gjendja>("idle");
  const [mesazhi, setMesazhi] = useState("");
  const [saktesia, setSaktesia] = useState<number | null>(null);

  function konfirmo() {
    const pastruar = teksti.trim();
    if (!pastruar) {
      // Zgjedhja e mëparshme mbetet; vetëm tregojmë çfarë mungon.
      setGabim("Shkruaj vendtakimin para se ta konfirmosh.");
      return;
    }
    setGabim("");
    setVendtakimi(pastruar);
  }

  function kurMerretPozicioni(position: GeolocationPosition) {
    setSaktesia(Math.round(position.coords.accuracy));
    setGjendja("success");
    setMesazhi("Pozicioni u mor. Shkruaj edhe një vend të dallueshëm, p.sh. Biblioteka.");
  }

  function kurDeshtonLeximi(error: GeolocationPositionError) {
    setSaktesia(null);
    if (error.code === 1) {
      setGjendja("denied");
      setMesazhi("Leja u refuzua. Shkruaj vendtakimin vetë.");
    } else if (error.code === 3) {
      setGjendja("timeout");
      setMesazhi("Koha mbaroi. Provo sërish ose shkruaj vendtakimin vetë.");
    } else {
      setGjendja("unavailable");
      setMesazhi("Pozicioni nuk është i disponueshëm. Shkruaj vendtakimin vetë.");
    }
  }

  // Leja kërkohet vetëm këtu, pas klikimit; asgjë nuk lexohet gjatë renderimit.
  function perdorVendndodhjen() {
    if (!("geolocation" in navigator)) {
      setGjendja("unavailable");
      setMesazhi("Ky shfletues nuk e mbështet vendndodhjen. Shkruaj vendtakimin vetë.");
      return;
    }
    setSaktesia(null);
    setGjendja("loading");
    setMesazhi("Po kërkojmë vendndodhjen…");
    navigator.geolocation.getCurrentPosition(kurMerretPozicioni, kurDeshtonLeximi, {
      timeout: 10000,
    });
  }

  return (
    <section className="meeting">
      <h2>Vendtakimi</h2>

      <label htmlFor="vendtakimi">Shkruaj vendtakimin</label>
      <input
        id="vendtakimi"
        data-testid="meeting-input"
        value={teksti}
        onChange={(e) => setTeksti(e.target.value)}
        placeholder="p.sh. Biblioteka"
      />
      <button className="action" data-testid="confirm-meeting" onClick={konfirmo}>
        Konfirmo në telefon
      </button>
      <p data-testid="meeting-error" role="alert">{gabim}</p>
      <p>
        Vendtakimi i konfirmuar: <strong data-testid="confirmed-meeting">{vendtakimi}</strong>
      </p>

      <button
        className="action"
        data-testid="locate-me"
        onClick={perdorVendndodhjen}
        disabled={gjendja === "loading"}
      >
        Përdor vendndodhjen time
      </button>
      <p data-testid="location-status" data-state={gjendja} role="status">{mesazhi}</p>
      <p data-testid="location-accuracy">
        {saktesia !== null ? `Saktësia rreth ${saktesia} m` : ""}
      </p>
      <p>Zgjedhja ruhet vetëm në këtë telefon; shoferi ende nuk e merr.</p>
    </section>
  );
}
