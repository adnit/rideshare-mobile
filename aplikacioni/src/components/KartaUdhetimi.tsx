import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  return (
    <article className="trip-card">
      <h2>{udhetim.nisja} → {udhetim.destinacioni} · {udhetim.ora}</h2>
      <p>
        {udhetim.shoferi} ·{" "}
        {udhetim.vende > 0 ? `Vende të lira: ${udhetim.vende}` : "Plot"}
      </p>
      <Link className="action" href={`/udhetimi/${udhetim.id}`}>
        Shiko
      </Link>
    </article>
  );
}
