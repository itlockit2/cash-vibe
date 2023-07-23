import "./globals.css";

export const metadata = {
  title: "베트남 환율 계산기",
  description: "한국 원 베트남 동 미국 달러 환율 계산기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
