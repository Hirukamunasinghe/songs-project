// PUBLIC SONG LIST — a Server Component. Reads the DB directly. No API.
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const songs = await prisma.song.findMany({
    orderBy: { title: "asc" },
  });

  return (
    <main>
      {songs.length === 0 ? (
        <p className="muted">No songs yet.</p>
      ) : (
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song.id}>
              <Link href={`/songs/${song.id}`} className="song-card">
                <div className="title">{song.title}</div>
                {song.artist && <div className="artist">{song.artist}</div>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
