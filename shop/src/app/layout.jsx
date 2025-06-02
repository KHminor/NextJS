import {} from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Shop Test",
  description: "main",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
