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
  title: "Barakah Quest - Spiritual Habit Tracker",
  description: "Nurture your daily habits and grow your spiritual garden. Track Dhuha, Sunnah Fajr, and more.",
  openGraph: {
    title: "Barakah Quest - Spiritual Habit Tracker",
    description: "Nurture your daily habits and grow your spiritual garden. Track Dhuha, Sunnah Fajr, and more.",
    url: "https://barakah-quest.vercel.app", // Placeholder URL, can be updated later
    siteName: "Barakah Quest",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barakah Quest - Spiritual Habit Tracker",
    description: "Nurture your daily habits and grow your spiritual garden. Track Dhuha, Sunnah Fajr, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
