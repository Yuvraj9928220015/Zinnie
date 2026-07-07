export const dynamic = "force-static";

const SITE_URL = "https://zinniezeera.com";
const API_BASE_URL = "https://api.zinniezeera.com";

export default async function sitemap() {
  const staticPages = [
    { url: `${SITE_URL}/`, priority: 1.0 },
    { url: `${SITE_URL}/about/`, priority: 0.8 },
    { url: `${SITE_URL}/contact-us/`, priority: 0.8 },
    { url: `${SITE_URL}/become-a-distributor/`, priority: 0.8 },
    { url: `${SITE_URL}/blog/`, priority: 0.7 },
    { url: `${SITE_URL}/faqs/`, priority: 0.7 },
    { url: `${SITE_URL}/product/`, priority: 0.9 },
  ].map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }));

  let productPages = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const products = await res.json();

    const seenSlugs = new Set();

    productPages = products
      .map((product) => {
        if (!product.slug || seenSlugs.has(product.slug)) return null;

        seenSlugs.add(product.slug);

        return {
          url: `${SITE_URL}/product/${product.slug}`,
          lastModified: product.updatedAt
            ? new Date(product.updatedAt)
            : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.error("Sitemap fetch failed:", err);
  }

  return [...staticPages, ...productPages];
}