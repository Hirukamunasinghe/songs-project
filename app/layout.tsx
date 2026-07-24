import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Songs",
  description: "A collection of songs",
};

// Root layout: only the shell. Each platform (public vs admin) adds its
// own header via its route-group layout below.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
