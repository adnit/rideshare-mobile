"use client";

import { useState } from "react";
import { ruajUdhetimin } from "@/app/udhetimi/[id]/actions";

type Gjendja = "gati" | "pritje" | "sukses" | "gabim";

// Dy vlera të ndara: ajo që serveri ka konfirmuar dhe ajo që shfaqet përkohësisht gjatë pritjes.
export function Preferimi({ udhetimId, iRuajtur, numri }: {
  udhetimId: string;
  iRuajtur: boolean;
  numri: number;
}) {
  const [konfirmuar, setKonfirmuar] = useState({ iRuajtur, numri });
  const [gjendja, setGjendja] = useState<Gjendja>(iRuajtur ? "sukses" : "gati");

  // Gjatë pritjes ekrani tregon menjëherë rezultatin e pritur, por nuk e quan ende sukses.
  const shfaqet = gjendja === "pritje"
    ? { iRuajtur: true, numri: konfirmuar.numri + 1 }
    : konfirmuar;

  async function ruaj() {
    if (gjendja === "pritje" || konfirmuar.iRuajtur) return; // pa ruajtje të dyta gjatë pritjes
    setGjendja("pritje");
    const r = await ruajUdhetimin(udhetimId);
    if (r.ok) {
      setKonfirmuar({ iRuajtur: true, numri: r.numri });
      setGjendja("sukses");
    } else {
      // Rikthim: ylli dhe numri kthehen te vlerat e konfirmuara para klikimit.
      setGjendja("gabim");
    }
  }

  const etiketa = gjendja === "pritje" ? "★ Po ruhet…"
    : shfaqet.iRuajtur ? "★ I ruajtur"
    : gjendja === "gabim" ? "☆ Provo përsëri"
    : "☆ Ruaj udhëtimin";

  const mesazhi = gjendja === "pritje" ? "Po presim konfirmimin e serverit."
    : gjendja === "gabim" ? "Nuk u ruajt. Provo përsëri."
    : shfaqet.iRuajtur ? "U ruajt te të preferuarat."
    : "Nuk është te të preferuarat.";

  return (
    <section className="favorite" aria-label="Udhëtimi i preferuar">
      <button
        className="action"
        onClick={ruaj}
        disabled={gjendja === "pritje" || shfaqet.iRuajtur}
        aria-pressed={shfaqet.iRuajtur}
      >
        {etiketa}
      </button>
      <p role="status">{mesazhi}</p>
      <p>Të preferuarat {shfaqet.numri} · Preferim personal, jo rezervim</p>
    </section>
  );
}
