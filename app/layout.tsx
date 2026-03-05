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
  title: "Mathnique",
  description: "1-Minute Math Challenge - Test your math skills!",
  manifest: "/manifest.json",
  themeColor: "#0A1628",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mathnique",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A1628]`}>
        
        {children}
      </body>
    </html>
  );
}