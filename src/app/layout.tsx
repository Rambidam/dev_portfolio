import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Louie Franz Gualingco | Shopify & Web Developer",
  description:
    "Shopify & Web Developer specializing in e-commerce, theme customization, SEO, CRO, and high-performing online stores. 5+ years of experience.",
  keywords: [
    "Shopify Developer",
    "Web Developer",
    "E-commerce Specialist",
    "Liquid",
    "React",
    "CRO",
    "SEO",
  ],
  authors: [{ name: "Louie Franz Gualingco" }],
  openGraph: {
    title: "Louie Franz Gualingco | Shopify & Web Developer",
    description:
      "Building high-performing Shopify stores and web applications with 5+ years of e-commerce experience.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
