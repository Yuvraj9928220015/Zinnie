import Banner from './Home/Banner';

const PAGE_URL = "https://zinniezeera.com/";
const OG_IMAGE = "/ZinnieWebsiteImage.jpeg";
const TWITTER_IMAGE = "/Rustic-spice.png";
const TITLE = "Buy Affordable Soft Drinks & Cold Drinks in India Online";
const DESCRIPTION =
  "Searching for soft drinks in India? Zinnie offers affordable, refreshing cold drinks you’ll love. Shop the best cool drinks online today!";

export const metadata = {
  title: {
    default: TITLE,
  },

  description: DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

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
    siteName: "Zinnie",
    url: PAGE_URL,
    description: DESCRIPTION,
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

export default function Home() {
  return <Banner />;
}