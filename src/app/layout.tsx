import type { Metadata, Viewport } from "next";
import { pretendard } from "@/styles/fonts";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://www.plers.co.kr"
      : "http://localhost:3000",
  ),
  title: "평냉 취향 테스트｜나는 어떤 평냉파일까?",
  description:
    "육향부터 메밀향까지, 내 입맛에 맞는 평양냉면 계열을 알아보세요!",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-100">
        <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
