// PUBLIC SONG LIST — Server Component. Reads the DB directly, renders a
// hero + a grid of songs, each with generated cover art.
import Link from "next/link";
import { prisma } from "@/lib/db";
import { coverStyle } from "@/lib/cover";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const songs = await prisma.song.findMany({ orderBy: { title: "asc" } });

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">A living songbook</span>
          <h1 className="hero-title">Songs to gather and sing along.</h1>
          <p className="hero-sub">
            Browse the collection, open any song, and follow the lyrics —
            beautifully set and always at hand.
          </p>
          <div className="hero-meta">
            {songs.length} song{songs.length === 1 ? "" : "s"} in the collection
          </div>
        </div>
      </section>

      <section className="wrap section">
        {songs.length === 0 ? (
          <p className="muted">No songs yet.</p>
        ) : (
          <div className="song-grid">
            {songs.map((song) => (
              <Link
                key={song.id}
                href={`/songs/${song.id}`}
                className="song-card"
              >
                <div
                  className="cover"
                  style={{ background: coverStyle(song.id) }}
                >
                  <span className="cover-note">♪</span>
                </div>
                <div className="song-card-body">
                  <div className="song-title">{song.title}</div>
                  {song.artist && (
                    <div className="song-artist">{song.artist}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
