import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import DarkModeScript from "@/components/DarkModeScript";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "平木佳介 - 職務経歴書 | Hiraki Keisuke Resume",
  description: "AWSソリューションアーキテクト 平木佳介の職務経歴書。AWS認定全12資格取得、クラウド設計・構築・運用の豊富な経験を掲載。",
  keywords: "平木佳介, Hiraki Keisuke, AWS, ソリューションアーキテクト, 職務経歴書, resume, クラスメソッド",
  authors: [{ name: "平木佳介", url: "https://dev.classmethod.jp/author/hiraki-keisuke/" }],
  creator: "平木佳介",
  publisher: "平木佳介",
  openGraph: {
    title: "平木佳介 - 職務経歴書",
    description: "AWSソリューションアーキテクト 平木佳介の職務経歴書",
    url: "https://keisuke-hiraki.github.io/work-history/",
    siteName: "平木佳介 職務経歴書",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "平木佳介 - 職務経歴書",
    description: "AWSソリューションアーキテクト 平木佳介の職務経歴書",
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
        className={`${inter.variable} ${notoSansJp.variable} ${jetbrainsMono.variable} antialiased transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
