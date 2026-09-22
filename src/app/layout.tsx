import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Vain Hair and Beauty | Murphy St Salon Wangaratta",
  description: "Wangaratta's luxury hair boutique on Murphy Street. Specialists in lived-in blonding, balayage, bespoke precision styling, and King Valley winery bridal party packages.",
  keywords: [
    "Vain Hair and Beauty",
    "Hairdresser Wangaratta",
    "Murphy St Hair Salon Wangaratta",
    "Bridal Hair Wangaratta",
    "King Valley Wedding Hair",
    "Blonde Specialist Wangaratta"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
