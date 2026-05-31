import "./globals.css";

export const metadata = {
  title: "College Discovery Platform",
  description: "College Finder",
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
