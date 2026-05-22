'use client';

import { useState } from "react";
import "./Header.css";

// ── Schema Scripts (JSON-LD) ───────────────────────────────────────────────────

const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zinnie Zeera",
    "url": "https://zinniezeera.com/",
    "logo": "https://zinniezeera.com/Zinnie-logo.png",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8432221711",
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": ["https://www.instagram.com/zinniezeera/"]
};

const schemaWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zinnie Zeera",
    "url": "https://zinniezeera.com/",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://zinniezeera.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

const schemaWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Buy Affordable Soft Drinks & Cold Drinks in India Online",
    "url": "https://zinniezeera.com/",
    "description": "Searching for soft drinks in India? Zinnie offers affordable, refreshing cold drinks you'll love. Shop the best cool drinks online today!",
    "inLanguage": "en-IN",
    "isPartOf": {
        "@type": "WebSite",
        "name": "Zinnie Zeera",
        "url": "https://zinniezeera.com/"
    }
};

const schemaBeverageBusiness = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Zinnie Zeera",
    "image": "https://zinniezeera.com/Zinnie-logo.png",
    "url": "https://zinniezeera.com/",
    "telephone": "+91-8432221711",
    "email": "info@balajibeverages.com",
    "areaServed": "IN",
    "sameAs": ["https://www.instagram.com/zinniezeera/"]
};

const schemaFAQPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What are the best soft drinks in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The best soft drinks in India offer a balance of taste, affordability, and quality. Zinnie Zeera provides refreshing and budget-friendly options."
            }
        },
        {
            "@type": "Question",
            "name": "Are affordable soft drinks good in quality?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, affordable soft drinks can maintain high quality when produced with proper standards and hygienic processes."
            }
        },
        {
            "@type": "Question",
            "name": "Which cold drinks are most popular in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Popular cold drinks include fruity beverages, fizzy sodas, and flavored drinks catering to various preferences."
            }
        },
        {
            "@type": "Question",
            "name": "Why is the demand for soft drinks increasing in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Demand is increasing due to changing lifestyles, hot climate, and preference for convenient beverages."
            }
        },
        {
            "@type": "Question",
            "name": "What makes a soft drink brand the best in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Taste, pricing, availability, quality, and strong distribution networks define the best soft drink brands."
            }
        },
        {
            "@type": "Question",
            "name": "Are cold drinks suitable for daily consumption?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Cold drinks are best enjoyed occasionally for refreshment and social occasions."
            }
        },
        {
            "@type": "Question",
            "name": "How to choose the right cold drink brand in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Choose based on taste, price, quality, and availability."
            }
        },
        {
            "@type": "Question",
            "name": "What are the benefits of affordable soft drinks for retailers?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "They attract more customers, sell faster, and offer better margins."
            }
        },
        {
            "@type": "Question",
            "name": "Do soft drink brands offer distributorship opportunities in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, many brands including Zinnie Zeera offer distributorship opportunities."
            }
        },
        {
            "@type": "Question",
            "name": "What flavours are available in cold drinks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Flavours include orange, lemon, cola, and mixed fruit."
            }
        },
        {
            "@type": "Question",
            "name": "Are soft drinks safe to consume?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, when produced under proper standards and consumed in moderation."
            }
        },
        {
            "@type": "Question",
            "name": "What packaging options are available for soft drinks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "They are available in small, large, and bulk packaging."
            }
        },
        {
            "@type": "Question",
            "name": "Why are cold drinks popular during summer in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "They provide instant cooling and refreshment."
            }
        },
        {
            "@type": "Question",
            "name": "How can I start a soft drink distribution business in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Partner with a brand, study demand, and build a distribution network."
            }
        },
        {
            "@type": "Question",
            "name": "Where can I buy affordable soft drinks in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "They are available via retailers, wholesalers, and distributors."
            }
        }
    ]
};

// ── Data ──────────────────────────────────────────────────────────────────────

const mainContent = [
    {
        level: "h2",
        heading: "Affordable Soft Drinks in India – Best Cold Drinks for Every Occasion",
    },
    {
        level: "p",
        body: "Zinnie Zeera introduces a refreshing and value-driven range of affordable soft drinks in India, created to deliver the perfect combination of taste, quality, and accessibility. In a market where consumers are constantly looking for beverages that are both enjoyable and budget-friendly, our brand focuses on providing high-quality cold drinks that meet everyday needs.",
    },
    {
        level: "p",
        body: "Whether you are a consumer seeking instant refreshment, a retailer aiming to stock fast-moving products, or a distributor looking for profitable beverage options, Zinnie Zeera offers solutions tailored for everyone. With the growing demand for soft drinks in India, we are committed to delivering products that align with modern preferences while maintaining traditional taste satisfaction.",
    },
    {
        level: "p",
        body: "Our goal is simple — to become one of the best cool drinks in India by offering consistency, affordability, and great taste in every bottle.",
    },
    {
        level: "h2",
        heading: "Discover the Best Cool Drinks in India",
    },
    {
        level: "p",
        body: "Zinnie Zeera is dedicated to offering some of the best cool drinks in India, combining refreshing taste with consistent quality. Our beverages are crafted to meet the expectations of modern consumers who seek both flavor and value. With a focus on innovation and customer satisfaction, we ensure that every product delivers a unique and enjoyable experience.",
    },
    {
        level: "h3",
        heading: "Refreshing Flavours Loved Across India",
    },
    {
        level: "p",
        body: "India is a diverse country with varied taste preferences, and Zinnie Zeera understands the importance of catering to this diversity. Our beverages are carefully crafted to appeal to a wide audience by offering refreshing flavours that resonate with Indian consumers. From tangy fruit-based drinks to fizzy classics, each product is designed to deliver a satisfying and enjoyable experience.",
    },
    {
        level: "h3",
        heading: "Perfect Drinks for Summer & Daily Refreshment",
    },
    {
        level: "p",
        body: "With rising temperatures across most parts of India, the need for refreshing beverages has never been greater. Our cold drinks are specifically designed to provide instant cooling and refreshment, making them ideal for summer consumption as well as daily refreshment.",
    },
    {
        level: "h2",
        heading: "Growing Demand for Soft Drinks in India",
    },
    {
        level: "p",
        body: "The demand for soft drinks in India is rapidly increasing due to lifestyle changes, urbanization, and the need for convenient refreshment options. Consumers are now more inclined toward ready-to-drink beverages that offer taste, affordability, and accessibility. This growing demand creates strong opportunities for brands that can consistently deliver value.",
    },
    {
        level: "h3",
        heading: "Why Soft Drinks Are Popular Among Indian Consumers",
    },
    {
        level: "p",
        body: "Soft drinks have become an essential part of modern consumption habits. Their availability, variety, and instant refreshment make them a preferred choice among people of all age groups.",
    },
    {
        level: "h3",
        heading: "Trends in the Indian Beverage Market",
    },
    {
        level: "p",
        body: "The Indian beverage market is evolving with a strong focus on affordability and availability. Brands that provide competitive pricing along with quality are gaining more traction in both urban and rural markets.",
    },
    {
        level: "h2",
        heading: "Affordable Soft Drinks Without Compromising Taste",
    },
    {
        level: "p",
        body: "At Zinnie Zeera, affordability is not just about pricing—it's about delivering maximum value. Our affordable soft drinks are designed to ensure that customers enjoy great taste without spending more. We believe that everyone deserves access to high-quality beverages at reasonable prices.",
    },
    {
        level: "h3",
        heading: "Budget-Friendly Options for Retailers & Consumers",
    },
    {
        level: "p",
        body: "Our pricing strategy benefits both consumers and retailers by offering products that are easy to purchase and quick to sell. This creates a win-win situation for all stakeholders.",
    },
    {
        level: "h3",
        heading: "High Quality at Competitive Prices",
    },
    {
        level: "p",
        body: "We maintain strict quality standards while optimizing production costs, ensuring that every product meets expectations without becoming expensive.",
    },
    {
        level: "h2",
        heading: "Why Choose Zinnie Zeera Cold Drinks",
    },
    {
        level: "p",
        body: "Choosing the right beverage brand is important for both consumers and businesses. Zinnie Zeera stands out by offering reliability, taste, and affordability. Our commitment to quality and customer satisfaction makes us a preferred choice in the cold drinks segment.",
    },
    {
        level: "h3",
        heading: "Consistent Quality & Great Taste",
    },
    {
        level: "p",
        body: "We ensure that every bottle delivers the same level of taste and freshness, helping us build trust among customers.",
    },
    {
        level: "h3",
        heading: "Ideal for Distributors & Retail Businesses",
    },
    {
        level: "p",
        body: "Our products are designed for high demand, making them easy to sell and profitable for distributors and retailers.",
    },
    {
        level: "h3",
        heading: "Hygienic Production & Trusted Ingredients",
    },
    {
        level: "p",
        body: "We follow hygienic production practices and use quality ingredients to maintain safety and consistency.",
    },
    {
        level: "h2",
        heading: "Cold Drinks for Every Occasion",
    },
    {
        level: "p",
        body: "Zinnie Zeera offers versatile beverage options suitable for every occasion. Whether it's a celebration or a daily refreshment need, our cold drinks provide the perfect solution for all situations.",
    },
    {
        level: "h3",
        heading: "Perfect for Parties, Events & Daily Use",
    },
    {
        level: "p",
        body: "Our drinks are ideal for gatherings, events, and everyday consumption, making them a convenient and reliable choice.",
    },
    {
        level: "h3",
        heading: "A Refreshing Choice for All Age Groups",
    },
    {
        level: "p",
        body: "With a wide range of flavours, our beverages appeal to people of all ages, ensuring broad market acceptance.",
    },
    {
        level: "h2",
        heading: "Soft Drink Distribution Opportunities in India",
    },
    {
        level: "p",
        body: "The expanding market for soft drinks in India presents significant opportunities for distributors and retailers. Zinnie Zeera aims to build a strong distribution network by partnering with individuals and businesses looking to grow in the beverage sector.",
    },
    {
        level: "h3",
        heading: "Partner With Us as a Distributor",
    },
    {
        level: "p",
        body: "We offer easy onboarding and strong support to help our partners establish and expand their business.",
    },
    {
        level: "h3",
        heading: "Benefits of Joining Zinnie Zeera Network",
    },
    {
        level: "p",
        body: "Our partners benefit from competitive pricing, consistent product demand, and reliable supply chains, ensuring long-term profitability.",
    },
    {
        level: "h2",
        heading: "Explore Our Range of Cold Drinks",
    },
    {
        level: "p",
        body: "Our diverse product range is designed to meet varying consumer needs and preferences. Zinnie Zeera focuses on offering multiple options to ensure strong demand and repeat purchases in the market.",
    },
    {
        level: "h3",
        heading: "Popular Flavours Available",
    },
    {
        level: "p",
        body: "We provide a variety of flavours that cater to different taste preferences, ensuring customer satisfaction across regions.",
    },
    {
        level: "h3",
        heading: "Packaging Options for Every Need",
    },
    {
        level: "p",
        body: "Our products come in multiple packaging sizes suitable for retail, wholesale, and bulk distribution requirements.",
    },
];

const faqs = [
    {
        q: "What are the best soft drinks in India?",
        a: "The best soft drinks in India offer a perfect balance of taste, affordability, and quality. Brands like Zinnie Zeera focus on delivering refreshing and budget-friendly options for everyday consumption.",
    },
    {
        q: "Are affordable soft drinks good in quality?",
        a: "Yes, affordable soft drinks can maintain high quality when produced with proper standards, hygienic processes, and quality ingredients.",
    },
    {
        q: "Which cold drinks are most popular in India?",
        a: "Popular cold drinks in India include fruity beverages, fizzy sodas, and flavored soft drinks that cater to a wide range of taste preferences.",
    },
    {
        q: "Why is the demand for soft drinks increasing in India?",
        a: "The demand for soft drinks in India is increasing due to changing lifestyles, rising temperatures, and the need for convenient and refreshing beverages.",
    },
    {
        q: "What makes a soft drink brand the best in India?",
        a: "A soft drink brand becomes popular based on taste, pricing, availability, quality, and strong distribution networks.",
    },
    {
        q: "Are cold drinks suitable for daily consumption?",
        a: "Cold drinks can be enjoyed occasionally for refreshment, especially during hot weather or social gatherings.",
    },
    {
        q: "How to choose the right cold drink brand in India?",
        a: "Choose a brand that offers good taste, competitive pricing, consistent quality, and easy availability in your area.",
    },
    {
        q: "What are the benefits of affordable soft drinks for retailers?",
        a: "Affordable soft drinks attract more customers, ensure faster sales, and provide better profit margins for retailers.",
    },
    {
        q: "Do soft drink brands offer distributorship opportunities in India?",
        a: "Yes, many soft drink brands, including Zinnie Zeera, offer distributorship opportunities for business growth.",
    },
    {
        q: "What flavours are available in cold drinks?",
        a: "Cold drinks are available in a wide variety of flavours such as orange, lemon, cola, and mixed fruit.",
    },
    {
        q: "Are soft drinks safe to consume?",
        a: "Yes, soft drinks are safe when produced under proper hygiene standards and consumed in moderation.",
    },
    {
        q: "What packaging options are available for soft drinks?",
        a: "Soft drinks are available in different packaging sizes, including small bottles, large bottles, and bulk packaging for distributors.",
    },
    {
        q: "Why are cold drinks popular during summer in India?",
        a: "Cold drinks provide instant refreshment and cooling, making them a preferred choice during hot summer months.",
    },
    {
        q: "How can I start a soft drink distribution business in India?",
        a: "You can start by partnering with a brand, understanding market demand, and building a local distribution network.",
    },
    {
        q: "Where can I buy affordable soft drinks in India?",
        a: "Affordable soft drinks are available through local retailers, wholesalers, and directly from brand distributors.",
    },
];

// ── Sub-components ──

function FaqItem({ faq, index }) {
    const [open, setOpen] = useState(false);

    return (
        <>
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
        </>
    );
}

// ── Dynamic Tag Renderer ───────────────────────────────────────────────────────

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

export default function Header() {
    const [openSection, setOpenSection] = useState(null);

    const toggle = (id) => {
        setOpenSection(openSection === id ? null : id);
    };

    return (
        <>
            {/* ── Schema Scripts (JSON-LD) ── */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebPage) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBeverageBusiness) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQPage) }}
            />

            <div className="accordion-root">

                {/* ── Section 1: Main Content ── */}
                <div className={`panel ${openSection === "content" ? "is-open" : ""}`}>
                    <button
                        className="panel-header"
                        onClick={() => toggle("content")}
                        aria-expanded={openSection === "content"}
                    >
                        <span className="panel-title">Zinnie Zeera – About Our Soft Drinks</span>
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
        </>
    );
}