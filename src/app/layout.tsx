import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KRYPTO - Discover and Collect Rare NFTs",
  description:
    "The most secure marketplace for buying and selling unique crypto assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
