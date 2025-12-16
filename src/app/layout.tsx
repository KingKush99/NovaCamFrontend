import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import GoogleAdSense from "@/components/GoogleAdSense";
import MiniChatbot from "@/components/MiniChatbot";
import MiniSlots from "@/components/MiniSlots";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Novelty Cams",
  description: "Gamified Live Streaming Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          {children}
          <MiniChatbot />
          <MiniSlots />
        </AuthProvider>
        <GoogleAdSense pId={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || ""} />
      </body>
    </html>
  );
}