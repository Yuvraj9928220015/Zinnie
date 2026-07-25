import DistributorClient from './Distributorclient';

const PAGE_URL = "https://zinniezeera.com/become-a-distributor/";
const OG_IMAGE = "/ZinnieWebsiteImage.jpeg";
const TITLE = "Become a Beverage Distributor in India | Zinnie Soft Drinks";
const DESCRIPTION =
  "Join Zinnie as a beverage distributor in India. Partner with a leading soft drink supplier and grow your business with jeera soda, nimbu zeera, masala soda, and flavored drinks.";

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
        url: OG_IMAGE,
        width: 1200,
        height: 630,
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

export default function Distributor() {
  return <DistributorClient />;
}