import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-[#fafafa]`}
      >
        <div className="border-b-2 border-gray-200 bg-white">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
            <Link href="/">
              <h1 className="text-2xl">Inventory Logo</h1>
            </Link>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
