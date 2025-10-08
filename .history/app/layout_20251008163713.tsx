import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube Player - Modern Video Search & Playback | Diwan Malla",
  description: "A sleek, modern YouTube player built with Next.js 15, TypeScript, and Tailwind CSS. Search videos, watch seamlessly, and discover content with an elegant glassmorphism UI and dark mode support.",
  keywords: ["YouTube Player", "Video Search", "Next.js", "React", "TypeScript", "Diwan Malla", "Web Development"],
  authors: [{ name: "Diwan Malla", url: "https://diwanportfolio.vercel.app/" }],
  creator: "Diwan Malla",
  openGraph: {
    title: "YouTube Player - Modern Video Experience",
    description: "Search and watch YouTube videos with a beautiful, modern interface featuring glassmorphism design and dark mode.",
    url: "https://github.com/DiwanMalla/youtube_player",
    siteName: "YouTube Player",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Player - Modern Video Search & Playback",
    description: "A sleek YouTube player with Next.js 15, TypeScript, and Tailwind CSS",
    creator: "@DiwanMalla",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
