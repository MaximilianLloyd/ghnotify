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
  title: "GHNotify – GitHub Follower & Star Tracking",
  description:
    "Stay in the loop with GitHub followers and repo stars. GHNotify lets you track new followers.",
  metadataBase: new URL("https://ghnotify.com"),
  openGraph: {
    title: "GHNotify – GitHub Follower & Star Tracking",
    description:
      "Track your GitHub growth and get real-time email updates when someone follows you.",
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
    title: "GHNotify – GitHub Tracker",
    description: "Email updates for your GitHub followers and stars.",
    images: ["https://ghnotify.com/og-image.png"], // replace as needed
    creator: "@yourhandle", // optional
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
      </body>
    </html>
  );
}
