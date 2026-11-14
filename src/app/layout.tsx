import type { Metadata } from "next";
import { ToastContainer, toast } from "react-toastify";
import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AppDataProvider } from "@/components/providers/app-data-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body>, so
          ignore attribute mismatches on this element. */}
      <body className="min-h-full" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppDataProvider>
          <ToastContainer />
          <Navbar />
          {children}
          <Footer />
        </AppDataProvider>
      </body>
    </html>
  );
}
