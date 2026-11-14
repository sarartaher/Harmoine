import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
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
  title: "Hermone — Bringing People Together",
  description:
    "Discover events, connect with people, and make meaningful memories.",
};

// Applies the stored theme before first paint to avoid a flash of the wrong theme.
// Must run before any page content renders — keep it first in <body>.
const themeScript = `try {
  var theme = localStorage.getItem("theme");
  if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full ">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
