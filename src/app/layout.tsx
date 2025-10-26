import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"

import "./globals.css";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Cerebric - AI Prompt Refiner",
  description: "Enhance your AI prompts with Cerebric, a free in-browser tool that refines and optimizes your prompts for better AI responses using Chrome's AI capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rethinkSans.className} dark`}>
      <body
        className={`antialiased`}
      >
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
