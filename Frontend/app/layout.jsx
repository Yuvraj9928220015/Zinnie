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
    default: "Zinnie - Premium Drinks",
    template: "%s | Zinnie",
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

  openGraph: {
    title: "Buy Affordable Soft Drinks & Cold Drinks in India Online",
    siteName: "Zinnie",
    url: "https://zinniezeera.com/",
    description:
      "Searching for soft drinks in India? Zinnie offers affordable, refreshing cold drinks you’ll love. Shop the best cool drinks online today.",
    type: "website",

    images: [
      {
        url: "/Blog-image-4.png",
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
    images: ["/Rustic-spice.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={merriweather.className}
      >
        <LanguageProvider>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-S07YWT3NCJ"
            strategy="afterInteractive"
          />

          <Script strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];

              function gtag() {
                dataLayer.push(arguments);
              }

              gtag('js', new Date());
              gtag('config', 'G-S07YWT3NCJ');
            `}
          </Script>

          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}