import BlogClient from "./BlogClient";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
const SITE_URL = "https://zinniezeera.com";
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

let cachedBlogs = null;

async function getAllBlogs() {
  if (cachedBlogs) return cachedBlogs;
  if (!API_URL) return [];

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(`${API_URL}/api/blogs`, FETCH_TIMEOUT_MS);
      if (!res.ok) throw new Error(`API responded with status ${res.status}`);
      const data = await res.json();
      cachedBlogs = Array.isArray(data) ? data : [];
      return cachedBlogs;
    } catch (err) {
      console.error(`[blog] Attempt ${attempt}/${MAX_RETRIES} failed: ${err.message}`);
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  console.error("[blog] All retries failed for /api/blogs");
  cachedBlogs = [];
  return cachedBlogs;
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();
    if (blogs.length === 0) return [{ slug: "placeholder" }];

    const validSlugs = blogs
      .map((blog) => blog.urlHandle || blog.slug)
      .filter((slug) => typeof slug === "string" && slug.trim().length > 0)
      .map((slug) => ({ slug: slug.trim() }));

    const uniqueSlugs = Array.from(
      new Map(validSlugs.map((item) => [item.slug, item])).values()
    );

    return [{ slug: "placeholder" }, ...uniqueSlugs];
  } catch (error) {
    console.error("[blog] generateStaticParams error:", error);
    return [{ slug: "placeholder" }];
  }
}

async function getBlog(slug) {
  if (!slug || slug === "placeholder") return null;

  const blogs = await getAllBlogs();
  const match = blogs.find((b) => (b.urlHandle || b.slug) === slug);
  if (match) return match;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(`${API_URL}/api/blogs/${slug}`, FETCH_TIMEOUT_MS);
      if (!res.ok) throw new Error(`API responded with status ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`[blog] Fallback attempt ${attempt}/${MAX_RETRIES} failed for ${slug}: ${err.message}`);
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  return null;
}

function getAbsoluteImageUrl(imagePath) {
  if (!imagePath || imagePath.trim() === "") return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_URL}${imagePath}`;
}

function extractJsonLd(rawScript) {
  if (!rawScript || typeof rawScript !== "string") return null;

  let jsonString = rawScript.trim();

  const match = jsonString.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  if (match && match[1]) {
    jsonString = match[1].trim();
  }

  if (!jsonString) return null;

  try {
    JSON.parse(jsonString);
    return jsonString;
  } catch (err) {
    console.error("[blog] Invalid JSON-LD in blog.script:", err.message);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return {};

  const title = blog.pageTitle || blog.title;
  const description = blog.metaDescription || blog.description || "";
  const absoluteImage = getAbsoluteImageUrl(blog.image);

  return {
    title,
    description,
    keywords: blog.keywords || undefined,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${slug}/`,
      siteName: "Zinnie",
      images: absoluteImage
        ? [
            {
              url: absoluteImage,
              alt: blog.altTag || title,
            },
          ]
        : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: absoluteImage ? [absoluteImage] : [],
    },
  };
}

export default async function BlogSlugPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const jsonLd = blog ? extractJsonLd(blog.script) : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <BlogClient initialBlog={blog} />
    </>
  );
}