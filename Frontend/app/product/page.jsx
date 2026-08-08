import Link from "next/link";
import styles from "./product.module.css";
import ProductPageContent from "./ProductPageContent";

const API_BASE_URL = "https://api.zinniezeera.com";

const PAGE_URL = "https://zinniezeera.com/product";
const OG_IMAGE = "https://zinniezeera.com/ZinnieWebsiteImage.jpeg";
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
    siteName: "Zinnie",
    url: PAGE_URL,
    description: DESCRIPTION,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Zinnie Soft Drinks Products Collection",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    site: "@zinniezeera",
    creator: "@zinniezeera",
    images: [
      {
        url: OG_IMAGE,
        alt: "Zinnie Soft Drinks Products Collection",
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

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://zinniezeera.com/product/#webpage",
      url: "https://zinniezeera.com/product/",
      name: "Zinnie Soft Drinks Products",
      isPartOf: {
        "@id": "https://zinniezeera.com/product/#website",
      },
      about: {
        "@id": "https://zinniezeera.com/product/#organization",
      },
      description:
        "Explore Zinnie's soft drink collection, including Zeera Masala Soda, Nimbu Zeera Drink, Mango Drink, Ginger Lemon Drink, and more refreshing beverages.",
    },
    {
      "@type": "CollectionPage",
      "@id": "https://zinniezeera.com/product/#collection",
      name: "Zinnie Soft Drinks Products",
      url: "https://zinniezeera.com/product",
      description:
        "Explore Zinnie's soft drink collection, including Zeera Masala Soda, Nimbu Zeera Drink, Mango Drink, Ginger Lemon Drink, and more refreshing beverages.",
      mainEntity: {
        "@id": "https://zinniezeera.com/product/#product-list",
      },
    },
    {
      "@type": "ItemList",
      "@id": "https://zinniezeera.com/product/#product-list",
      name: "Zinnie Drinks Collection",
      numberOfItems: 5,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Nimbu Zeera Drink",
          url: "https://zinniezeera.com/product/nimbu-zeera-drink/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Chilli Guava Drink",
          url: "https://zinniezeera.com/product/chilli-guava-drink/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Zeera Masala Soda",
          url: "https://zinniezeera.com/product/zeera-masala-soda/",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Mango Drink",
          url: "https://zinniezeera.com/product/mango-drink/",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Ginger Lemon Drink",
          url: "https://zinniezeera.com/product/ginger-lemon-drink/",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://zinniezeera.com/product/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://zinniezeera.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: "https://zinniezeera.com/product",
        },
      ],
    },
    {
      "@type": "AggregateRating",
      "@id": "https://zinniezeera.com/product/#rating",
      ratingValue: "4.9",
      reviewCount: "1120",
      bestRating: "5",
      worstRating: "1",
    },
  ],
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://zinniezeera.com/#faq-2",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes Zinnie different from other soft drinks in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie offers a unique blend of traditional Indian flavors and modern refreshment, unlike regular sugary sodas.",
      },
    },
    {
      "@type": "Question",
      name: "What type of soft drink is Zinnie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie is a jeera-based refreshing beverage with a tangy, spicy, and fizzy taste.",
      },
    },
    {
      "@type": "Question",
      name: "Can I buy Zinnie cold drinks online in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can easily buy Zinnie soft drinks online through our website with a simple and secure ordering process.",
      },
    },
    {
      "@type": "Question",
      name: "Are Zinnie drinks suitable for daily consumption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Zinnie drinks are designed for regular refreshment and can be enjoyed anytime.",
      },
    },
    {
      "@type": "Question",
      name: "What flavors are available in Zinnie drinks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie focuses on unique Indian-inspired flavors, especially jeera-based refreshing drinks.",
      },
    },
    {
      "@type": "Question",
      name: "Are Zinnie soft drinks better than regular sodas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie offers a more balanced and distinctive taste compared to overly sweet traditional sodas.",
      },
    },
    {
      "@type": "Question",
      name: "Is Zinnie suitable for all age groups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Zinnie drinks are enjoyed by people of all age groups.",
      },
    },
    {
      "@type": "Question",
      name: "When is the best time to drink Zinnie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie can be enjoyed anytime—during meals, after a long day, or as a refreshing break.",
      },
    },
    {
      "@type": "Question",
      name: "Are Zinnie cold drinks good for summer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! Zinnie drinks are perfect for beating the heat and staying refreshed.",
      },
    },
    {
      "@type": "Question",
      name: "How is Zinnie different from cola drinks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike cola drinks, Zinnie offers a tangy, spiced flavor inspired by Indian ingredients.",
      },
    },
    {
      "@type": "Question",
      name: "Can I serve Zinnie at parties or gatherings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Zinnie is a great choice for parties, family gatherings, and celebrations.",
      },
    },
    {
      "@type": "Question",
      name: "How should Zinnie drinks be served?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For the best experience, serve Zinnie chilled.",
      },
    },
    {
      "@type": "Question",
      name: "Is online ordering of Zinnie drinks safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we ensure a secure checkout process and safe packaging for all orders.",
      },
    },
    {
      "@type": "Question",
      name: "Does Zinnie offer home delivery across India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Zinnie provides timely delivery to ensure your drinks arrive fresh.",
      },
    },
    {
      "@type": "Question",
      name: "Are Zinnie drinks affordable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Zinnie offers high-quality beverages at competitive and affordable prices.",
      },
    },
    {
      "@type": "Question",
      name: "Why are cold drinks in India so popular?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cold drinks are convenient, refreshing, and perfect for India's climate and lifestyle.",
      },
    },
    {
      "@type": "Question",
      name: "Is Zinnie a modern or traditional beverage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie combines traditional Indian flavors with modern beverage innovation.",
      },
    },
    {
      "@type": "Question",
      name: "Can Zinnie replace regular soft drinks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Zinnie is a great alternative to traditional soft drinks with a more unique taste.",
      },
    },
    {
      "@type": "Question",
      name: "What occasions are best for drinking Zinnie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie is perfect for daily refreshment, social gatherings, travel, and special occasions.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I choose Zinnie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie offers a unique taste, consistent quality, affordability, and a refreshing experience in every sip.",
      },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
        <ProductPageContent />
      </div>
    </>
  );
}