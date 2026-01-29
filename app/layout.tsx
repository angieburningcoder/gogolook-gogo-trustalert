import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, Inter } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Watchmen Lite | 品牌偽冒監測訂閱服務 by Gogolook",
  description: "SaaS 訂閱制品牌偽冒監測服務，即時發現偽冒帳號、風險分級、證據包、即時通知，守護您的品牌聲譽",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${notoSansJP.variable} ${notoSerifJP.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
