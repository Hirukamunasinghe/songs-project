// ADMIN DASHBOARD — protected. Verifies the session server-side before
// showing anything (defense in depth beyond the middleware redirect).
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { isAuthed } from "@/lib/auth";
import { deleteSong } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  const songs = await prisma.song.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>Manage songs</h2>
        <Link href="/admin/new" className="btn">
          + Add song
        </Link>
      </div>

      {songs.length === 0 ? (
        <p className="muted">No songs yet. Add the first one.</p>
      ) : (
        songs.map((song) => (
          <div key={song.id} className="admin-row">
            <div>
              <div style={{ fontWeight: 600 }}>{song.title}</div>
              {song.artist && <div className="artist">{song.artist}</div>}
            </div>
            <form action={deleteSong}>
              <input type="hidden" name="id" value={song.id} />
              <button type="submit" className="btn danger">
                Delete
              </button>
            </form>
          </div>
        ))
      )}
    </main>
  );
}
