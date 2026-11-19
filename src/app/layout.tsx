import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});
const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmetuygur.com"),
  title: {
    default: "ahmetuygur | Global Digital Printed Rug Manufacturer",
    template: "%s | ahmetuygur",
  },
  description:
    "Premium digitally printed rugs direct from the manufacturer for global wholesale export.",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "ahmetuygur",
    type: "website",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
