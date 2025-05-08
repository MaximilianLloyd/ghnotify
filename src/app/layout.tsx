import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GHNotify – GitHub Follower Tracking",
  description: "Stay in the loop with GitHub followers.",
  metadataBase: new URL("https://ghnotify.com"),
  openGraph: {
    title: "GHNotify – GitHub Follower Tracking",
    description: "email updates for your github followers",
    url: "https://ghnotify.com",
    siteName: "GHNotify",
    images: [
      {
        url: "https://ghnotify.com/og-image.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "GHNotify Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GHNotify – GitHub Follower Tracking",
    description: "email updates for your github followers",
    images: ["https://ghnotify.com/og-image.png"], // replace as needed
    creator: "@sudo2hell", // optional
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
        <Navbar></Navbar>
        {children}
        <footer className="absolute left-0 bottom-0 w-full pb-10 row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <p className="flex gap-1">
            Built by
            <a
              href="https://x.com/sudo2hell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 underline hover:text-black transition-colors"
            >
              Max
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
