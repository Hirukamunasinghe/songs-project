// PUBLIC PLATFORM layout. Header has NO admin link — regular users never
// see a way into the admin area.
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="site">
        <Link href="/">
          <h1>🎵 Songs</h1>
        </Link>
      </header>
      {children}
    </>
  );
}
