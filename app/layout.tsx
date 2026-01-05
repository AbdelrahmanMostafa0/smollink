import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmolLink | Your links, just smoler",
  description:
    "The simplest way to shorten links and track their performance. Create smol links for your big ideas.",
  openGraph: {
    title: "SmolLink | Your links, just smoler",
    description:
      "The simplest way to shorten links and track their performance. Create smol links for your big ideas.",
    url: "https://smollinkapp.vercel.app", // Approximate, user can update
    siteName: "SmolLink",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmolLink | Your links, just smoler",
    description:
      "The simplest way to shorten links and track their performance. Create smol links for your big ideas.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-dvh`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
