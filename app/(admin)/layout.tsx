// ADMIN PLATFORM layout — matches the light theme, shows logout when authed.
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
    <div className="page">
      <header className="nav-bar">
        <div className="wrap nav-inner">
          <Link href="/admin" className="brand">
            <span className="brand-mark">✦</span> Admin
          </Link>
          {authed && (
            <nav className="admin-nav">
              <Link href="/">View site</Link>
              <form action={logoutAction}>
                <button type="submit" className="btn ghost sm">
                  Log out
                </button>
              </form>
            </nav>
          )}
        </div>
      </header>
      <main className="page-main">
        <div className="wrap">{children}</div>
      </main>
    </div>
  );
}
