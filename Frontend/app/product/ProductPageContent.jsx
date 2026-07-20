'use client';

import { useState } from "react";
import "./ProductPageContent.css";

// ── Schema Scripts (JSON-LD) ───

const schemaItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Buy Cold Drinks Online in India",
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
    "name": "Buy Cold Drinks Online in India",
    "url": "https://zinniezeera.com/product",
    "description": "Explore and buy refreshing cold drinks online in India. Discover affordable, flavourful beverages from Zinnie Zeera.",
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
    "name": "Buy Cold Drinks Online in India",
    "url": "https://zinniezeera.com/product",
    "description": "Buy refreshing cold drinks online in India. Explore affordable, flavourful beverages from Zinnie Zeera.",
};



const mainContent = [
    { level: "h2", heading: "Soft Drinks India – Buy Refreshing Cold Drinks in India Online" },
    { level: "p", body: "Welcome to Zinnie – your go-to destination to explore and buy the most refreshing <b>soft drinks in India.</b> If you are searching for flavorful, high-quality, and unique cold drinks in India, you are in the right place. Our collection is carefully crafted to deliver the perfect blend of taste, refreshment, and tradition, ensuring that every sip is enjoyable, satisfying, and memorable." },
    { level: "p", body: "In today’s fast-moving lifestyle, consumers are looking for beverages that not only quench thirst but also offer a distinctive taste experience. Zinnie brings you a refreshing alternative to ordinary drinks by combining authentic Indian flavors with modern beverage innovation. Whether you are relaxing at home, working at the office, or enjoying time with friends and family, our drinks are designed to elevate every moment with unmatched refreshment." },
    { level: "p", body: "India’s beverage market is rapidly growing, with increasing demand for innovative and ready-to-drink options. The soft drinks India segment is evolving as consumers shift toward beverages that offer more than just sweetness. Changing lifestyles, rising disposable income, and the convenience of online shopping have contributed to the growing popularity of cold drinks in India across all age groups." },
    { level: "p", body: "This shift has opened the door for unique and flavorful drinks that go beyond traditional colas. Today’s consumers are actively exploring new taste profiles, including beverages inspired by regional and traditional ingredients. Zinnie fits perfectly into this trend by offering drinks that reflect Indian taste preferences while meeting modern quality standards." },
    { level: "p", body: "As demand continues to rise, <b>cold drinks in India</b> are no longer limited to seasonal consumption. They have become an everyday essential for refreshment, social gatherings, and quick breaks during busy routines. From casual sipping to special occasions, the role of soft drinks in India has expanded significantly, making them a key part of modern lifestyle choices." },
    { level: "p", body: "At Zinnie, we are committed to delivering beverages that stand out in both taste and quality. Our focus is on creating products that offer a refreshing experience while staying true to the rich heritage of Indian flavors. With every bottle, you get a perfect combination of tradition, innovation, and refreshment." },
    { level: "p", body: "Explore our range today and experience a new standard of soft drinks in India that truly redefines what cold drinks can be." },
    { level: "h2", heading: "Discover a New Range of Cold Drinks in India" },

    { level: "p", body: "The demand for <b>cold drinks in India</b> continues to rise, especially during hot weather, festive seasons, and everyday refreshment moments. Today’s consumers are not just looking for sugary sodas—they want beverages that deliver a refreshing experience, unique taste, and real value for money. This shift in preference has created a strong demand for innovative drinks that go beyond the ordinary." },
    { level: "p", body: "At Zinnie, we bring you a thoughtfully crafted range of beverages inspired by authentic Indian flavors. Our signature jeera-based drink offers a bold, tangy, and refreshing taste that instantly stands out. Designed to suit modern taste preferences while retaining a traditional touch, our drinks provide a perfect balance of flavor, fizz, and refreshment." },
    { level: "p", body: "Unlike conventional soft drinks that focus mainly on sweetness, Zinnie products are created to offer a more distinctive and satisfying flavor profile. This makes them an ideal choice for consumers who want something different from regular cold drinks in India." },
    { level: "p", body: "Cold drinks continue to be one of the most popular beverage categories in the country, driven by their affordability, convenience, and instant cooling effect. Whether it’s a quick refreshment during a busy day or a chilled drink shared with friends and family, the <b>demand for soft drinks in India </b>remains strong and ever-growing." },

    { level: "h2", heading: "Why Choose Our Soft Drinks in India" },
    { level: "p", body: "Choosing the right beverage is about more than just taste—it’s about the overall experience, consistent quality, and complete satisfaction. With so many options available today, consumers are becoming more selective about what they drink. Here’s why Zinnie is becoming a preferred choice among <b>soft drinks in India </b> for those who seek something refreshing, unique, and reliable." },

    { level: "h3", heading: "1. Unique Indian Flavor Experience" },
    { level: "p", body: "At Zinnie, we take inspiration from traditional Indian ingredients like jeera to create drinks that offer a distinctive and authentic taste. Our beverages bring a refreshing twist to classic flavors, giving you something beyond the usual options available in the market. This fusion of tradition and innovation makes every sip memorable." },

    { level: "h3", heading: "2. Perfect Balance of Taste and Refreshment" },
    { level: "p", body: "Our drinks are carefully crafted to achieve the ideal balance of spice, tanginess, and fizz. Unlike overly sweet beverages, Zinnie focuses on delivering a refreshing and well-rounded taste that can be enjoyed anytime. Whether you need a quick refreshment or a drink to complement your meal, our beverages fit perfectly." },

    { level: "h3", heading: "3. Growing Preference for Innovative Flavors" },
    { level: "p", body: "The demand for soft drinks in India is evolving as consumers look for new and exciting alternatives to traditional colas. People are now more open to trying beverages with unique flavor profiles and cultural roots. Zinnie aligns with this trend by offering innovative drinks that stand out in a competitive market." },

    { level: "h3", heading: "4. Affordable and Accessible" },
    { level: "p", body: "We believe great taste should be available to everyone. Zinnie offers affordable soft drinks without compromising on quality, making it easier for consumers to enjoy premium refreshment at a reasonable price. Our products are designed to be accessible, whether you are buying for daily use or special occasions." },

    { level: "h3", heading: "5. Consistent Quality You Can Trust" },
    { level: "p", body: "Every Zinnie drink is made with a focus on maintaining consistent taste and quality. From ingredients to packaging, we ensure that each bottle delivers the same refreshing experience every time you choose us." },
    { level: "p", body: "With Zinnie, you’re not just choosing a beverage—you’re choosing a modern take on soft drinks in India that combines flavor, quality, and value in every sip." },

    { level: "h2", heading: "The Evolution of Soft Drinks in India" },
    { level: "p", body: "The <b>soft drinks India </b>market has evolved significantly over the years, adapting to changing consumer preferences and modern lifestyles. While traditional carbonated beverages continue to dominate a large share of the market, there is a clear and growing shift toward drinks that are unique, functional, and inspired by cultural flavors." },
    { level: "p", body: "Today’s consumers are more aware, experimental, and quality-focused than ever before. They are no longer satisfied with just sweet, fizzy drinks—they are actively seeking beverages that offer a distinctive taste experience along with better value. This shift has created opportunities for brands like Zinnie to introduce refreshing alternatives that stand out in the competitive beverage space." },
    { level: "h4", heading: "Modern consumers are now drawn to beverages that offer the following:" },
    {
        level: "ul", items: [
            "Regional and traditional flavors that reflect India’s rich culinary heritage",
            "Health-conscious alternatives that feel lighter and more balanced",
            "Convenient ready-to-drink formats for busy lifestyles",
            "Easy online availability for quick access and hassle-free purchases",
        ]
    },
    { level: "p", body: "As a result, cold drinks in India are no longer just about instant refreshment—they are becoming a part of everyday lifestyle choices. From casual consumption to social gatherings, the expectations from <b>soft drinks in India </b>have expanded beyond basic refreshment." },
    { level: "p", body: "With the rapid growth of e-commerce and quick commerce platforms, buying cold drinks in India has become easier than ever. Consumers can now explore a wide variety of options, compare products, and order their favorite beverages from the comfort of their homes. This convenience has played a major role in boosting the popularity of online beverage shopping across the country." },
    { level: "p", body: "Zinnie is aligned with this evolution by offering drinks that combine traditional inspiration with modern convenience. As the market continues to grow, the demand for innovative and flavorful soft drinks in India will only increase, making it the perfect time to explore something new and refreshing." },

    { level: "h2", heading: "Perfect for Every Occasion" },
    { level: "p", body: "Whether it’s a family gathering, a celebration with friends, or a quick break during a busy day, Zinnie drinks fit perfectly into every moment. Designed to deliver instant refreshment and great taste, our beverages are suitable for all occasions and lifestyles." },

    { level: "p", body: "In a country like India, where weather conditions and social culture both influence beverage choices,<b> cold drinks in India </b>have become an essential part of everyday life. From beating the summer heat to enhancing special moments, the right drink adds a refreshing touch to any situation." },

    { level: "h4", heading: "Zinnie offers versatile drink options that can be enjoyed in multiple ways:" },
    {
        level: "ul", items: [
            "Daily refreshment during hot weather to stay cool and energized",
            "Serving guests at home with something unique and flavorful",
            "Office and work breaks for a quick and satisfying refreshment",
            "Travel and outdoor activities where convenience and taste matter most",
        ]
    },
    { level: "p", body: "Our drinks are crafted to suit both casual and special occasions, making them a reliable choice whenever you need a refreshing boost. Whether you are relaxing alone or sharing moments with others, Zinnie adds flavor to every experience." },
    { level: "p", body: "For the best taste and maximum refreshment, serve chilled and enjoy a crisp, flavorful burst in every sip. With Zinnie, every occasion becomes more enjoyable and refreshing." },

    { level: "h2", heading: "Buy Cold Drinks in India Online with Ease" },
    { level: "p", body: "Zinnie makes it simple and convenient to <b>buy soft drinks in India online.</b> With our user-friendly platform, you can easily explore a wide range of refreshing beverages, choose your favorites, and place your order in just a few clicks. Whether you are stocking up for daily refreshment or planning for a special occasion, Zinnie ensures a smooth and hassle-free shopping experience." },
    { level: "p", body: "As online shopping continues to grow, more consumers prefer the convenience of ordering cold drinks in India from the comfort of their homes. Zinnie is designed to meet this demand by offering a seamless browsing and checkout process, making it easier than ever to access high-quality beverages anytime, anywhere." },
    { level: "p", body: "We focus on delivering not just great taste, but also a reliable and secure shopping experience. When you order from Zinnie, you can expect:" },
    {
        level: "ul", items: [
            "Secure ordering process for safe and worry-free transactions",
            "Safe and hygienic packaging to maintain product quality",
            "Timely delivery so your drinks arrive fresh and ready to enjoy",
            "Consistent product quality with every order",
        ]
    },
    { level: "p", body: "Our goal is to bring your favorite cold drinks in India straight to your doorstep without any complications. From selection to delivery, every step is optimized to ensure convenience, quality, and satisfaction." },
    { level: "p", body: "With Zinnie, buying <b>soft drinks in India</b> online becomes quick, easy, and completely reliable." },


    { level: "h2", heading: "Experience the Future of Soft Drinks in India" },
    { level: "p", body: "The Indian beverage industry is evolving at a rapid pace, driven by changing consumer preferences, increasing competition, and continuous innovation. Today’s market is no longer limited to traditional options—new brands and products are redefining what people expect from <b>soft drinks in India.</b> Consumers are actively seeking beverages that offer unique flavors, better quality, and a more meaningful drinking experience." },
    { level: "p", body: "As this transformation continues, the demand for refreshing and innovative cold drinks in India is growing across all age groups. People are moving beyond standard sugary sodas and exploring drinks that reflect culture, creativity, and modern taste preferences. This shift is shaping the future of the soft drinks India market, creating space for brands that bring something new to the table." },
    { level: "p", body: "Zinnie is proud to be part of this new wave of innovation by offering beverages that combine traditional Indian taste with modern refreshment. Our drinks are inspired by authentic flavors while being crafted to meet the expectations of today’s consumers who value both taste and quality." },
    { level: "p", body: "We believe that a great beverage should do more than just quench thirst—it should deliver an experience. With Zinnie, every sip is about enjoying bold flavor, cultural richness, and consistent quality in one refreshing drink." },
    { level: "p", body: "As the industry continues to grow, Zinnie aims to lead with innovation, authenticity, and customer satisfaction, setting a new benchmark for soft drinks in India. Explore our range and experience the future of refreshment today." },

    { level: "h2", heading: "What Makes Zinnie Different from Other Soft Drinks in India?" },
    { level: "p", body: "In a highly competitive market filled with traditional and international beverage brands, Zinnie stands out by offering something truly unique. While many soft drinks in India focus only on sweetness and carbonation, Zinnie delivers a more refined and flavorful experience." },
    { level: "p", body: "Our drinks are inspired by Indian taste preferences, combining bold spices, tangy notes, and refreshing fizz. This creates a beverage that feels both familiar and exciting. Instead of following trends, Zinnie focuses on creating a category of its own—where tradition meets modern refreshment." },
    { level: "p", body: "This difference is what makes Zinnie a preferred choice for consumers who want more than just a regular cold drink." },
    { level: "h2", heading: "A Refreshing Alternative to Regular Cold Drinks " },
    { level: "p", body: "Most cold drinks in India are dominated by cola-based flavors, which can feel repetitive over time. Zinnie offers a refreshing alternative by introducing beverages that break away from the usual taste patterns." },
    { level: "p", body: "Our jeera-based drink, for example, provides a bold and tangy profile that is both refreshing and satisfying. It’s perfect for those who want a drink that complements Indian meals or offers a more balanced flavor experience." },
    { level: "p", body: "If you are looking to move beyond standard sodas, Zinnie gives you a new way to enjoy soft drinks in India." },

    { level: "h2", heading: "Crafted for Modern Indian Consumers" },
    { level: "p", body: "Today’s consumers are more informed and selective about their choices. They look for beverages that align with their lifestyle, preferences, and taste expectations. Zinnie is designed specifically for this new generation of consumers." },
    { level: "h4", heading: "We focus on:" },
    {
        level: "ul", items: [
            "Flavor innovation inspired by Indian ingredients",
            "Convenient packaging for on-the-go consumption",
            "Consistent quality across every bottle",
            "A refreshing experience that suits daily life",
        ]
    },

    { level: "h2", heading: "Quality Ingredients, Better Taste" },
    { level: "p", body: "The foundation of every great beverage is its ingredients. At Zinnie, we prioritize quality at every step of the process to ensure that each drink delivers a rich and satisfying taste." },
    { level: "p", body: "Our beverages are crafted using carefully selected ingredients that enhance flavor while maintaining consistency. This attention to detail ensures that every bottle meets high standards and provides the same refreshing experience every time." },

    { level: "p", body: "When it comes to <b>soft drinks in India,</b> quality is what sets brands apart—and Zinnie is committed to delivering it." },

    { level: "h2", heading: "Expanding the Choice of Soft Drinks in India" },
    { level: "p", body: "The Indian beverage market is evolving rapidly, and consumers are actively looking for more variety. Zinnie contributes to this evolution by expanding the choices available in the <b>soft drinks India </b>category." },
    { level: "p", body: "Instead of limiting options to traditional flavors, we introduce drinks that reflect regional inspiration and modern innovation. This not only enhances the consumer experience but also creates new opportunities in the growing market of cold drinks in India." },

    { level: "p", body: "With Zinnie, you get access to a new generation of beverages that are designed to match changing tastes and preferences." },
    { level: "h2", heading: "Shop Your Favorite Cold Drinks Today" },
    { level: "p", body: "<b>Ready to experience something refreshing and different?</b> Zinnie makes it simple to explore and enjoy a wide range of flavorful beverages online." },
    { level: "p", body: "Browse our collection, choose your favorite drinks, and place your order in just a few easy steps. Whether you are buying for personal refreshment or stocking up for an occasion, Zinnie ensures a smooth and reliable experience from selection to delivery." },
    { level: "p", body: "Upgrade your everyday refreshment with Zinnie and enjoy bold, satisfying flavors in every sip." },
   { level: "p", body: "If you are looking for the <a href='https://zinniezeera.com/product'>best soft drinks in India</a> or refreshing cold drinks that offer something unique, Zinnie is the perfect choice." },
    { level: "p", body: "Whether you're relaxing at home, working, traveling, or spending time with friends, Zinnie adds the perfect touch of refreshment to your day." },
    { level: "p", body: "<b>Explore our range today and discover a better alternative to regular beverages—where every sip brings together flavor, quality, and satisfaction in one bottle.</b>" },
];

// ── Data: FAQs ──


const faqs = [
    { q: "What makes Zinnie different from other soft drinks in India?", a: "Zinnie offers a unique blend of traditional Indian flavors and modern refreshment, unlike regular sugary sodas." },
    { q: "What type of soft drink is Zinnie?", a: "Zinnie is a jeera-based refreshing beverage with a tangy, spicy, and fizzy taste." },
    { q: "Can I buy Zinnie cold drinks online in India?", a: "Yes, you can easily buy Zinnie soft drinks online through our website with a simple and secure ordering process." },
    { q: "Are Zinnie drinks suitable for daily consumption?", a: "Yes, Zinnie drinks are designed for regular refreshment and can be enjoyed anytime." },
    { q: "What flavors are available in Zinnie drinks?", a: "Zinnie focuses on unique Indian-inspired flavors, especially jeera-based refreshing drinks." },
    { q: "Are Zinnie soft drinks better than regular sodas?", a: "Zinnie offers a more balanced and distinctive taste compared to overly sweet traditional sodas." },
    { q: "Is Zinnie suitable for all age groups?", a: "Yes, Zinnie drinks are enjoyed by people of all age groups." },
    { q: "When is the best time to drink Zinnie?", a: "Zinnie can be enjoyed anytime—during meals, after a long day, or as a refreshing break." },
    { q: "Are Zinnie cold drinks good for summer?", a: "Absolutely! Zinnie drinks are perfect for beating the heat and staying refreshed." },
    { q: "How is Zinnie different from cola drinks?", a: "Unlike cola drinks, Zinnie offers a tangy, spiced flavor inspired by Indian ingredients." },
    { q: "Can I serve Zinnie at parties or gatherings?", a: "Yes, Zinnie is a great choice for parties, family gatherings, and celebrations." },
    { q: "How should Zinnie drinks be served?", a: "For the best experience, serve Zinnie chilled." },
    { q: "Is online ordering of Zinnie drinks safe?", a: "Yes, we ensure a secure checkout process and safe packaging for all orders." },
    { q: "Does Zinnie offer home delivery across India?", a: "Yes, Zinnie provides timely delivery to ensure your drinks arrive fresh." },
    { q: "Are Zinnie drinks affordable?", a: "Yes, Zinnie offers high-quality beverages at competitive and affordable prices." },
    { q: "Why are cold drinks in India so popular?", a: "Cold drinks are convenient, refreshing, and perfect for India’s climate and lifestyle." },
    { q: "Is Zinnie a modern or traditional beverage?", a: "Zinnie combines traditional Indian flavors with modern beverage innovation." },
    { q: " Can Zinnie replace regular soft drinks?", a: "Yes, Zinnie is a great alternative to traditional soft drinks with a more unique taste." },
    { q: "What occasions are best for drinking Zinnie?", a: "Zinnie is perfect for daily refreshment, social gatherings, travel, and special occasions." },
    { q: " Why should I choose Zinnie?", a: "Zinnie offers a unique taste, consistent quality, affordability, and a refreshing experience in every sip." },
];


const schemaFAQPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
};

// ── Sub-components ─────────────────────────────────────────────────────────────

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
    const isHeading = ["h1", "h2", "h3", "h4"].includes(item.level);
    const isList = item.level === "ul";
    const Tag = isHeading ? item.level : "p";

    return (
        <div
            className={`content-card content-card--${item.level}`}
            style={{ animationDelay: `${index * 40}ms` }}
        >
            {isHeading && item.heading ? (
                // dangerouslySetInnerHTML lets you drop <b>/<a>/<i> tags straight into item.heading if you ever need to
                <Tag
                    className={`card-heading card-heading--${item.level}`}
                    dangerouslySetInnerHTML={{ __html: item.heading }}
                />
            ) : null}

            {isList && Array.isArray(item.items) ? (
                <ul className="card-list">
                    {item.items.map((li, i) => (
                        // dangerouslySetInnerHTML lets you add <b>bold</b> or <a href="...">links</a> inside any list item
                        <li key={i} dangerouslySetInnerHTML={{ __html: li }} />
                    ))}
                </ul>
            ) : null}

            {!isList && item.body ? (
                // dangerouslySetInnerHTML lets you add <b>bold</b> or <a href="...">links</a> directly inside item.body
                <p className="card-text" dangerouslySetInnerHTML={{ __html: item.body }} />
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
                            <span className="panel-title"> Cold Drinks Online in India</span>
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