import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Merriweather } from "next/font/google";
import { LanguageProvider } from "../lib/languageContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Script from "next/script";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://zinniezeera.com"),

  title: {
    default: "Buy Affordable Soft Drinks & Cold Drinks in India Online",
  },

  description:
    "Searching for soft drinks in India? Zinnie offers affordable, refreshing cold drinks you’ll love. Shop the best cool drinks online today.",

  keywords: [
    "soft drinks",
    "cold drinks",
    "cool drinks",
    "beverages",
    "healthy drinks",
    "Zinnie",
  ],

  icons: {
    icon: "/Zinnie-logo.png",
  },

  alternates: {
    canonical: "https://zinniezeera.com/",
  },

  openGraph: {
    title: "Buy Affordable Soft Drinks & Cold Drinks in India Online",
    siteName: "Zinnie",
    url: "https://zinniezeera.com/",
    description:
      "Searching for soft drinks in India? Zinnie offers affordable, refreshing cold drinks you’ll love. Shop the best cool drinks online today.",
    type: "website",

    images: [
      {
        url: "/ZinnieWebsiteImage.jpeg",
        width: 1200,
        height: 630,
        alt: "Affordable Soft Drinks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Buy Affordable Soft Drinks & Cold Drinks in India Online",
    description:
      "Searching for soft drinks in India? Zinnie offers affordable, refreshing cold drinks you’ll love. Shop the best cool drinks online today.",
    creator: "@zinnie",
    images: [
      {
        url: "/ZinnieWebsiteImage.jpeg",
        width: 1200,
        height: 630,
        alt: "Affordable Soft Drinks",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};
//  global

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://zinniezeera.com/#organization",
  name: "Zinnie",
  url: "https://zinniezeera.com/",
  logo: {
    "@type": "ImageObject",
    url: "https://zinniezeera.com/Zinnie-logo.png",
  },
  sameAs: [
    "https://x.com/zinniezeera",
    "https://www.instagram.com/zinniezeera/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    areaServed: "India",
    availableLanguage: ["English", "Hindi"],
  },
};
//  global

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://zinniezeera.com/#website",
  url: "https://zinniezeera.com/",
  name: "Zinnie",
  publisher: {
    "@id": "https://zinniezeera.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://zinniezeera.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={merriweather.className}>
        {/* Organization Schema - Global */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Website Schema - Global */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <LanguageProvider>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-S07YWT3NCJ"
            strategy="afterInteractive"
          />

          <Script
            id="ga-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){ dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'G-S07YWT3NCJ');
              `,
            }}
          />

          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}