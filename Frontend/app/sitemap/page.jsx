import SitemapList from "./SitemapList";

const PAGE_URL = "https://barosche.com/sitemap/";
const OG_IMAGE = "/logo.png";
const TITLE = "Sitemap – Zinnie";
const DESCRIPTION =
  "Explore the complete sitemap of Zinnie — browse all pages including our jewelry collections, categories, and company information.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "zinnie",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 2048,
        height: 997,
        alt: "zinnie Sitemap",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    site: "@zinnie",
    creator: "@zinnie",
    images: [
      {
        url: OG_IMAGE,
        alt: "zinnie Sitemap",
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
  return <SitemapList />;
}