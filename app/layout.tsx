import "./globals.css";

export const metadata = {
  title: "Irish DB Endgame Strategy Navigator",
  description: "PRT decision framework for Irish DB schemes",
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
