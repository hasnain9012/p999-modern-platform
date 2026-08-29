import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "P999 Games — Discover Games Online", template: "%s | P999 Games" },
  description: "Discover popular mini games, slot-style games, cards, fishing, sports and more in a fast, responsive gaming platform.",
  robots: { index: true, follow: true },
  openGraph: { title: "P999 Games — Discover Games Online", description: "A fast, mobile-first gaming platform.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
