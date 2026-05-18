import ProductDetailClient from "./ProductDetailClient";

const API_BASE_URL = "https://api.zinniezeera.com";
const API_URL = `${API_BASE_URL}/api`;

export const dynamicParams = false;

async function getAllProducts() {
  try {
    // next: { revalidate } hataya
    const res = await fetch(`${API_URL}/products`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const products = await res.json();
    return Array.isArray(products) ? products : [];
  } catch (err) {
    console.warn("[getAllProducts] failed:", err.message);
    return [];
  }
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const products = await getAllProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Zinnie",
      description: "The product you are looking for does not exist.",
    };
  }

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${API_BASE_URL}/${product.image?.replace(/\\/g, "/").replace(/^\/+/, "")}`;

  const description =
    product.description ||
    `Buy ${product.title} online at Zinnie. Available in multiple sizes.`;

  return {
    title: `${product.title} | Zinnie`,
    description,
    keywords: [product.title, product.category, "Zinnie", "buy online", "beverages"]
      .filter(Boolean)
      .join(", "),
    openGraph: {
      title: `${product.title} | Zinnie`,
      description,
      images: [{ url: imageUrl, width: 800, height: 800, alt: product.title }],
      type: "website",
      siteName: "Zinnie",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Zinnie`,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const products = await getAllProducts();
  const initialProduct = products.find((p) => p.slug === slug) || null;

  if (!initialProduct) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", gap: "12px" }}>
        <h2>Product Not Found</h2>
        <p>The product "{slug}" does not exist.</p>
        <a href="/product" style={{ color: "#ffd93d", fontWeight: 600 }}>
          ← Back to Products
        </a>
      </div>
    );
  }

  return <ProductDetailClient slug={slug} initialProduct={initialProduct} />;
}