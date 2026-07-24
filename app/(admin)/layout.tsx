// ADMIN PLATFORM layout — separate header from the public site.
// Shows the logout button only when actually logged in (so the login
// page stays clean).
import Link from "next/link";
import { isAuthed } from "@/lib/auth";
import { logoutAction } from "@/app/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthed();

  return (
    <>
      <header className="site">
        <Link href="/admin">
          <h1>🔒 Admin</h1>
        </Link>
        {authed && (
          <nav className="nav" style={{ display: "flex", alignItems: "center" }}>
            <Link href="/">View site</Link>
            <form action={logoutAction} style={{ marginLeft: 16 }}>
              <button type="submit" className="btn ghost">
                Log out
              </button>
            </form>
          </nav>
        )}
      </header>
      {children}
    </>
  );
}
