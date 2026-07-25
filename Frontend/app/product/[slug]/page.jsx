import ProductDetailClient from "./ProductDetailClient";
import "./productFaqAccordion.css";
import {
  productSeoData,
  buildProductSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "../data/productData";

const API_BASE_URL = "http://localhost:8080";
const API_URL = `${API_BASE_URL}/api`;
const SITE_URL = "https://zinniezeera.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/ZinnieWebsiteImage.jpeg`;

export const dynamicParams = false;

async function getAllProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, {
      next: { revalidate: 3600 },
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
  return products.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

function getProductOgImage(product, seo) {
  if (seo?.image) {
    return seo.image.startsWith("http") ? seo.image : `${SITE_URL}${seo.image}`;
  }

  if (product?.image) {
    return product.image.startsWith("http")
      ? product.image
      : `${API_BASE_URL}/${product.image.replace(/\\/g, "/").replace(/^\/+/, "")}`;
  }

  return DEFAULT_OG_IMAGE;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const products = await getAllProducts();
  const product = products.find((p) => p.slug === slug);
  const seo = productSeoData[slug];

  if (!product) {
    return {
      title: "Product Not Found | Zinnie Zeera",
      description: "The product you are looking for does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const imageUrl = getProductOgImage(product, seo);
  const pageUrl = seo?.canonicalUrl || `${SITE_URL}/product/${slug}/`;
  const metaTitle = seo?.metaTitle || product.metaTitle || `${product.title} | Zinnie Zeera`;
  const metaDescription =
    seo?.metaDescription ||
    product.metaDescription ||
    product.description ||
    `Buy ${product.title} online at Zinnie Zeera.`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [product.title, seo?.name, product.category, "Zinnie Zeera", "jeera drink", "buy online", "beverages India"]
      .filter(Boolean)
      .join(", "),

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: pageUrl,
      siteName: "Zinnie Zeera",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.title || seo?.name || "Zinnie Product",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      creator: "@zinnie",
      images: [
        {
          url: imageUrl,
          alt: product.title || seo?.name || "Zinnie Product",
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
}

function SeoAboutContent({ sections }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="seo-content-wrapper">
      {sections.map((section, idx) => {
        const HeadingTag = section.tag || "h2";
        return (
          <div key={idx} className="seo-section">
            <HeadingTag className="seo-section-heading">{section.heading}</HeadingTag>

            {section.paragraphs?.map((p, pIdx) => (
              <p
                key={pIdx}
                className="seo-section-content"
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}

            {section.listIntro && (
              <p
                className="seo-section-content seo-list-intro"
                dangerouslySetInnerHTML={{ __html: section.listIntro }}
              />
            )}

            {section.list?.length > 0 && (
              <ul className="seo-section-list">
                {section.list.map((item, lIdx) => (
                  <li
                    key={lIdx}
                    className="seo-section-list-item"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            )}

            {section.closingParagraphs?.map((p, cIdx) => (
              <p
                key={cIdx}
                className="seo-section-content"
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}

            {section.subSections?.map((sub, sIdx) => {
              const SubTag = sub.tag || "h3";
              return (
                <div key={sIdx} className="seo-subsection">
                  {sub.heading && (
                    <SubTag
                      className="seo-subsection-heading"
                      dangerouslySetInnerHTML={{ __html: sub.heading }}
                    />
                  )}
                  {sub.text && (
                    <p
                      className="seo-section-content"
                      dangerouslySetInnerHTML={{ __html: sub.text }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function FaqAnswerContent({ faqList }) {
  if (!faqList || faqList.length === 0) return null;

  return (
    <div className="faq-static-list">
      {faqList.map((item, idx) => (
        <div key={idx} className="faq-static-item">
          <h3
            className="faq-static-question"
            dangerouslySetInnerHTML={{ __html: item.question }}
          />
          <p
            className="faq-static-answer"
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </div>
      ))}
    </div>
  );
}

export default async function Page({ params }) {
  const { slug } = await params;
  const products = await getAllProducts();
  const initialProduct = products.find((p) => p.slug === slug) || null;

  const seo = productSeoData[slug] || null;

  if (!initialProduct) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          gap: "12px",
        }}
      >
        <h2>Product Not Found</h2>
        <p>The product &quot;{slug}&quot; does not exist.</p>
        <a href="/product" style={{ color: "#ffd93d", fontWeight: 600 }}>
          ← Back to Products
        </a>
      </div>
    );
  }

  const productSchema = buildProductSchema(slug, initialProduct);
  const faqSchema = buildFaqSchema(slug);
  const breadcrumbSchema = buildBreadcrumbSchema(slug, initialProduct.title || seo?.name);
  const productTitle = initialProduct.title || seo?.name || "";

  return (
    <>
      <div className="product-seo-bottom-container">
        {productSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          />
        )}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        {breadcrumbSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
        )}

        {seo?.h1 && (
          <h1 className="sr-only">{seo.h1}</h1>
        )}

        <ProductDetailClient
          slug={slug}
          initialProduct={initialProduct}
          seoData={seo}
        />

        <div className="">
          <div
            className="product-seo-bottom"
            style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 0px 0px" }}
          >
            <div className="accordion-root-container">
              <div className="accordion-root">

                {seo?.seoSections?.length > 0 && (
                  <details className="acc-panel">
                    <summary className="acc-panel-header">
                      <span className="acc-panel-title">{productTitle}</span>
                      <span className="acc-panel-chevron">▾</span>
                    </summary>
                    <div className="acc-panel-inner">
                      <SeoAboutContent sections={seo?.seoSections} />
                    </div>
                  </details>
                )}

                {seo?.faq?.length > 0 && (
                  <details className="acc-panel">
                    <summary className="acc-panel-header">
                      <span className="acc-panel-title">Frequently Asked Questions</span>
                      <span className="acc-panel-chevron">▾</span>
                    </summary>
                    <div className="acc-panel-inner">
                      <FaqAnswerContent faqList={seo?.faq} />
                    </div>
                  </details>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}