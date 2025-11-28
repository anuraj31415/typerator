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
  title: "Typerator - Typing Speed Test",
  description: "A minimalist typing speed test. Test your WPM and accuracy with a clean, distraction-free interface.",
  keywords: ["typing test", "wpm test", "typing speed", "typing practice", "keyboard test", "typerator"],
  authors: [{ name: "Anuraj V", url: "https://github.com/anuraj31415" }],
  creator: "Anuraj V",
  openGraph: {
    title: "Typerator - Typing Speed Test",
    description: "A minimalist typing speed test. Test your WPM and accuracy with a clean, distraction-free interface.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Typerator - Typing Speed Test",
    description: "A minimalist typing speed test. Test your WPM and accuracy with a clean, distraction-free interface.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
