import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from './components/Navigation';
import BackgroundEffects from './components/BackgroundEffects';
import Footer from './components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetaVerse Hub - Explore the Future of Digital Reality",
  description: "Discover the limitless possibilities of the Metaverse. Experience virtual worlds, AI agents, and immersive digital environments that bridge reality and imagination.",
  keywords: "metaverse, virtual reality, VR, AR, augmented reality, AI agents, digital worlds, virtual environments",
  authors: [{ name: "MetaVerse Hub Team" }],
  openGraph: {
    title: "MetaVerse Hub - Explore the Future of Digital Reality",
    description: "Discover the limitless possibilities of the Metaverse",
    type: "website",
    images: ["/metaverse-banner.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen font-sans antialiased">
        <BackgroundEffects />
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
