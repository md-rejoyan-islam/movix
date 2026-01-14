import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  defaultSEO,
  generateOrganizationSchema,
  generateWebsiteSchema,
  siteName,
  siteUrl,
} from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import StoreProvider from "../providers/store-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#040714" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Discover Movies & TV Shows`,
    template: `%s | ${siteName}`,
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  authors: [defaultSEO.author],
  creator: defaultSEO.author.name,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: {
      default: `${siteName} - Discover Movies & TV Shows`,
      template: `%s | ${siteName}`,
    },
    description: defaultSEO.description,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: defaultSEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteName} - Discover Movies & TV Shows`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: `${siteName} - Discover Movies & TV Shows`,
      template: `%s | ${siteName}`,
    },
    description: defaultSEO.description,
    site: defaultSEO.twitter.site,
    creator: defaultSEO.twitter.creator,
    images: [defaultSEO.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  category: "entertainment",
  classification: "Movies & TV Shows",
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteSchema()),
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
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
