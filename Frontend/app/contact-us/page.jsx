import Contact from "./Contact";

const PAGE_URL = "https://zinniezeera.com/contact-us/";
const OG_IMAGE = "/ZinnieWebsiteImage.jpeg";
const TITLE = "Contact Zinnie | Get in Touch With Us Today";
const DESCRIPTION =
  "Have questions or need support? Contact Zinnie for quick assistance. Reach out via email, phone, or our contact form—we’re here to help you.";

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

export default function Page() {
  return <Contact />;
}