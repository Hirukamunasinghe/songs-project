// PUBLIC PLATFORM layout — refined nav + footer, no admin link.
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <header className="nav-bar">
        <div className="wrap nav-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">♪</span> Songs
          </Link>
        </div>
      </header>
      <main className="page-main">{children}</main>
      <footer className="footer">
        <div className="wrap">A living songbook — sing along.</div>
      </footer>
    </div>
  );
}
