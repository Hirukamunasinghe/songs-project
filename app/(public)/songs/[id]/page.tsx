// PUBLIC SONG DETAIL — Server Component. Cover banner + elegant lyrics.
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { coverStyle } from "@/lib/cover";

export const dynamic = "force-dynamic";

export default async function SongPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const song = await prisma.song.findUnique({ where: { id: Number(id) } });

  if (!song) notFound();

  return (
    <article className="wrap song-page">
      <Link href="/" className="back">
        ← All songs
      </Link>

      <header className="song-hero" style={{ background: coverStyle(song.id) }}>
        <div className="song-hero-inner">
          <h1 className="song-title-lg">{song.title}</h1>
          {song.artist && <p className="song-artist-lg">{song.artist}</p>}
        </div>
      </header>

      <div className="lyrics">{song.lyrics}</div>
    </article>
  );
}
