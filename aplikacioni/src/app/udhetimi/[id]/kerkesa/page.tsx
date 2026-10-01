import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

export default async function Kerkesa({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);
  if (!udhetim) notFound();

  return (
    <main>
      <Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
      {udhetim.vende > 0 ? (
        <>
          <h1>Simulim: Në pritje</h1>
          <p>
            {udhetim.nisja} → {udhetim.destinacioni} · {udhetim.ora}
          </p>
          <p>Kërkesa nuk është dërguar te shoferi {udhetim.shoferi}.</p>
          <p>Ruajtjen dhe konfirmimin real do t’i shtojmë më vonë.</p>
        </>
      ) : <h1>Nuk ka vende të lira.</h1>}
    </main>
  );
}
