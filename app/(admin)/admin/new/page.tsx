// ADD SONG FORM — protected. The form's action is the createSong Server
// Action, which re-checks auth before writing.
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { createSong } from "@/app/actions";

export default async function NewSongPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  return (
    <main>
      <Link href="/admin" className="back">
        ← Back to admin
      </Link>
      <h2 style={{ marginTop: 16 }}>Add a song</h2>

      <form action={createSong}>
        <div className="field">
          <label htmlFor="title">Title *</label>
          <input id="title" name="title" required />
        </div>

        <div className="field">
          <label htmlFor="artist">Artist</label>
          <input id="artist" name="artist" />
        </div>

        <div className="field">
          <label htmlFor="lyrics">Lyrics *</label>
          <textarea id="lyrics" name="lyrics" required />
        </div>

        <button type="submit" className="btn">
          Save song
        </button>
      </form>
    </main>
  );
}
