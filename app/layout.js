import "./globals.css";

export const metadata = {
  title: "Bunga Map",
  description: "Live music events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
