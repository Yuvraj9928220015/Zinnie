// app/product/page.jsx
import Link from "next/link";
import styles from "./product.module.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const metadata = {
  title: "Our Products | JC Drink",
  description:
    "Browse our collection of refreshing drinks — Energy Drink, Desi Jeera, Clear Lemon, Cola and more.",
};

async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

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
  if (!imagePath)
    return "https://via.placeholder.com/300x300?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}/${imagePath
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")}`;
}

export default async function Page() {
  const products = await getProducts();
  const validProducts = products.filter((p) => p.slug);

  return (
    <div className={styles.productContainer}>
      {/* Header */}
      <div className={styles.productContainerContent}>
        <h1 className={styles.aboutHeading}>Our Products</h1>
        <div className={styles.productContainerContentDes}>
          Our collection of Refreshing Drinks.
        </div>
      </div>

      {/* Products */}
      <div className={styles.productsContainer}>
        {validProducts.length === 0 ? (
          <div className={styles.error}>
            <p>Koi product nahi mila. Admin se products add karein.</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {validProducts.map((product) => (
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
    </div>
  );
}