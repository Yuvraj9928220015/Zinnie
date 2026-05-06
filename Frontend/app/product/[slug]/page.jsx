// app/product/[slug]/page.jsx

import ProductDetailClient from "./ProductDetailClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const API_URL = `${API_BASE_URL}/api`;

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const products = await res.json();
    return products.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ await add kiya

  try {
    const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed");
    const products = await res.json();
    const product = products.find((p) => p.slug === slug);

    if (!product) {
      return {
        title: "Product Not Found | JC Drink",
        description: "The product you are looking for does not exist.",
      };
    }

    const imageUrl = product.image?.startsWith("http")
      ? product.image
      : `${API_BASE_URL}/${product.image?.replace(/\\/g, "/").replace(/^\/+/, "")}`;

    const description =
      product.description ||
      `Buy ${product.title} online at JC Drink. Available in multiple sizes.`;

    return {
      title: `${product.title} | JC Drink`,
      description,
      keywords: [product.title, product.category, "JC Drink", "buy online", "beverages"]
        .filter(Boolean)
        .join(", "),
      openGraph: {
        title: `${product.title} | JC Drink`,
        description,
        images: [{ url: imageUrl, width: 800, height: 800, alt: product.title }],
        type: "website",
        siteName: "JC Drink",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.title} | JC Drink`,
        description,
        images: [imageUrl],
      },
      alternates: { canonical: `/product/${slug}` },
    };
  } catch {
    return {
      title: "JC Drink",
      description: "Buy beverages online at JC Drink.",
    };
  }
}

export default async function Page({ params }) {
  const { slug } = await params; // ✅ await add kiya

  let initialProduct = null;

  try {
    const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
    if (res.ok) {
      const products = await res.json();
      initialProduct = products.find((p) => p.slug === slug) || null;
    }
  } catch {
    // Client fallback karega
  }

  return <ProductDetailClient slug={slug} initialProduct={initialProduct} />;
}