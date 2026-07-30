import type { Metadata } from "next";
import { Fraunces, Inter, Noto_Serif_Sinhala } from "next/font/google";
import "./globals.css";

// Display serif for English headings, Inter for UI, and a proper Sinhala
// serif so the song titles and lyrics render beautifully.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const sinhala = Noto_Serif_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sinhala",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Songs — A Living Songbook",
  description: "Browse and sing along to a collection of songs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${sinhala.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
