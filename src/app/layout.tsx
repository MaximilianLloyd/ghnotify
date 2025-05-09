import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { PostHogProvider } from "./providers";

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
  icons: {
    icon: "/favicon.png", // or .png or .svg
  },
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <PostHogProvider>
          <Navbar></Navbar>
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">{children}</div>
            <footer className="w-full mt-auto py-8 border-t border-gray-200 dark:border-gray-800">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      © {new Date().getFullYear()} GHNotify
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <a
                      href="/faq"
                      className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                    >
                      FAQ
                    </a>
                    <a
                      href="https://github.com/MaximilianLloyd/ghnotify"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                    >
                      GitHub
                    </a>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Built by
                    </span>
                    <a
                      href="https://x.com/sudo2hell"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                    >
                      Max
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
