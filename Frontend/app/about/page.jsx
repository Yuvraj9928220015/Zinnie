import About from "./About";

const PAGE_URL = "https://zinniezeera.com/about/";
const OG_IMAGE = "/ZinnieWebsiteImage.jpeg";
const TWITTER_IMAGE = "/Rustic-spice.png";
const TITLE = "About Zinnie | Our Story, Vision & Brand Journey";
const DESCRIPTION =
  "Discover the story behind Zinnie, our vision, values, and commitment to quality. Learn how we bring style, comfort, and innovation together for modern lifestyles.";

export const metadata = {
  title: {
    default: TITLE,
  },

  description: DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
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
        alt: "About Zinnie",
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
        alt: "About Zinnie",
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
  return <About />;
}