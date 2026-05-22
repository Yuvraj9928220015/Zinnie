'use client';

import { useState } from "react";
import "./DistributorPageContent.css";

// ── Schema Scripts (JSON-LD) ───────────────────────────────────────────────────

const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zinniezeera.com/" },
        { "@type": "ListItem", "position": 2, "name": "Become a Distributor", "item": "https://zinniezeera.com/distributor" },
    ],
};

const schemaFAQPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": "How can I become a beverage distributor in India?", "acceptedAnswer": { "@type": "Answer", "text": "You can apply through the distributor form and complete the approval process." } },
        { "@type": "Question", "name": "What products are available for distribution?", "acceptedAnswer": { "@type": "Answer", "text": "Products include jeera soda, nimbu drinks, masala soda, and fruit-based beverages." } },
        { "@type": "Question", "name": "Is beverage distribution profitable in India?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it is a high-demand business with consistent growth opportunities." } },
        { "@type": "Question", "name": "Who can apply for distributorship?", "acceptedAnswer": { "@type": "Answer", "text": "Retailers, wholesalers, entrepreneurs, and FMCG distributors can apply." } },
        { "@type": "Question", "name": "What is the investment required?", "acceptedAnswer": { "@type": "Answer", "text": "Investment depends on location, scale, and distribution capacity." } },
        { "@type": "Question", "name": "Do you provide distributor support?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide supply chain, marketing, and business support." } },
        { "@type": "Question", "name": "Do you offer exclusive territory?", "acceptedAnswer": { "@type": "Answer", "text": "This depends on availability and market evaluation." } },
        { "@type": "Question", "name": "How long does approval take?", "acceptedAnswer": { "@type": "Answer", "text": "Approval timelines vary based on application review." } },
        { "@type": "Question", "name": "Can I expand to multiple locations?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, based on your business capacity and agreement." } },
        { "@type": "Question", "name": "Why choose Zinnie Zeera for distributorship?", "acceptedAnswer": { "@type": "Answer", "text": "Because of high-demand products, reliable supply, and strong business support." } },
    ],
};

const schemaContactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Become a Distributor",
    "url": "https://zinniezeera.com/distributor",
    "description": "Apply to become a beverage distributor in India with Zinnie Zeera and grow your business.",
    "mainEntity": {
        "@type": "Organization",
        "name": "Zinnie Zeera",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"],
        },
    },
};

const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Beverage Distribution",
    "provider": { "@type": "Organization", "name": "Zinnie Zeera" },
    "areaServed": { "@type": "Country", "name": "India" },
    "description": "Become a beverage distributor in India with Zinnie Zeera. Offering opportunities for soft drink distribution, jeera soda, masala soda, and flavored drinks supply.",
    "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" },
};

const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zinnie Zeera",
    "url": "https://zinniezeera.com/",
    "logo": "https://zinniezeera.com/Zinnie-logo.png",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-8432221711",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"],
    },
};

// ── Data ──

const mainContent = [
    {
        level: "h2",
        heading: "Become a Beverage Distributor in India – Build a Profitable Business with Zinnie Zeera",
    },
    {
        level: "p",
        body: "The beverage industry in India is one of the fastest-growing segments in the FMCG sector, offering strong and consistent demand across urban and rural markets. If you are looking to start or expand your business, becoming a <b>beverage distributor in India</b> is a highly profitable opportunity.",
    },
    {
        level: "p",
        body: "Zinnie Zeera invites entrepreneurs, wholesalers, and distributors to join its expanding network and become part of a growing <b>drink distributor company</b> that focuses on delivering high-demand beverages across India.",
    },
    {
        level: "p",
        body: "With a diverse product portfolio, competitive pricing, and strong market demand, this is the right time to establish yourself as a successful <b>soft drink distributor in India.</b>",
    },
    {
        level: "h2",
        heading: "Why the Beverage Distribution Business is Growing in India",
    },
    {
        level: "p",
        body: "India's beverage market is evolving rapidly due to changing consumer lifestyles, increasing demand for ready-to-drink products, and the popularity of flavored beverages.",
    },
    {
        level: "p",
        body: "Consumers today are looking for refreshing daily-use drinks, affordable beverage options, unique and bold flavors, and convenient ready-to-drink products. This growing demand has created massive opportunities for those looking to become a <b>cold drink supplier in India</b> or enter the beverage dealership market.",
    },
    {
        level: "h2",
        heading: "Why Choose Zinnie Zeera as Your Distribution Partner",
    },
    {
        level: "p",
        body: "Selecting the right brand is one of the most important decisions for any distributor. Zinnie Zeera provides a strong foundation for building a successful beverage distribution business.",
    },
    {
        level: "h3",
        heading: "High-Demand Product Portfolio",
    },
    {
        level: "p",
        body: "Our products are designed to meet everyday consumer demand. From traditional flavors to modern beverages, we offer products that sell consistently.",
    },
    {
        level: "h3",
        heading: "Strong Brand Positioning",
    },
    {
        level: "p",
        body: "We focus on creating products that resonate with Indian consumers, making it easier for distributors to sell and expand.",
    },
    {
        level: "h3",
        heading: "Competitive Pricing Strategy",
    },
    {
        level: "p",
        body: "We ensure pricing that allows distributors to maintain healthy profit margins while staying competitive in the market.",
    },
    {
        level: "h3",
        heading: "Reliable Supply Chain",
    },
    {
        level: "p",
        body: "Our efficient supply system ensures consistent product availability, helping distributors avoid stock shortages.",
    },
    {
        level: "h2",
        heading: "Product Range Available for Distributors",
    },
    {
        level: "p",
        body: "As a distributor, you will have access to a wide range of beverages that cater to different consumer preferences.",
    },
    {
        level: "h3",
        heading: "Jeera-Based Drinks",
    },
    {
        level: "p",
        body: "A highly popular category in India, ideal for those looking to become a <b>jeera soda distributor in India.</b>",
    },
    {
        level: "h3",
        heading: "Nimbu Zeera Drinks",
    },
    {
        level: "p",
        body: "Refreshing and tangy beverages with strong demand, perfect for a <b>nimbu zeera distributor</b> network.",
    },
    {
        level: "h3",
        heading: "Masala Soda Drinks",
    },
    {
        level: "p",
        body: "A growing segment for those targeting the <b>masala soda supplier India</b> category.",
    },
    {
        level: "h3",
        heading: "Fruit-Based Drinks",
    },
    {
        level: "p",
        body: "Includes mango and innovative flavors like chilli guava, ideal for a <b>flavored drinks distributor</b> business.",
    },
    {
        level: "h2",
        heading: "Market Opportunity for Beverage Distributors in India",
    },
    {
        level: "p",
        body: "The beverage industry offers consistent demand throughout the year. Unlike seasonal products, beverages are consumed daily, ensuring steady business flow.",
    },
    {
        level: "h3",
        heading: "Urban Market Demand",
    },
    {
        level: "p",
        body: "Cities have high demand due to lifestyle and convenience.",
    },
    {
        level: "h3",
        heading: "Rural Market Expansion",
    },
    {
        level: "p",
        body: "Rural markets are rapidly adopting packaged beverages.",
    },
    {
        level: "h3",
        heading: "Retail and Wholesale Opportunities",
    },
    {
        level: "p",
        body: "Distributors can serve both retail outlets and wholesale buyers.",
    },
    {
        level: "h3",
        heading: "Food Service Industry Demand",
    },
    {
        level: "p",
        body: "Restaurants, cafes, and vendors require a regular supply.",
    },
    {
        level: "h2",
        heading: "Who Can Apply for Beverage Distributorship",
    },
    {
        level: "p",
        body: "Zinnie Zeera welcomes a wide range of applicants across different business backgrounds.",
    },
    {
        level: "h3",
        heading: "Existing Distributors",
    },
    {
        level: "p",
        body: "Those already working in FMCG or beverage sectors.",
    },
    {
        level: "h3",
        heading: "Retailers and Wholesalers",
    },
    {
        level: "p",
        body: "Businesses looking to expand into distribution.",
    },
    {
        level: "h3",
        heading: "Entrepreneurs",
    },
    {
        level: "p",
        body: "Individuals seeking a new business opportunity.",
    },
    {
        level: "h3",
        heading: "Local Market Experts",
    },
    {
        level: "p",
        body: "People with strong knowledge of local distribution networks.",
    },
    {
        level: "h2",
        heading: "Benefits of Becoming a Zinnie Zeera Distributor",
    },
    {
        level: "p",
        body: "Partnering with Zinnie Zeera provides several business advantages.",
    },
    {
        level: "h3",
        heading: "High Profit Margins",
    },
    {
        level: "p",
        body: "Our pricing model ensures good returns on investment.",
    },
    {
        level: "h3",
        heading: "Fast-Moving Products",
    },
    {
        level: "p",
        body: "Products designed for quick sales and repeat demand.",
    },
    {
        level: "h3",
        heading: "Brand Support",
    },
    {
        level: "p",
        body: "We assist with branding and product positioning.",
    },
    {
        level: "h3",
        heading: "Easy Scalability",
    },
    {
        level: "p",
        body: "Expand your distribution network as your business grows.",
    },
    {
        level: "h2",
        heading: "How to Become a Beverage Distributor in India",
    },
    {
        level: "p",
        body: "The process to join our distribution network is simple and transparent.",
    },
    {
        level: "h3",
        heading: "Step 1: Submit Your Inquiry",
    },
    {
        level: "p",
        body: "Fill out the distributor form with your business details.",
    },
    {
        level: "h3",
        heading: "Step 2: Evaluation Process",
    },
    {
        level: "p",
        body: "We assess your location, capacity, and distribution reach.",
    },
    {
        level: "h3",
        heading: "Step 3: Approval and Onboarding",
    },
    {
        level: "p",
        body: "Once approved, you will be onboarded as an official distributor.",
    },
    {
        level: "h3",
        heading: "Step 4: Start Distribution",
    },
    {
        level: "p",
        body: "Begin supplying products and building your market presence.",
    },
    {
        level: "h2",
        heading: "Investment and Business Requirements",
    },
    {
        level: "p",
        body: "The investment required to become a beverage distributor in India depends on several factors including location and market size, storage and logistics capacity, initial stock purchase, and distribution network. Our team will guide you through the requirements based on your business goals.",
    },
    {
        level: "h2",
        heading: "Support Provided to Distributors",
    },
    {
        level: "p",
        body: "Zinnie Zeera ensures that all distributors receive the necessary support to succeed.",
    },
    {
        level: "h3",
        heading: "Product Supply Support",
    },
    {
        level: "p",
        body: "Consistent availability of products.",
    },
    {
        level: "h3",
        heading: "Marketing Assistance",
    },
    {
        level: "p",
        body: "Guidance on promoting products in your area.",
    },
    {
        level: "h3",
        heading: "Business Growth Support",
    },
    {
        level: "p",
        body: "Strategies to expand your distribution network.",
    },
    {
        level: "h3",
        heading: "Customer Demand Insights",
    },
    {
        level: "p",
        body: "Understanding market trends and consumer preferences.",
    },
    {
        level: "h2",
        heading: "Distribution Channels You Can Target",
    },
    {
        level: "p",
        body: "As a distributor, you can supply products to multiple channels including retail stores, kirana shops, supermarkets, restaurants, cafes, street vendors, and wholesale markets. This wide reach ensures maximum sales potential.",
    },
    {
        level: "h2",
        heading: "Why Beverage Distribution is a Long-Term Business Opportunity",
    },
    {
        level: "p",
        body: "The beverage industry offers long-term growth due to consistent consumer demand. Drinks are a daily-use product, ensuring repeat purchases and stable revenue. Becoming a <b>soft drink distributor in India</b> allows you to build a sustainable business with long-term profitability.",
    },
    {
        level: "h2",
        heading: "Competitive Advantage of Zinnie Zeera Products",
    },
    {
        level: "p",
        body: "Our products are designed to stand out in the market with unique flavor combinations, affordable pricing, high consumer appeal, and consistent quality. This gives distributors a competitive edge in selling and expanding their business.",
    },
    {
        level: "h2",
        heading: "Expand Your Business with Flavored Drinks Distribution",
    },
    {
        level: "p",
        body: "Flavored drinks are one of the fastest-growing segments in the beverage industry. Becoming a <b>flavored drinks distributor</b> allows you to tap into this growing demand and build a profitable business.",
    },
    {
        level: "h2",
        heading: "Start Your Journey as a Beverage Distributor Today",
    },
    {
        level: "p",
        body: "If you are looking to become a <b>drink distributor company</b> or expand your current operations, Zinnie Zeera provides the right platform to succeed. With strong demand, reliable supply, and business support, this is your opportunity to grow in the beverage industry.",
    },
];

const faqs = [
    {
        q: "How can I become a beverage distributor in India?",
        a: "You can apply through the distributor form and complete the approval process.",
    },
    {
        q: "What products can I distribute?",
        a: "You can distribute jeera soda, nimbu drinks, masala soda, and fruit-based beverages.",
    },
    {
        q: "Is beverage distribution profitable?",
        a: "Yes, it offers strong demand and consistent sales opportunities.",
    },
    {
        q: "Do you provide distributor support?",
        a: "Yes, we provide supply, marketing, and business guidance.",
    },
    {
        q: "Who is eligible for distributorship?",
        a: "Retailers, wholesalers, entrepreneurs, and existing distributors.",
    },
    {
        q: "What is the investment required?",
        a: "It depends on your location and business scale.",
    },
    {
        q: "Do you offer exclusive distribution rights?",
        a: "This depends on availability and market evaluation.",
    },
    {
        q: "How long does the approval process take?",
        a: "Approval timelines vary based on application review.",
    },
    {
        q: "Can I expand to multiple areas?",
        a: "Yes, based on your capacity and agreement.",
    },
    {
        q: "Why should I choose Zinnie Zeera?",
        a: "Because of high-demand products, strong support, and growth potential.",
    },
];

// ── Sub-components ──

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
                <p
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                />
            ) : null}
        </div>
    );
}

export default function DistributorPageContent() {
    const [openSection, setOpenSection] = useState(null);

    const toggle = (id) => {
        setOpenSection(openSection === id ? null : id);
    };

    return (
        <>
            {/* ── Schema Scripts (JSON-LD) ── */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQPage) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaContactPage) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
            />

            <div className="">
                <div className="accordion-root">

                    {/* ── Section 1: Main Content ── */}
                    <div className={`panel ${openSection === "content" ? "is-open" : ""}`}>
                        <button
                            className="panel-header"
                            onClick={() => toggle("content")}
                            aria-expanded={openSection === "content"}
                        >
                            <span className="panel-title"> Beverage Distributor in India</span>
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