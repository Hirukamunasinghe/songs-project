// ADMIN DASHBOARD — protected. Lists songs with cover thumbnails + delete.
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { isAuthed } from "@/lib/auth";
import { deleteSong } from "@/app/actions";
import { coverStyle } from "@/lib/cover";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  const songs = await prisma.song.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="admin-page">
      <div className="admin-head">
        <div>
          <h1 className="page-title">Manage songs</h1>
          <p className="muted">
            {songs.length} song{songs.length === 1 ? "" : "s"} in the collection
          </p>
        </div>
        <Link href="/admin/new" className="btn">
          + Add song
        </Link>
      </div>

      {songs.length === 0 ? (
        <p className="muted">No songs yet. Add the first one.</p>
      ) : (
        <div className="admin-list">
          {songs.map((song) => (
            <div key={song.id} className="admin-row">
              <div
                className="admin-cover"
                style={{ background: coverStyle(song.id) }}
              />
              <div className="admin-row-info">
                <div className="song-title">{song.title}</div>
                {song.artist && (
                  <div className="song-artist">{song.artist}</div>
                )}
              </div>
              <form action={deleteSong}>
                <input type="hidden" name="id" value={song.id} />
                <button type="submit" className="btn danger sm">
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
