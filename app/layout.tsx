import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import StoreProvider from "../providers/store-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Home | Movix",
  description:
    "Find your favorite movies and TV shows. Search, discover, and explore a vast collection of movies and TV shows with Movix.",
  openGraph: {
    title: "Home",
    description:
      "Find your favorite movies and TV shows. Search, discover, and explore a vast collection of movies and TV shows with Movix.",
    url: "https://movix-cinema.vercel.app",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Movix - Find your favorite movies and TV shows",
      },
    ],
    siteName: "Movix",
    type: "website",
  },

  twitter: {
    title: "Home",
    description: "Find your favorite movies and TV shows.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  authors: [
    {
      name: "Md Rejoyan Islam",
      url: "https://rejoyanislam.com",
    },
  ],
  keywords: [
    "movies",
    "tv shows",
    "movix",
    "movie database",
    "movie search",
    "tv show search",
    "movie recommendations",
  ],
  creator: "Md Rejoyan Islam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
