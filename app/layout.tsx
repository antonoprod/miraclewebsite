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
  metadataBase: new URL("https://www.miraclebgo.com"),
  title: {
    default: "Miracle",
    template: "%s | Miracle",
  },
  description: "Eventos, música, comunidad y drops limitados de Miracle.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Miracle",
    title: "Miracle",
    description: "Eventos, música, comunidad y drops limitados de Miracle.",
    url: "/",
    images: [
      {
        url: "/social/miracle-share.jpg",
        width: 1200,
        height: 630,
        alt: "Miracle — música, creatividad y comunidad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miracle",
    description: "Eventos, música, comunidad y drops limitados de Miracle.",
    images: ["/social/miracle-share.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
