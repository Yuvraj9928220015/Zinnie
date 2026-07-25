import Link from "next/link";
import styles from "./product.module.css";
import ProductPageContent from "./ProductPageContent";

const API_BASE_URL = "https://api.zinniezeera.com";

const PAGE_URL = "https://zinniezeera.com/product";
const OG_IMAGE = "/ZinnieWebsiteImage.jpeg";
const TITLE = "Buy Refreshing Soft Drinks Online in India";
const DESCRIPTION =
  "Looking to buy soft drinks online in India? Explore Zinnie's range of refreshing and delicious soft drinks — order your favorite drinks today!";

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
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Zinnie",
    type: "website",
    locale: "en_IN",
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

function getPriceRange(product) {
  if (!product.priceVariations?.length)
    return `₹${Number(product.price || 0).toFixed(2)}`;
  const prices = product.priceVariations.map((v) => Number(v.price));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max
    ? `₹${min.toFixed(2)}`
    : `₹${min.toFixed(2)} – ₹${max.toFixed(2)}`;
}

function getImageUrl(imagePath) {
  if (!imagePath) return "https://via.placeholder.com/300x300?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/").replace(/^\/+/, "")}`;
}

async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.filter((p) => p.slug) : [];
  } catch {
    return [];
  }
}

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.productContainerContent}>
          <h1 className={styles.aboutHeading}>Affordable & Delicious Soft Drinks Collection</h1>
          <div className={styles.productContainerContentDes}>
            Our collection of Refreshing Drinks.
          </div>
        </div>

        <div className={styles.productsContainer}>
          {products.length === 0 ? (
            <div className={styles.error}>
              <p>Koi product nahi mila. Admin se products add karein.</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug}`}
                  className={styles.productItem}
                  style={{ textDecoration: "none" }}
                >
                  <div className={styles.productCard}>
                    <div className={styles.productImageContainer}>
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.title || "Product"}
                        className={styles.productImage}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productContainerTitle}>
                        {product.title || "Untitled Product"}
                      </h3>
                      <div className={styles.productBottom}>
                        <span className={styles.price}>
                          {getPriceRange(product)}
                        </span>
                        {product.priceVariations?.length > 0 && (
                          <div className={styles.sizesAvailable}>
                            {product.priceVariations.length} size
                            {product.priceVariations.length !== 1 ? "s" : ""}{" "}
                            available
                          </div>
                        )}
                      </div>
                      <div className={styles.viewButton}>
                        <button>View Product</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      <ProductPageContent/>
      </div>
    </>
  );
}