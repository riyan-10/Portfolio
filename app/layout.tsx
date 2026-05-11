import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CursorProvider } from "@/context/CursorContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Riyan | Creative Developer",
  description: "Crafting cinematic and interactive web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="bg-background text-foreground min-h-screen font-sans selection:bg-white/20 selection:text-white overflow-x-hidden">
        <CursorProvider>
          <LoadingScreen />
          <CustomCursor />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
