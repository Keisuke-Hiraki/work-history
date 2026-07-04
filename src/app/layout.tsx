import type { Metadata } from "next";
import { IBM_Plex_Sans_JP, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import DarkModeScript from "@/components/DarkModeScript";

const plexSansJp = IBM_Plex_Sans_JP({
  variable: "--font-plex-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "平木佳介 - 職務経歴書 | Hiraki Keisuke Resume",
  description: "サイバーセキュリティコンサルタント 平木佳介の職務経歴書。AI・クラウド・セキュリティのコンサルティング経験とAWS認定資格の全冠取得実績を掲載。",
  keywords: "平木佳介, Hiraki Keisuke, サイバーセキュリティ, コンサルタント, AWS, 職務経歴書, resume",
  authors: [{ name: "平木佳介", url: "https://dev.classmethod.jp/author/hiraki-keisuke/" }],
  creator: "平木佳介",
  publisher: "平木佳介",
  openGraph: {
    title: "平木佳介 - 職務経歴書",
    description: "サイバーセキュリティコンサルタント 平木佳介の職務経歴書",
    url: "https://keisuke-hiraki.github.io/work-history/",
    siteName: "平木佳介 職務経歴書",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "平木佳介 - 職務経歴書",
    description: "サイバーセキュリティコンサルタント 平木佳介の職務経歴書",
    creator: "@k_hirasan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <DarkModeScript />
      </head>
      <body
        className={`${plexSansJp.variable} ${plexMono.variable} antialiased transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
