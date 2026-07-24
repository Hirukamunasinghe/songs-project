// PUBLIC SONG DETAIL — a Server Component. Reads one song directly from DB.
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SongPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const song = await prisma.song.findUnique({
    where: { id: Number(id) },
  });

  if (!song) notFound();

  return (
    <main>
      <Link href="/" className="back">
        ← Back to all songs
      </Link>
      <h1 style={{ marginTop: 16 }}>{song.title}</h1>
      {song.artist && <p className="muted">{song.artist}</p>}
      <div className="lyrics">{song.lyrics}</div>
    </main>
  );
}
