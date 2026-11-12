import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";
import { Vendtakimi } from "@/components/Vendtakimi";
import { Preferimi } from "@/components/Preferimi";
import { lexoPreferimin, type GjendjaEPreferimit } from "@/lib/preferimet";

export const dynamic = "force-dynamic";

export default async function Detajet({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let udhetim;
  let preferimi: GjendjaEPreferimit | null = null;
  try {
    [udhetim, preferimi] = await Promise.all([gjejUdhetimin(id), lexoPreferimin(id)]);
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">← Kthehu te lista</Link>
      </main>
    );
  }
  if (!udhetim) notFound();

  return (
    <main>
      <Link href="/">← Kthehu te lista</Link>
      <h1>{udhetim.nisja} – {udhetim.destinacioni}</h1>
      <p>Ora: {udhetim.ora}</p>
      <p>Vendtakimi: {udhetim.vendtakimi}</p>
      <p>Vende të lira: {udhetim.vende}</p>
      {udhetim.vende > 0 ? (
        <Link className="action" href={`/udhetimi/${id}/kerkesa`}>
          Kërko vend
        </Link>
      ) : <button className="action" disabled>Nuk ka vende të lira</button>}
      {preferimi ? (
        <Preferimi udhetimId={udhetim.id} iRuajtur={preferimi.iRuajtur} numri={preferimi.numri} />
      ) : (
        <p><Link href="/panel">Hyr</Link> për ta ruajtur udhëtimin te të preferuarat.</p>
      )}
      <Vendtakimi />
    </main>
  );
}
