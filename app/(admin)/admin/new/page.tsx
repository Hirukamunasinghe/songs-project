// ADD SONG FORM — protected. Submits to the createSong Server Action.
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { createSong } from "@/app/actions";

export default async function NewSongPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  return (
    <div className="form-page">
      <Link href="/admin" className="back">
        ← Back to admin
      </Link>
      <h1 className="page-title">Add a song</h1>

      <form action={createSong} className="card form">
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
    </div>
  );
}
