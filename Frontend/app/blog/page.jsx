import BlogPageClient from "./BlogPageClient";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
const FETCH_TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function getInitialBlogs() {
  if (!API_URL) return [];

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(`${API_URL}/api/blogs`, FETCH_TIMEOUT_MS);
      if (!res.ok) throw new Error(`API responded with status ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error(`[BlogPage] Attempt ${attempt}/${MAX_RETRIES} failed: ${err.message}`);
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  console.error("[BlogPage] All retries failed — page will render with empty blog list.");
  return [];
}

const PAGE_URL = "https://zinniezeera.com/blog/";
const OG_IMAGE = "/ZinnieWebsiteImage.jpeg";
const TWITTER_IMAGE = "/Rustic-spice.png";
const TITLE = "Zinnie Blog | Latest Trends, Tips & Lifestyle Insights";
const DESCRIPTION =
  "Explore the Zinnie blog for the latest trends, expert tips, and useful insights. Stay updated with style guides, product tips, and lifestyle inspiration.";

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

export default async function Page() {
  const initialBlogs = await getInitialBlogs();
  return <BlogPageClient initialBlogs={initialBlogs} />;
}