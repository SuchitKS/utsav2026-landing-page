import type { Metadata } from "next";
import "./globals.css";
import { Syne, Outfit } from "next/font/google";

// Premium heading font (Wide, modern, futuristic)
const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-syne",
  display: 'swap',
});

// Premium body font (Clean, geometric, highly legible)
const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "UTSAV '26 — Trayana | BMSCE",
  description:
    "Join us at UTSAV 2026 — Trayana, BMSCE's annual cultural extravaganza. Infinite creativity, one celebration. Register now for exciting events, performances, and unforgettable experiences.",
  icons: {
    icon: "/U26logo.png",
  },
  openGraph: {
    title: "UTSAV '26 — Trayana | BMSCE",
    description: "Infinite Creativity, One Celebration",
    images: ["/U26logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      {/* Apply Outfit as the default body font, and hide horizontal overflow to prevent horizontal scrollbars from animations */}
      <body className={`font-outfit bg-[#07050F] text-[#F4F6FF] antialiased overflow-x-hidden selection:bg-purple-500/40 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}