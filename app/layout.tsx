import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "College Discovery Platform",
  description: "Find and compare colleges easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
