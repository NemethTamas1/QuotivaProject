import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-fira-sans",
})

export const metadata: Metadata = {
  title: "Quotiva",
  description: "Árajánlatkészítő webalkalmazás",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body
        className={`${fira.variable} ${fira.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
