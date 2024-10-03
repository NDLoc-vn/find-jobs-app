import { Lexend } from "next/font/google"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: "Find Jobs App",
  description: "Web tìm kiếm việc làm số 1 Việt Nam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
