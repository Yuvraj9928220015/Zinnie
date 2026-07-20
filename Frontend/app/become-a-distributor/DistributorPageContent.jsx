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
        heading: "Become a Beverage Distributor in India ",
    },
    {
        level: "p",
        body: "If you are looking to grow your business in the fast-moving beverage industry, becoming a beverage distributor in India with Zinnie is a strong and future-ready opportunity. The demand for refreshing and flavorful drinks such as <b>jeera soda, nimbu jeera, masala soda, mango drinks,</b> and other fruit-based beverages is growing rapidly across both urban and rural markets. Consumers today are actively shifting towards drinks that offer better taste, variety, and convenience compared to traditional soft drinks, creating a strong and consistent demand throughout the year.",
    },
    {
        level: "p",
        body: "Zinnie offers a modern and thoughtfully crafted range of ready-to-drink beverages designed for today’s evolving consumer preferences. Each product is developed to deliver a balanced flavor profile that combines traditional Indian taste inspirations with modern refreshment needs. This makes the products widely accepted across different age groups and market segments, including retail stores, restaurants, cafés, and general trade.",
    },
    {
        level: "p",
        body: "As a distribution partner, you get the opportunity to become part of this expanding beverage ecosystem and build a profitable, scalable, and long-term business. With growing category demand and increasing consumer awareness, this is the right time to enter the beverage distribution sector with a brand that focuses on quality, consistency, and strong market potential.",
    },
    {
        level: "h2",
        heading: " Why Choose Zinnie as Your Distribution Partner",
    },
    {
        level: "p",
        body: "Zinnie is not just another drink brand in the market. It is built around a clear vision of delivering refreshing beverages that combine traditional Indian taste inspiration with modern production techniques and high-quality packaging standards. Each product is carefully developed to ensure consistency in taste, freshness, and overall drinking experience, making it suitable for a wide range of consumers across different regions.",
    },
    {
        level: "p",
        body: "As a distribution partner, you benefit from working with a brand that operates in a high-growth beverage category and focuses on long-term market potential rather than short-term trends. The demand for flavored and traditional-inspired drinks is increasing steadily, especially in categories like <b>jeera soda, masala soda, and fruit-based beverages.</b>",
    },
    {
        level: "p",
        body: "<b>Key advantages of partnering with Zinnie include:</b>",
    },
    {
        level: "ul", items: [
            "Strong and growing demand for flavored drinks in India",
            "Rapid expansion of product categories such as jeera soda and fruit drinks",
            "Attractive profit margins for distributors and retail partners",
            "High repeat purchase potential due to taste and affordability",
            "Products suitable for all age groups and diverse customer segments",
            "Strong positioning in the fast-growing beverage industry",
            "Expanding brand visibility across multiple markets",
        ]
    },
    {
        level: "p",
        body: "This combination of product appeal, market demand, and brand positioning makes Zinnie a reliable and scalable choice for anyone looking for a soft drink distributor India opportunity or a long-term beverage dealership India business. It is designed for partners who want sustainable growth in a category that continues to expand year after year.",
    },
    {
        level: "h2",
        heading: "High-Demand Beverage Categories You Can Distribute",
    },
    {
        level: "p",
        body: "Zinnie offers a diverse and fast-selling range of <b>beverage products</b> that perform consistently well across different regions and customer segments. Each category is designed to match evolving consumer preferences, ensuring strong demand in retail stores, supermarkets, restaurants, cafés, and general trade outlets.",
    },
    {
        level: "h3",
        heading: "1.Jeera-Based Drinks",
    },
    {
        level: "p",
        body: "<a href='/product/nimbu-zeera-drink/'>Jeera soda and nimbu zeera drinks</a> are among the most popular traditional-inspired beverages in India. Their unique blend of cumin, citrus, and mild spices makes them a preferred choice for consumption with meals as well as during hot weather. These drinks have strong repeat demand due to their familiar yet refreshing taste profile.",
    },
    {
        level: "h3",
        heading: "2.Masala Soda Range",
    },
    {
        level: "p",
        body: "The <a href='/product/zeera-masala-soda/'>masala soda drink</a> category offers a bold and flavorful alternative to conventional soft drinks. With a combination of spice, tanginess, and fizz, these beverages are especially popular in restaurants, street food outlets, cafés, and quick-service establishments where customers look for something more exciting than standard colas.",
    },
    {
        level: "h3",
        heading: "3.Fruit Drinks",
    },
    {
        level: "p",
        body: "Fruit-based beverages such as <a href='/product/mango-drink/'>mango drinks</a> appeal to a wide and diverse audience, including families, children, and young consumers. Their naturally sweet and smooth flavor makes them suitable for everyday consumption, seasonal refreshment, and meal pairing, ensuring steady demand throughout the year.",
    },
    {
        level: "h3",
        heading: "4.Flavored Refreshing Drinks",
    },
    {
        level: "p",
        body: "The <a href='/product/chilli-guava-drink/'>flavored drinks </a>segment is one of the fastest-growing categories in the Indian beverage market. Consumers are increasingly shifting toward innovative, ready-to-drink options that offer variety and refreshment beyond traditional soft drinks. Zinnie’s flavored beverages are designed to meet this demand with consistent taste and wide market acceptance.",
    },
    {
        level: "h2",
        heading: "Why Beverage Distribution is a Growing Business in India",
    },
    {
        level: "p",
        body: "The beverage industry in India is experiencing strong and consistent growth, driven by evolving consumer preferences and lifestyle changes. Today’s consumers are becoming more selective about what they drink, moving away from overly sweet traditional soft drinks and increasingly choosing beverages that offer better flavor, variety, and a more refreshing experience.",
    },
    {
        level: "p",
        body: "Another major factor behind this shift is the growing demand for convenience.<b> Ready-to-drink beverages</b> that are easily available, portable, and require no preparation are becoming a preferred choice for busy urban and semi-urban populations. At the same time, rising exposure to new flavors and regional taste profiles has significantly expanded the market for innovative drinks such as jeera soda, masala soda, and fruit-based beverages.",
    },
    {
        level: "h3",
        heading: "Key growth drivers include the following:",
    },
    {
        level: "ul", items: [
            "Increasing demand for regional and traditional flavors inspired by Indian taste preferences",
            "Rising consumption of ready-to-drink beverages across all age groups",
            "Strong growth in retail, grocery, and HoReCa (Hotel, Restaurant, Café) sectors",
            "Growing preference for convenient, hygienically packaged drinks",
            "High seasonal demand, especially during summer months and festive periods",
            "Expanding reach of organized distribution networks across urban and rural markets",
        ]
    },
    {
        level: "p",
        body: "These factors collectively create a strong and sustainable opportunity for anyone looking to enter the beverage industry. Whether you are exploring a cold drink supplier India partnership or building a drink distributor company network, the market offers long-term potential supported by rising demand and continuous category expansion.",
    },
    {
        level: "h2",
        heading: "Who Can Become a Distributor",
    },
    {
        level: "p",
        body: "The<b> Zinnie distribution</b> opportunity is designed to be accessible to a wide range of business partners across the FMCG and beverage ecosystem. Whether you are already established in the industry or planning to enter it for the first time, this business model offers flexibility and growth potential for different levels of investment and experience.",
    },
    {
        level: "h3",
        heading: "This opportunity is especially suitable for:",
    },
    {
        level: "ul", items: [
            "Beverage wholesalers looking to expand their product portfolio",
            "FMCG distributors seeking high-demand, fast-moving beverage categories",
            "Retail business owners aiming to increase in-store product variety and margins",
            "Super stockists managing large-scale regional or district-level supply networks",
            "Entrepreneurs entering the beverage industry with a focus on scalable growth",
            "Existing soft drink distributor India networks looking to add innovative and high-demand products",
        ]
    },
    {
        level: "p",
        body: "Whether you are starting fresh or expanding your current business operations, Zinnie provides scalable distribution opportunities that can adapt to different market sizes and business goals. The product range is designed to perform well across multiple channels, making it suitable for both small retailers and large distribution networks.",
    },
    {
        level: "h2",
        heading: "Benefits of Becoming a Zinnie Distributor",
    },
    {
        level: "p",
        body: "By <b>partnering with Zinnie as a distribution associate</b>, you gain access to a growing beverage brand that is designed for strong market performance and long-term scalability. The product range is built around high-demand categories, ensuring steady movement and repeat purchases across different customer segments.",
    },
    {
        level: "h3",
        heading: "As a distributor, you can expect several key advantages that support business growth and stability:",
    },
    {
        level: "ul", items: [
            "Consistent product demand across retail and HoReCa channels",
            "Strong brand positioning in the fast-growing flavored beverages segment",
            "Easy market acceptance driven by familiar and appealing taste profiles",
            "Reliable support in product supply, logistics coordination, and availability",
            "Opportunities to expand into multiple beverage categories within a single brand ecosystem",
            "Increasing consumer demand for jeera soda distributor India and traditional-inspired beverages",
        ]
    },
    {
        level: "p",
        body: "These advantages collectively help create stable and scalable growth potential for distributors operating in both urban and semi-urban markets. With rising interest in flavored and ready-to-drink beverages, Zinnie offers a strong foundation for building a sustainable and profitable distribution business.",
    },
    {
        level: "h2",
        heading: "Business Opportunity in Flavored Drinks Segment",
    },
    {
        level: "p",
        body: "The <b>flavored drinks distributor</b> segment has emerged as one of the fastest-growing categories within the Indian beverage industry. With shifting consumer preferences and increasing awareness around taste variety and drink quality, more people are actively moving away from conventional soft drinks and exploring newer, more flavorful alternatives.",
    },

    {
        level: "p",
        body: "Today’s consumers are not just looking for refreshment—they want beverages that offer a better overall drinking experience. This has significantly increased demand for innovative and taste-driven products that combine tradition with modern convenience.",
    },
    {
        level: "h3",
        heading: "Key Consumer Preferences Driving This Growth:",
    },
    {
        level: "ul", items: [
            "Refreshing alternatives to colas and overly sugary soft drinks",
            "Traditional Indian flavor-based beverages such as jeera, masala, and nimbu-based drinks",
            "Affordable ready-to-drink options suitable for everyday use",
            "Convenient products that can be consumed at home, work, or on the go",
        ]
    },

    {
        level: "p",
        body: "Zinnie’s product range is strategically developed to align with these evolving preferences. By offering a mix of traditional-inspired and modern flavored beverages, the brand makes it easier for distributors to achieve faster market acceptance and stronger penetration across multiple retail channels. This creates a clear and scalable opportunity in the growing beverage distribution landscape",
    },
    {
        level: "h2",
        heading: "How to Get Started",
    },
    {
        level: "p",
        body: "<b>Becoming a Zinnie distributor</b> is a simple and structured process designed to help you begin operations quickly and efficiently. The onboarding flow ensures clarity at every step, from initial inquiry to product distribution in your assigned territory.",
    },
    {
        level: "h3",
        heading: "Step-by-Step Process:",
    },
    {
        level: "ul", items: [
            "Submit your business inquiry through the official channel",
            "Our team reviews your application along with your location and market potential",
            "Discussion of product range, pricing structure, and distribution terms",
            "Finalization of onboarding and approval of partnership",
            "Start supply and distribution in your allocated region",
        ]
    },

    {
        level: "p",
        body: "Once onboarded, you can begin building your local market presence with Zinnie’s fast-moving beverage portfolio and start serving retail outlets, wholesalers, and HoReCa customers in your territory.",
    },
    {
        level: "h2",
        heading: "Investment Requirements & Business Setup",
    },
    {
        level: "p",
        body: "Starting your journey as a <b>Zinnie distribution partner </b>does not require a complicated setup. The business model is designed to be flexible so that both new entrepreneurs and experienced distributors can participate based on their scale of operation.",
    },
    {
        level: "h3",
        heading: "To begin, you will typically need:",
    },
    {
        level: "ul", items: [
            "Basic working capital for initial stock purchase",
            "Storage space for inventory management",
            "Delivery or logistics arrangement (own or third-party)",
            "Local market network for retail distribution",
        ]
    },

    {
        level: "p",
        body: "The investment level can vary depending on the territory size and product volume. Zinnie focuses on helping partners build a scalable business step by step rather than requiring heavy upfront commitments.",
    },
    {
        level: "h2",
        heading: "Territory & Market Potential",
    },
    {
        level: "p",
        body: "Every distributor is assigned a specific territory to ensure focused growth and better market penetration. This helps avoid channel conflicts and allows partners to build strong relationships with retailers.",
    },
    {
        level: "h3",
        heading: "Key advantages of territory-based distribution:",
    },
    {
        level: "ul", items: [
            "Exclusive focus on assigned region",
            "Better control over retail network development",
            "Higher brand visibility in local markets",
            "Strong repeat ordering from established outlets",
        ]
    },

    {
        level: "p",
        body: "With increasing demand for beverages like<b> jeera soda, masala soda, and fruit drinks,</b> most territories offer strong untapped potential for growth.",
    },
    {
        level: "h3",
        heading: " Support Provided by Zinnie",
    },
    {
        level: "p",
        body: "<b>Zinnie</b> believes in building long-term partnerships, not just supply relationships. Distributors receive ongoing support to help grow their business efficiently.",
    },
    {
        level: "h3",
        heading: "Support includes:",
    },
    {
        level: "ul", items: [
            "Product training and category understanding",
            "Order and supply coordination assistance",
            "Marketing and promotional guidance",
            "New product launch updates",
            "Retail placement support strategies",
        ]
    },

    {
        level: "p",
        body: "This ensures that partners can focus more on sales and expansion rather than operational challenges.",
    },
    {
        level: "h2",
        heading: "Marketing & Brand Support",
    },
    {
        level: "p",
        body: "To help distributors establish faster market presence, Zinnie supports brand-level visibility and marketing efforts",
    },
    {
        level: "h3",
        heading: "You benefit from:",
    },


    {
        level: "ul", items: [
            "Strong brand identity in flavored beverages",
            "Product packaging designed for shelf appeal",
            "Consumer-friendly taste positioning",
            "Regional demand-driven product strategy",
        ]
    },
    {
        level: "p",
        body: "This makes it easier to introduce products in new markets and build retailer trust quickly",
    },
    {
        level: "h2",
        heading: "Sales Channels You Can Target",
    },
    {
        level: "p",
        body: "As a <b>distributor,</b> you can supply Zinnie beverages across multiple channels, increasing your earning potential.",
    },
    {
        level: "h3",
        heading: "Key channels include the following:",
    },
    {
        level: "ul", items: [
            "Grocery and general trade stores",
            "Supermarkets and retail chains",
            "Restaurants and cafés (HoReCa segment)",
            "Hotels and catering businesses",
            "Local vendors and beverage shops",
        ]
    },


    {
        level: "p",
        body: "This multi-channel approach helps maximize product movement and recurring orders.",
    },
    {
        level: "h2",
        heading: "Growth Opportunities with Zinnie",
    },
    {
        level: "p",
        body: "Once established, distributors can expand their business in multiple directions within the Zinnie ecosystem.",
    },
    {
        level: "h3",
        heading: "Growth options include the following:",
    },

    {
        level: "ul", items:
            ["Expanding to nearby territories",
                "Increasing product portfolio range",
                "Adding new beverage categories as they launch",
                "Scaling into super stockist roles",
                "Building a regional distribution network",

            ]
    },
    {
        level: "p",
        body: "This creates a long-term business pathway beyond just initial distribution.",
    },
    {
        level: "h2",
        heading: "Why Now is the Right Time",
    },
    {
        level: "p",
        body: "The beverage industry in India is undergoing a major shift. Consumers are actively moving toward:",
    },

    {
        level: "ul", items:
            [
                "Traditional Indian flavors",
                "Ready-to-drink convenience products",
                "Affordable and refreshing alternatives to colas",
            ]
    },

    {
        level: "p",
        body:"This shift is creating strong demand for products like jeera soda, nimbu jeera, masala soda, and fruit drinks—making it the right time to enter the market with a growing brand like Zinnie."
    },
    {
        level: "h2",
        heading: "Build a Strong Beverage Business with Zinnie",
    },
    {
        level: "p",
        body: "Zinnie offers a strong foundation for entrepreneurs looking to enter or expand in the beverage industry. With rising demand for masala soda, Indian networks, and regional flavored drinks, this is the right time to grow your business in the<a href='/https://zinniezeera.com/'> cold drinks</a> segment.",
    },
    {
        level: "p",
        body: "Whether you want to focus on<b> jeera soda, fruit drinks, or complete beverage distribution, </b>Zinnie provides the right product mix for long-term success."
    },
];

const faqs = [
    {
        q: " What is the Zinnie beverage distributor program?",
        a: "It is a business opportunity where partners can distribute Zinnie’s ready-to-drink beverages across their assigned region.",
    },
    {
        q: " How can I become a beverage distributor in India with Zinnie?",
        a: "You can apply through the inquiry form, after which the team reviews your application and proceeds with onboarding.",
    },
    {
        q: " Is prior experience required to become a distributor?",
        a: "No, both experienced FMCG distributors and new entrepreneurs can apply.",
    },
    {
        q: "What products will I be distributing?",
        a: "You will handle products like jeera soda, masala soda, nimbu jeera, mango drink, and other flavored beverages.",
    },
    {
        q: " What is the minimum investment required?",
        a: "Investment depends on territory size and initial stock requirements. Details are shared after inquiry evaluation.",
    },
    {
        q: " Do I get an exclusive territory?",
        a: "Yes, distributors are assigned specific territories to avoid overlap and ensure focused growth.",
    },
    {
        q: " What margins can I expect?",
        a: "Zinnie offers attractive and competitive margins designed for long-term business growth.",
    },
    {
        q: " Which regions are available for distribution?",
        a: "Availability depends on current market coverage and is discussed during onboarding.",
    },
    {
        q: " Is this suitable for small business owners?",
        a: "Yes, retail owners and small wholesalers can also become distributors.",
    },
    {
        q: " What support does Zinnie provide?",
        a: "Support includes product guidance, supply coordination, marketing assistance, and business onboarding.",
    },
    {
        q: " How fast can I start after applying?",
        a: "After approval, onboarding and supply can begin within a short time depending on location.",
    },
    {
        q: " What makes Zinnie different from other beverage brands?",
        a: "Zinnie focuses on traditional Indian-inspired flavors combined with modern packaging and consistency.",
    },
    {
        q: " Are the products fast-moving in the market?",
        a: "Yes, categories like jeera soda and fruit drinks have strong and growing demand.",
    },
    {
        q: " Can I distribute multiple Zinnie products?",
        a: "Yes, distributors can handle the full product range.",
    },
    {
        q: " Is storage space required?",
        a: "Yes, basic storage space is needed for inventory management.",
    },
    {
        q: " Do I need my own delivery system?",
        a: "You can use your own logistics or arrange local delivery partners.",
    },
    {
        q: " Are these products suitable for all age groups?",
        a: "Yes, Zinnie beverages are designed for wide consumer acceptance.",
    },
    {
        q: " Can I expand my business later?",
        a: "Yes, distributors can scale into larger territories or super stockist roles.",
    },
    {
        q: " How is product supply managed?",
        a: "Supply is coordinated regularly based on demand and distributor requirements.",
    },
    {
        q: "How do I apply for Zinnie distribution?",
        a: "You can apply directly through the official distributor inquiry page and the team will guide you through the process.",
    }
];

// ── Sub-components ──

function FaqItem({ faq, index }) {
    return (
        <div className="faq-static-item">
            <h3 className="faq-static-question">
                {index + 1}. {faq.q}
            </h3>
            <p className="faq-static-answer">
                {faq.a}
            </p>
        </div>
    );
}

function ContentCard({ item, index }) {
    const Tag = item.level;
    const isHeading = ["h1", "h2", "h3"].includes(item.level);
    const isList = item.level === "ul"
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
            {isList && item.items ? (
                <ul className="card-list">
                    {item.items.map((li, i) => (
                        <li key={i}>{li}</li>
                    ))}
                </ul>
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