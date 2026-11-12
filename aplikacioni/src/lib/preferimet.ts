import "server-only";
import { getSql } from "./db";
import { profiliIm } from "./lejet";

export type GjendjaEPreferimit = { iRuajtur: boolean; numri: number };

// Gjendja e konfirmuar nga serveri: a e ka ruajtur përdoruesi i kyçur këtë udhëtim dhe sa preferime ka gjithsej.
export async function lexoPreferimin(udhetimId: string): Promise<GjendjaEPreferimit | null> {
  const p = await profiliIm();
  if (!p) return null;
  const sql = getSql();
  const rows = await sql`SELECT
      EXISTS (SELECT 1 FROM preferimet WHERE github_id = ${p.id} AND udhetim_id = ${udhetimId}) AS i_ruajtur,
      (SELECT count(*)::int FROM preferimet WHERE github_id = ${p.id}) AS numri`;
  return { iRuajtur: rows[0].i_ruajtur as boolean, numri: rows[0].numri as number };
}

// Ruajtja: identiteti vjen nga sesioni, jo nga formulari. ON CONFLICT DO NOTHING bën që
// një klikim i dytë ose një kërkesë e përsëritur të mos krijojë rresht të dytë.
export async function ruajPreferimin(udhetimId: string): Promise<GjendjaEPreferimit | "hyr" | "nuk-u-gjet"> {
  const p = await profiliIm();
  if (!p) return "hyr";
  const sql = getSql();
  const ekziston = await sql`SELECT 1 FROM udhetimet WHERE id = ${udhetimId}`;
  if (ekziston.length === 0) return "nuk-u-gjet";
  await sql`INSERT INTO preferimet (github_id, udhetim_id) VALUES (${p.id}, ${udhetimId})
    ON CONFLICT (github_id, udhetim_id) DO NOTHING`;
  const rows = await sql`SELECT count(*)::int AS numri FROM preferimet WHERE github_id = ${p.id}`;
  return { iRuajtur: true, numri: rows[0].numri as number };
}
