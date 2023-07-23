import "./globals.css";
import Providers from "./utils/Prodivers";

export const metadata = {
  title: "초코네환전가게",
  description: "한국 원 베트남 동 미국 달러 환율 계산기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
