'use client';

import { useState } from "react";
import "./ProductPageContent.css";

// ── Schema Scripts (JSON-LD) ───

const schemaItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Buy Soft Drinks Online in India",
    "url": "https://zinniezeera.com/product",
    "numberOfItems": 5,
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Product", "name": "Nimbu Zeera", "url": "https://zinniezeera.com/product/nimbu-zeera/" } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Product", "name": "Zinnie Zeera", "url": "https://zinniezeera.com/product/zinnie-zeera/" } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Product", "name": "Mango", "url": "https://zinniezeera.com/product/zinnie-mango/" } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "Product", "name": "Ginger Lemon", "url": "https://zinniezeera.com/product/ginger-lemon/" } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "Product", "name": "Chilli Guava", "url": "https://zinniezeera.com/product/chilli-guava/" } },
    ],
};

const schemaCollectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Buy Soft Drinks Online in India",
    "url": "https://zinniezeera.com/product",
    "description": "Explore and buy soft drinks online in India. Discover affordable and refreshing beverages from Zinnie Zeera.",
};

const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zinniezeera.com/" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://zinniezeera.com/product" },
    ],
};

const schemaWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Buy Soft Drinks Online in India",
    "url": "https://zinniezeera.com/product",
    "description": "Buy soft drinks online in India. Explore affordable soft drinks and refreshing beverages from Zinnie Zeera.",
};

const schemaFAQPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": "Where can I buy soft drinks online in India?", "acceptedAnswer": { "@type": "Answer", "text": "You can buy soft drinks online directly from Zinnie Zeera, offering a wide range of refreshing beverages across India." } },
        { "@type": "Question", "name": "What types of soft drinks are available in India?", "acceptedAnswer": { "@type": "Answer", "text": "Zinnie Zeera offers a variety of soft drinks in India, including fruity, fizzy, and refreshing beverage options for all taste preferences." } },
        { "@type": "Question", "name": "Are your soft drinks affordable for daily use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, our soft drinks are designed to be affordable, making them suitable for everyday consumption without compromising on quality." } },
        { "@type": "Question", "name": "Do you offer bulk purchase options for soft drinks?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide bulk ordering options for retailers, distributors, and businesses looking to stock soft drinks in India." } },
        { "@type": "Question", "name": "How long does delivery take when buying soft drinks online?", "acceptedAnswer": { "@type": "Answer", "text": "Delivery timelines may vary based on location, but we aim to process and deliver orders as quickly as possible across India." } },
        { "@type": "Question", "name": "Are your soft drinks suitable for all age groups?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, our beverages are enjoyed by people of all age groups, offering refreshing options for everyone." } },
        { "@type": "Question", "name": "What makes your soft drinks different from other brands in India?", "acceptedAnswer": { "@type": "Answer", "text": "Our focus on affordability, consistent quality, and taste makes our soft drinks a reliable choice in the Indian market." } },
        { "@type": "Question", "name": "Can retailers partner with you to sell soft drinks?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, retailers and distributors can partner with Zinnie Zeera to sell our high-demand soft drinks and grow their business." } },
        { "@type": "Question", "name": "Are your soft drinks made using hygienic processes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, all our soft drinks are manufactured using hygienic processes and quality-controlled production standards." } },
        { "@type": "Question", "name": "Is it safe to buy soft drinks online from your website?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, our platform ensures a secure and reliable experience for customers who want to buy soft drinks online in India." } },
    ],
};

// ── Data ──

const mainContent = [
    {
        level: "h2",
        heading: "Buy Soft Drinks Online in India – Explore Our Refreshing Beverage Range",
    },
    {
        level: "p",
        body: "Zinnie Zeera offers a wide and growing selection of soft drinks in India, crafted to deliver refreshing taste, consistent quality, and unbeatable affordability. If you are looking to buy soft drinks online, our platform provides a seamless way to explore, compare, and purchase beverages that suit every preference and occasion.",
    },
    {
        level: "p",
        body: "In today's fast-paced lifestyle, consumers prefer convenience and reliability. That's why our range is designed not only for individual consumption but also for retailers, wholesalers, and distributors who want high-demand beverage products. Whether you are stocking your store or simply looking for refreshing drinks at home, Zinnie Zeera ensures easy access to quality beverages across India.",
    },
    {
        level: "h2",
        heading: "Explore Our Range of Soft Drinks in India",
    },
    {
        level: "p",
        body: "The Indian beverage market is diverse, and customer preferences vary across regions. Zinnie Zeera understands this diversity and offers a carefully curated range of soft drinks in India that cater to different taste profiles, consumption habits, and price expectations.",
    },
    {
        level: "h3",
        heading: "Wide Variety of Flavours",
    },
    {
        level: "p",
        body: "Our product portfolio includes a variety of refreshing flavours designed to appeal to a broad audience. From fruity and tangy drinks to fizzy and classic options, each beverage is crafted to deliver satisfaction with every sip.",
    },
    {
        level: "h3",
        heading: "Drinks Designed for Indian Taste Preferences",
    },
    {
        level: "p",
        body: "We focus on creating beverages that match local taste preferences, ensuring strong acceptance and repeat demand across urban and rural markets.",
    },
    {
        level: "h3",
        heading: "Constant Innovation in Beverage Selection",
    },
    {
        level: "p",
        body: "We continuously work on expanding our product line by introducing new flavours and formats to meet evolving consumer trends in the soft drinks India market.",
    },
    {
        level: "h2",
        heading: "Buy Soft Drinks Online with Ease",
    },
    {
        level: "p",
        body: "With digital convenience becoming a priority, more consumers now prefer to buy soft drinks online instead of relying solely on offline stores. Zinnie Zeera simplifies this process by offering a smooth and user-friendly experience.",
    },
    {
        level: "h3",
        heading: "Simple and User-Friendly Ordering",
    },
    {
        level: "p",
        body: "Our platform allows customers to browse products, check details, and place orders with minimal effort, ensuring a hassle-free shopping experience for all users.",
    },
    {
        level: "h3",
        heading: "Secure and Reliable Transactions",
    },
    {
        level: "p",
        body: "We prioritize customer trust by ensuring that every transaction is safe and secure, giving buyers confidence while purchasing online.",
    },
    {
        level: "h3",
        heading: "Quick Order Processing and Delivery",
    },
    {
        level: "p",
        body: "We focus on efficient order handling to ensure that customers receive their products without unnecessary delays.",
    },
    {
        level: "h2",
        heading: "Affordable Pricing for Every Customer",
    },
    {
        level: "p",
        body: "Affordability is one of the key factors that define Zinnie Zeera. Our mission is to provide affordable soft drinks in India without compromising on quality or taste.",
    },
    {
        level: "h3",
        heading: "Cost-Effective Options for Daily Consumption",
    },
    {
        level: "p",
        body: "Our drinks are priced to ensure that they remain accessible for everyday use, making them a preferred choice for budget-conscious consumers.",
    },
    {
        level: "h3",
        heading: "Competitive Pricing for Bulk Buyers",
    },
    {
        level: "p",
        body: "Retailers and distributors benefit from our pricing strategy, which allows them to maintain healthy margins while offering competitive prices to their customers.",
    },
    {
        level: "h3",
        heading: "Value for Money in Every Bottle",
    },
    {
        level: "p",
        body: "Each product is designed to deliver maximum satisfaction at a reasonable price, ensuring long-term customer loyalty.",
    },
    {
        level: "h2",
        heading: "Premium Quality Soft Drinks in India",
    },
    {
        level: "p",
        body: "Quality is a major factor in building trust and brand value. Zinnie Zeera ensures that every product meets high standards of quality and safety.",
    },
    {
        level: "h3",
        heading: "Hygienic Manufacturing Processes",
    },
    {
        level: "p",
        body: "Our beverages are produced in controlled environments with strict hygiene protocols to maintain safety and freshness.",
    },
    {
        level: "h3",
        heading: "Carefully Selected Ingredients",
    },
    {
        level: "p",
        body: "We use quality ingredients to ensure that every drink delivers a great taste and a consistent experience.",
    },
    {
        level: "h3",
        heading: "Quality Control at Every Stage",
    },
    {
        level: "p",
        body: "From production to packaging, every step is monitored to maintain high standards and customer satisfaction.",
    },
    {
        level: "h2",
        heading: "Soft Drinks for Every Occasion",
    },
    {
        level: "p",
        body: "Zinnie Zeera beverages are designed to fit into every lifestyle and occasion, making them a versatile choice for all types of consumers.",
    },
    {
        level: "h3",
        heading: "Perfect for Parties and Celebrations",
    },
    {
        level: "p",
        body: "Our drinks add refreshment to any celebration, making them a popular choice for events and gatherings.",
    },
    {
        level: "h3",
        heading: "Everyday Refreshment Solution",
    },
    {
        level: "p",
        body: "Whether at home, work, or travel, our beverages provide instant refreshment anytime.",
    },
    {
        level: "h3",
        heading: "Suitable for All Age Groups",
    },
    {
        level: "p",
        body: "Our wide range ensures that there is something for everyone, from kids to adults.",
    },
    {
        level: "h2",
        heading: "Nationwide Delivery Across India",
    },
    {
        level: "p",
        body: "We aim to make our products accessible across the country by building a strong distribution and delivery network.",
    },
    {
        level: "h3",
        heading: "Expanding Reach in Urban and Rural Markets",
    },
    {
        level: "p",
        body: "Our growing network ensures availability in both cities and smaller towns.",
    },
    {
        level: "h3",
        heading: "Reliable Logistics and Supply Chain",
    },
    {
        level: "p",
        body: "We maintain an efficient supply chain to ensure timely delivery and consistent availability.",
    },
    {
        level: "h3",
        heading: "Serving Individual and Business Customers",
    },
    {
        level: "p",
        body: "Our delivery system supports both individual buyers and bulk purchasers.",
    },
    {
        level: "h2",
        heading: "Solutions for Retailers and Distributors",
    },
    {
        level: "p",
        body: "Zinnie Zeera is not just a consumer brand but also a business opportunity for retailers and distributors looking to grow in the beverage sector.",
    },
    {
        level: "h3",
        heading: "High Demand Products for Retail Stores",
    },
    {
        level: "p",
        body: "Our beverages are designed to move quickly in the market, ensuring steady sales for retailers.",
    },
    {
        level: "h3",
        heading: "Profitable Margins for Business Partners",
    },
    {
        level: "p",
        body: "Our pricing and demand help retailers and distributors achieve strong profit margins.",
    },
    {
        level: "h3",
        heading: "Easy Stock Management",
    },
    {
        level: "p",
        body: "Our packaging and supply system make it easy to manage inventory and restock efficiently.",
    },
    {
        level: "h2",
        heading: "Bulk Orders and Wholesale Opportunities",
    },
    {
        level: "p",
        body: "We provide scalable solutions for businesses looking to purchase beverages in large quantities.",
    },
    {
        level: "h3",
        heading: "Bulk Purchasing for Events and Businesses",
    },
    {
        level: "p",
        body: "Our products are ideal for large events, catering services, and business needs.",
    },
    {
        level: "h3",
        heading: "Flexible Order Quantities",
    },
    {
        level: "p",
        body: "We offer flexibility in order sizes to accommodate different customer requirements.",
    },
    {
        level: "h3",
        heading: "Dedicated Support for Bulk Buyers",
    },
    {
        level: "p",
        body: "Our team assists bulk buyers with order processing, pricing, and logistics.",
    },
    {
        level: "h2",
        heading: "Packaging Options for Every Requirement",
    },
    {
        level: "p",
        body: "Packaging plays an important role in product usability and convenience.",
    },
    {
        level: "h3",
        heading: "Multiple Bottle Sizes Available",
    },
    {
        level: "p",
        body: "We offer different packaging sizes to suit both individual consumption and bulk requirements.",
    },
    {
        level: "h3",
        heading: "Easy-to-Handle and Transport Packaging",
    },
    {
        level: "p",
        body: "Our packaging is designed for convenience, making it easy to store and transport.",
    },
    {
        level: "h3",
        heading: "Suitable for Retail Display",
    },
    {
        level: "p",
        body: "Our products are packaged to attract customers and enhance shelf visibility.",
    },
    {
        level: "h2",
        heading: "Growing Brand Presence in India",
    },
    {
        level: "p",
        body: "Zinnie Zeera is steadily building its presence in the competitive soft drink India market by focusing on quality, affordability, and accessibility.",
    },
    {
        level: "h3",
        heading: "Expanding Customer Base",
    },
    {
        level: "p",
        body: "We are continuously reaching new customers across different regions.",
    },
    {
        level: "h3",
        heading: "Strong Market Potential",
    },
    {
        level: "p",
        body: "The increasing demand for beverages creates strong growth opportunities for our brand.",
    },
    {
        level: "h3",
        heading: "Commitment to Long-Term Growth",
    },
    {
        level: "p",
        body: "We aim to build a sustainable brand that delivers value to customers and partners.",
    },
];

const faqs = [
    {
        q: "Where can I buy soft drinks online in India?",
        a: "You can buy soft drinks online directly from Zinnie Zeera, offering a wide range of refreshing beverages across India.",
    },
    {
        q: "What types of soft drinks are available in India?",
        a: "Zinnie Zeera offers a variety of soft drinks in India, including fruity, fizzy, and refreshing beverage options for all taste preferences.",
    },
    {
        q: "Are your soft drinks affordable for daily use?",
        a: "Yes, our soft drinks are designed to be affordable, making them suitable for everyday consumption without compromising on quality.",
    },
    {
        q: "Do you offer bulk purchase options for soft drinks?",
        a: "Yes, we provide bulk ordering options for retailers, distributors, and businesses looking to stock soft drinks in India.",
    },
    {
        q: "How long does delivery take when buying soft drinks online?",
        a: "Delivery timelines may vary based on location, but we aim to process and deliver orders as quickly as possible across India.",
    },
    {
        q: "Are your soft drinks suitable for all age groups?",
        a: "Yes, our beverages are enjoyed by people of all age groups, offering refreshing options for everyone.",
    },
    {
        q: "What makes your soft drinks different from other brands in India?",
        a: "Our focus on affordability, consistent quality, and taste makes our soft drinks a reliable choice in the Indian market.",
    },
    {
        q: "Can retailers partner with you to sell soft drinks?",
        a: "Yes, retailers and distributors can partner with Zinnie Zeera to sell our high-demand soft drinks and grow their business.",
    },
    {
        q: "Are your soft drinks made using hygienic processes?",
        a: "Yes, all our soft drinks are manufactured using hygienic processes and quality-controlled production standards.",
    },
    {
        q: "Is it safe to buy soft drinks online from your website?",
        a: "Yes, our platform ensures a secure and reliable experience for customers who want to buy soft drinks online in India.",
    },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function FaqItem({ faq, index }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="faq-item"
            style={{ animationDelay: `${index * 40}ms` }}
        >
            <button
                className={`faq-question ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <span className="faq-num">Q{index + 1}</span>
                <span className="faq-text">{faq.q}</span>
                <span className={`faq-arrow ${open ? "rotated" : ""}`}>▾</span>
            </button>

            <div className={`faq-answer ${open ? "expanded" : ""}`}>
                <p>{faq.a}</p>
            </div>
        </div>
    );
}

function ContentCard({ item, index }) {
    const Tag = item.level;
    const isHeading = ["h1", "h2", "h3"].includes(item.level);

    return (
        <div
            className={`content-card content-card--${item.level}`}
            style={{ animationDelay: `${index * 40}ms` }}
        >
            {isHeading && item.heading ? (
                <Tag className={`card-heading card-heading--${item.level}`}>
                    {item.heading}
                </Tag>
            ) : null}

            {item.body ? (
                <p className="card-text">{item.body}</p>
            ) : null}
        </div>
    );
}

// ── Main Accordion ─────────────────────────────────────────────────────────────

export default function ProductPageContent() {
    const [openSection, setOpenSection] = useState(null);

    const toggle = (id) => {
        setOpenSection(openSection === id ? null : id);
    };

    return (
        <>
            {/* ── Schema Scripts (JSON-LD) ── */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaCollectionPage) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebPage) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQPage) }}
            />

            <div className="accordion-root-container">
                <div className="accordion-root">

                    {/* ── Section 1: Main Content ── */}
                    <div className={`panel ${openSection === "content" ? "is-open" : ""}`}>
                        <button
                            className="panel-header"
                            onClick={() => toggle("content")}
                            aria-expanded={openSection === "content"}
                        >
                            <span className="panel-title"> Soft Drinks Online in India</span>
                            <span className="panel-chevron">▾</span>
                        </button>

                        <div className={`panel-body ${openSection === "content" ? "open" : ""}`}>
                            <div className="panel-inner">
                                <div className="content-grid">
                                    {mainContent.map((item, i) => (
                                        <ContentCard key={i} item={item} index={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Section 2: FAQs ── */}
                    <div className={`panel ${openSection === "faq" ? "is-open" : ""}`}>
                        <button
                            className="panel-header"
                            onClick={() => toggle("faq")}
                            aria-expanded={openSection === "faq"}
                        >
                            <span className="panel-title">Frequently Asked Questions</span>
                            <span className="panel-chevron">▾</span>
                        </button>

                        <div className={`panel-body ${openSection === "faq" ? "open" : ""}`}>
                            <div className="panel-inner">
                                <div className="faq-list">
                                    {faqs.map((faq, i) => (
                                        <FaqItem key={i} faq={faq} index={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}