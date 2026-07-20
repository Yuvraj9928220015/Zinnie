import Link from "next/link";
import "./Sitemap.css";

const sitemapData = [
  {
    heading: "HOME",
    links: [
      { label: "Home", href: "/" },
      { label: "About US", href: "/about/" },
      { label: "Blog", href: "/blog/" },
      { label: "FAQS", href: "/faqs" },
      { label: "Distributor", href: "/become-a-distributor/" },
      { label: "Contact", href: "/contact-us/" },
    ],
  },
  {
    heading: "SHOP",
    links: [
      { label: "All Products", href: "/product/" },
      { label: "Chilli Guava Drink", href: "/product/chilli-guava-drink/" },
      { label: "Nimbu Zeera", href: "/product/nimbu-zeera-drink/" },
      { label: "Ginger Lemon", href: "/product/ginger-lemon-drink/" },
      { label: "Zinnie Zeera", href: "/product/zeera-masala-soda/" },
      { label: "Zinnie Mango", href: "/product/mango-drink/" },
    ],
  },
];

export default function SitemapList() {
  return (
    <>
    <div className="sitemap-page">
      <div className="sitemap-hero">
        <div className="sitemap-hero-overlay">
          <h1>SITEMAP</h1>
        </div>
      </div>

      <div className="sitemap-content">
        {sitemapData.map((section) => (
          <div className="sitemap-column" key={section.heading}>
            <h2 className="sitemap-heading">{section.heading}</h2>
            <ul>
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}