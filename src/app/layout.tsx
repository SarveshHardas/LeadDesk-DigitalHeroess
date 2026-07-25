import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LeadDesk Mini | High-Conversion Lead Intelligence CRM",
    template: "%s | LeadDesk Mini",
  },
  description:
    "Production-grade lead intake, automated honeypot spam protection, and pipeline analytics built with Next.js App Router and MongoDB.",
  keywords: [
    "CRM",
    "Lead Management",
    "Sales Pipeline",
    "Lead Capture",
    "MongoDB CRM",
    "Digital Heroes Task",
  ],
  authors: [{ name: "LeadDesk Mini Engineering" }],
  openGraph: {
    title: "LeadDesk Mini | High-Conversion Lead Intelligence CRM",
    description: "Capture, qualify, and convert high-value leads 3x faster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0b0d] text-[#f4f3ef] selection:bg-[#d97706] selection:text-white font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#d97706] text-white px-4 py-2 rounded-lg font-bold shadow-xl"
        >
          Skip to main content
        </a>
        <div id="main-content" className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
