import { Vendtakimi } from "@/components/Vendtakimi";

// Faqe prove për Javën 8: të dhëna fiktive lokale, pa login, Neon ose sekrete.
const udhetimi = {
  id: "2",
  shoferi: "Dritoni",
  nisja: "Ferizaj",
  destinacioni: "AAB",
  ora: "08:15",
};

export default function Java08Test() {
  return (
    <main>
      <h1>{udhetimi.nisja} – {udhetimi.destinacioni}</h1>
      <p>Shoferi: {udhetimi.shoferi} · Ora: {udhetimi.ora} · ID {udhetimi.id}</p>
      <p>Faqe prove me të dhëna fiktive.</p>
      <Vendtakimi />
    </main>
  );
}
