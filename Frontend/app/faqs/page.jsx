import Faqs from "./Faqs";

const PAGE_URL = "https://zinniezeera.com/faqs/";
const OG_IMAGE = "/ZinnieWebsiteImage.jpeg";
const TWITTER_IMAGE = "/Rustic-spice.png";
const TITLE = "Zinnie FAQs | Answers to Common Questions";
const DESCRIPTION =
  "Find answers to frequently asked questions about orders, shipping, returns, and more at Zinnie. Get quick solutions to your queries.";

export const metadata = {
  title: {
    default: TITLE,
  },

  alternates: {
    canonical: PAGE_URL,
  },

  description: DESCRIPTION,

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
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Zinnie",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Affordable Soft Drinks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@zinnie",
    images: [
      {
        url: TWITTER_IMAGE,
        alt: "Affordable Soft Drinks",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Page() {
  return <Faqs />;
}