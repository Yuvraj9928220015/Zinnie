'use client';

import { useState } from "react";
import "./Header.css";

function renderRichText(text) {
    const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
    const nodes = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }
        if (match[1] !== undefined) {
            nodes.push(<strong key={key++}>{match[1]}</strong>);
        } else if (match[2] !== undefined) {
            nodes.push(
                <a key={key++} href={match[3]} className="card-list-link">
                    {match[2]}
                </a>
            );
        }
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex));
    }
    return nodes;
}

const mainContent = [
    {
        level: "h1",
        heading: "Buy Cold Drinks Online in India – Affordable & Best Soft Drinks",
    },
    {
        level: "p",
        body: "Welcome to Zinnie — your trusted destination to **buy cold drinks online in India**. If you are searching for refreshing, flavorful, and affordable soft drinks, you are in the right place. At Zinnie, we bring you a unique range of beverages inspired by traditional Indian flavors, blended perfectly with a modern twist to suit today's taste preferences.",
    },
    {
        level: "p",
        body: "In today's fast-paced lifestyle, cold drinks are more than just beverages—they are a refreshing escape from daily routine. Whether you are relaxing at home, enjoying a meal, hosting guests, or looking for a quick refreshment on the go, the right drink can instantly elevate your experience. That's where Zinnie stands out by offering some of the best cool drinks in India that are not only refreshing but also full of authentic flavor.",
    },
    {
        level: "p",
        body: "Our goal is to redefine soft drinks in India by moving beyond regular sugary sodas and introducing beverages that deliver both taste and uniqueness. From fizzy refreshment to bold desi flavors, every product is carefully crafted to provide a satisfying and memorable drinking experience.",
    },
    {
        level: "p",
        body: "If you are looking to **buy soft drinks online** that combine quality, affordability, and great taste, Zinnie is your perfect choice. We focus on delivering premium-quality cold drinks that match the expectations of modern consumers while staying connected to traditional Indian taste.",
    },
    {
        level: "p",
        body: "Explore our range and discover why more customers are choosing Zinnie for affordable soft drinks and refreshing beverages across India.",
    },
    {
        level: "h2",
        heading: "Our Popular Flavors",
    },
    {
        level: "p",
        body: "At Zinnie, we offer a carefully curated range of beverages designed to suit diverse taste preferences while staying true to authentic Indian flavors. Each drink is crafted to deliver a refreshing and memorable experience.",
    },
    {
        level: "ul",
        items: [
            { name: "Zeera Masala Soda", href: "https://zinniezeera.com/product/zeera-masala-soda/", desc: " — A bold combination of cumin, spices, and fizz that delivers a tangy and refreshing kick" },
            { name: "Nimbu Zeera Drink", href: "https://zinniezeera.com/product/nimbu-zeera/", desc: " — A perfect blend of citrusy lemon and traditional jeera for a balanced flavor" },
            { name: "Mango Drink", href: "https://zinniezeera.com/product/zinnie-mango/", desc: " — Smooth, sweet, and tropical, ideal for those who enjoy fruity refreshment" },
            { name: "Ginger Lemon Drink", href: "https://zinniezeera.com/product/ginger-lemon/", desc: " — A zesty fusion with a slight spicy undertone for a unique taste" },
            { name: "Chilli Guava Drink", href: "https://zinniezeera.com/product/chilli-guava/", desc: " — A distinctive mix of sweet guava and mild spice, offering a modern twist" },
        ],
    },
    {
        level: "p",
        body: "Each flavor is developed to provide a unique alternative to regular soft drinks while maintaining consistency in quality and taste.",
    },
    {
        level: "h2",
        heading: "Discover the Best Cold Drinks in India",
    },
    {
        level: "p",
        body: "When it comes to choosing the **best cool drinks in India**, taste, quality, and uniqueness play a crucial role. Today's consumers are no longer satisfied with regular sugary sodas—they are looking for refreshing beverages that offer something different, something more flavorful, and something that connects with Indian taste preferences. At Zinnie, we understand this shift and focus on delivering cold drinks that truly stand out from conventional options.",
    },
    {
        level: "p",
        body: "Our beverages are carefully crafted to provide a perfect balance of refreshment and flavor. We combine traditional ingredients with modern carbonation techniques to create drinks that are both exciting and satisfying. Whether you are enjoying a meal, relaxing at home, or celebrating with friends, our drinks are designed to enhance every moment.",
    },
    {
        level: "p",
        bold: true,
        body: "Our signature Zeera Masala Soda is a perfect blend of:",
    },
    {
        level: "ul",
        items: [
            "Refreshing fizz that instantly energizes",
            "Tangy lemon flavor for a zesty kick",
            "Traditional Indian spices for depth and richness",
            "Authentic cumin (jeera) taste that adds a unique twist",
        ],
    },
    {
        level: "p",
        body: "This powerful combination creates a bold and refreshing drink that is not only satisfying but also memorable. Unlike ordinary soft drinks, it delivers a distinct desi flavor that sets it apart in the growing market of soft drinks in India.",
    },
    {
        level: "p",
        body: "If you are searching for something beyond the usual, Zinnie brings you one of the best cold drinks in India—crafted for taste, quality, and a truly refreshing experience.",
    },
    {
        level: "h2",
        heading: "Why Choose Our Soft Drinks?",
    },
    {
        level: "p",
        body: "At Zinnie, we are committed to delivering premium-quality **soft drinks** in India that offer the perfect combination of taste, quality, and value. In a market filled with ordinary carbonated beverages, we focus on creating drinks that are not only refreshing but also unique and memorable. Our goal is to provide customers with beverages that go beyond basic refreshment and deliver a complete flavor experience.",
    },
    {
        level: "p",
        body: "We understand that today's consumers are more conscious about what they drink. That's why we ensure that every product is carefully crafted using quality ingredients and thoughtful flavor combinations. Whether you are enjoying a meal, relaxing after a long day, or celebrating special moments, Zinnie **soft drinks** are designed to fit every occasion.",
    },
    {
        level: "h3",
        heading: "Key Benefits:",
    },
    {
        level: "ul",
        items: [
            "Unique Indian flavor-based beverages inspired by traditional taste",
            "Made with carefully selected, high-quality ingredients",
            "Refreshing and digestive-friendly drinks suitable for Indian meals",
            "Perfect for daily consumption as well as parties and gatherings",
            "Affordable soft drinks that offer great value for money",
        ],
    },
    {
        level: "p",
        body: "Unlike regular carbonated drinks that focus only on sweetness and fizz, Zinnie beverages bring a distinctive desi twist that connects with Indian taste preferences. Our drinks are crafted to deliver a balanced flavor profile—refreshing, slightly tangy, and deeply satisfying.",
    },
    {
        level: "p",
        body: "If you are looking for the best cold drinks in India that combine authenticity, affordability, and quality, Zinnie is the perfect choice for you.",
    },
    {
        level: "h2",
        heading: "Affordable Soft Drinks for Everyone",
    },
    {
        level: "p",
        body: "At Zinnie, we strongly believe that great taste should not come at a high price. Everyone deserves to enjoy refreshing and high-quality beverages without worrying about cost. That's why we focus on offering **affordable soft drinks** that deliver premium taste, consistent quality, and excellent value for money.",
    },
    {
        level: "p",
        body: "Our pricing is designed to make our products accessible to a wide range of customers while maintaining the highest standards in flavor and freshness. Whether you are purchasing for personal use or business needs, Zinnie ensures that you get the best return on your investment.",
    },
    {
        level: "p",
        bold: true,
        body: "Whether you are:",
    },
    {
        level: "ul",
        items: [
            "Hosting a party or celebration with friends and family",
            "Running a retail store, restaurant, or café",
            "Buying for everyday home consumption",
        ],
    },
    {
        level: "p",
        body: "Zinnie offers the perfect balance of affordability and quality to suit every requirement.",
    },
    {
        level: "p",
        body: "Unlike many options in the market that either compromise on quality or come at a higher price, our soft drinks are crafted to deliver both. With Zinnie, you don't have to choose between cost and taste—you get both in every bottle.",
    },
    {
        level: "p",
        body: "If you are looking for affordable soft drinks in India that provide a refreshing experience without exceeding your budget, Zinnie is the ideal choice for you.",
    },
    {
        level: "h2",
        heading: "Buy Soft Drinks Online with Ease",
    },
    {
        level: "p",
        body: "Looking to buy soft drinks online in India? Zinnie makes the entire process simple, fast, and completely hassle-free. We understand that today's customers value convenience, speed, and security when shopping online, which is why we have created a seamless experience from browsing to delivery.",
    },
    {
        level: "p",
        body: "With just a few clicks, you can explore our wide range of **refreshing cold drinks**, compare options, and place your order without any complications. Our user-friendly platform ensures that you can easily find what you're looking for and complete your purchase in minutes.",
    },
    {
        level: "h3",
        heading: "Easy Shopping Experience:",
    },
    {
        level: "ul",
        items: [
            "Browse a wide range of cold drinks anytime, anywhere",
            "Secure online payments with trusted payment gateways",
            "Fast and reliable delivery across India",
            "Simple and hassle-free ordering process",
            "Smooth checkout with minimal steps",
        ],
    },
    {
        level: "p",
        body: "Whether you are ordering for your home, office, party, or business, Zinnie ensures a convenient and dependable shopping experience every time. We focus on delivering not just products, but a complete, customer-friendly service that saves your time and effort.",
    },
    {
        level: "p",
        body: "Now you can enjoy your favorite soft drinks in India without stepping out. Simply place your order online and get refreshing beverages delivered right to your doorstep, fresh and ready to enjoy.",
    },
    {
        level: "h2",
        heading: "A New Trend in Soft Drinks in India",
    },
    {
        level: "p",
        body: "The Indian beverage market is rapidly evolving, with consumers shifting their preferences from regular sugary sodas to more unique and flavorful options. Today, people are looking for **cold drinks** that not only refresh but also offer a distinctive taste experience rooted in Indian traditions. This growing demand has led to the rise of innovative beverages that blend authenticity with modern refreshment.",
    },
    {
        level: "p",
        body: "At Zinnie, we are proud to be part of this new trend in **soft drinks in India**. Our approach focuses on bringing traditional flavors back into the spotlight while enhancing them with a refreshing, fizzy twist that appeals to today's generation.",
    },
    {
        level: "p",
        bold: true,
        body: "Zinnie's jeera-based cold drink is gaining popularity because:",
    },
    {
        level: "ul",
        items: [
            "It offers a unique and bold taste compared to regular colas",
            "It perfectly complements Indian meals by enhancing overall flavor",
            "It provides a refreshing, tangy, and slightly spiced drinking experience",
            "It stands out as a healthier-feeling alternative to overly sweet beverages",
        ],
    },
    {
        level: "p",
        body: "This combination of tradition and innovation makes Zinnie one of the best cool drinks in India for modern consumers who are seeking something different from conventional options.",
    },
    {
        level: "p",
        body: "As more people explore new beverage choices, Zinnie continues to redefine what soft drinks can be—refreshing, flavorful, and truly connected to Indian taste.",
    },
    {
        level: "h2",
        heading: "Perfect Drink for Every Occasion",
    },
    {
        level: "p",
        body: "Zinnie soft drinks are crafted to fit seamlessly into every moment of your day, making them the perfect choice for any occasion. Whether you are looking for a quick refreshment or planning a special event, our beverages are designed to deliver consistent taste, freshness, and satisfaction every time.",
    },
    {
        level: "p",
        body: "In today's busy lifestyle, having a go-to cold drink that suits different situations is essential. Zinnie offers versatile **soft drinks in India** that complement both everyday routines and memorable celebrations. With their refreshing fizz and unique desi flavor, our drinks enhance every experience.",
    },
    {
        level: "p",
        bold: true,
        body: "Zinnie soft drinks are suitable for:",
    },
    {
        level: "ul",
        items: [
            "Daily refreshment at home after a long day",
            "Family gatherings, celebrations, and festive occasions",
            "Restaurants, cafés, and food service businesses",
            "Travel, picnics, and outdoor activities",
        ],
    },
    {
        level: "p",
        body: "No matter where you are or what you are doing, Zinnie beverages add a burst of freshness and flavor to your day. Their balanced taste makes them enjoyable on their own or alongside your favorite meals.",
    },
    {
        level: "p",
        body: "If you are searching for the best cold drinks in India that can match every occasion, Zinnie is the perfect choice for consistent refreshment and great taste.",
    },
    {
        level: "h2",
        heading: "Quality You Can Trust",
    },
    {
        level: "p",
        body: "At Zinnie, quality is at the core of everything we do. We understand that when it comes to **soft drinks in India**, customers expect not only great taste but also safety, consistency, and reliability. That's why we follow strict quality standards at every stage—from sourcing raw ingredients to final packaging and delivery.",
    },
    {
        level: "p",
        body: "Our process is designed to ensure that every bottle delivers the same refreshing taste and premium experience that our customers trust. We carefully select ingredients, use hygienic production methods, and implement quality checks to maintain high standards across all our products.",
    },
    {
        level: "h3",
        heading: "Our Quality Promise:",
    },
    {
        level: "ul",
        items: [
            "Freshness and consistent taste in every sip",
            "Safe and hygienic production processes",
            "High-quality, secure, and durable packaging",
            "Carefully sourced ingredients for better flavor",
            "Strict quality control at every stage",
        ],
    },
    {
        level: "p",
        body: "Unlike many ordinary options in the market, Zinnie focuses on delivering beverages that meet modern expectations of quality and safety while maintaining authentic flavor. Our commitment to excellence ensures that every product you receive is crafted with care and precision.",
    },
    {
        level: "p",
        body: "We aim to deliver the best soft drinks in India that not only satisfy your taste buds but also earn your trust with every purchase.",
    },
    {
        level: "h2",
        heading: "Growing Popularity of Flavored Cold Drinks",
    },
    {
        level: "p",
        body: "The demand for flavored **cold drinks in India** is growing rapidly as consumers move beyond traditional sugary sodas and explore beverages that offer both refreshment and a unique taste experience. Today's customers are more conscious of what they consume—they are looking for drinks that not only quench thirst but also deliver memorable flavors and a sense of authenticity.",
    },
    {
        level: "p",
        body: "One of the biggest trends in **soft drinks in India** is the return of traditional flavors with a modern twist. Ingredients like jeera (cumin), lemon, and Indian spices are gaining popularity again because they provide a nostalgic connection while still feeling fresh and exciting. These flavors remind consumers of classic Indian drinks, but with improved taste, convenience, and presentation.",
    },
    {
        level: "p",
        body: "At Zinnie, we have carefully designed our products to align with this growing trend. Our beverages are created to satisfy modern preferences while staying rooted in traditional Indian taste.",
    },
    {
        level: "p",
        bold: true,
        body: "Zinnie products are crafted by combining:",
    },
    {
        level: "ul",
        items: [
            "Tradition — inspired by authentic Indian flavors",
            "Innovation — enhanced with modern beverage techniques",
            "Taste — balanced, bold, and enjoyable flavor profiles",
            "Refreshment — fizzy, cooling, and satisfying experience",
        ],
    },
    {
        level: "p",
        body: "This thoughtful blend allows Zinnie to stand out in the competitive cold drinks market and positions it among the best cold drinks in India. As more consumers seek unique and flavorful beverages, Zinnie continues to deliver products that perfectly match evolving tastes and expectations.",
    },
    {
        level: "h2",
        heading: "How to Enjoy Zinnie Drinks",
    },
    {
        level: "p",
        body: "Zinnie beverages are versatile and can be enjoyed in multiple ways depending on the occasion. **To get the best experience, follow these simple suggestions:**",
    },
    {
        level: "ul",
        items: [
            "Serve chilled to enjoy maximum freshness and fizz",
            "Add ice cubes or a slice of lemon for enhanced flavor",
            "Pair with Indian meals such as snacks, street food, or main courses",
            "Use as a refreshing option during gatherings, parties, or celebrations",
            "Carry along for travel, picnics, or outdoor activities",
        ],
    },
    {
        level: "p",
        body: "These drinks are designed to complement both everyday moments and special occasions.",
    },
    {
        level: "h2",
        heading: "Why Buy from Zinnie Online",
    },
    {
        level: "p",
        body: "We focus on delivering a seamless and reliable online shopping experience so that customers can easily access their favorite beverages from anywhere in India.",
    },
    {
        level: "ul",
        items: [
            "Simple and user-friendly ordering process",
            "Secure payment options with trusted gateways",
            "Fast and dependable delivery services",
            "Carefully packaged products to maintain freshness",
            "Competitive pricing for better value",
        ],
    },
    {
        level: "p",
        body: "Our goal is to make buying soft drinks online convenient, safe, and efficient for every customer.",
    },
    {
        level: "h2",
        heading: "For Businesses and Bulk Buyers",
    },
    {
        level: "p",
        body: "Zinnie also supports business customers by offering flexible solutions for **bulk purchasing and distribution**. Our products are ideal for commercial environments that require consistent quality and supply.",
    },
    {
        level: "ul",
        items: [
            "Suitable for restaurants, cafés, and food service outlets",
            "Bulk purchasing options for retailers and wholesalers",
            "Ideal for events, catering services, and large gatherings",
            "Unique beverage options that help businesses stand out",
        ],
    },
    {
        level: "p",
        body: "We aim to build long-term partnerships with businesses by providing reliable products and competitive pricing.",
    },
    {
        level: "h2",
        heading: "Special Offers and Deals",
    },
    {
        level: "p",
        body: "To make our products even more accessible, we regularly provide offers that deliver additional value to our customers:",
    },
    {
        level: "ul",
        items: [
            "Discounts on bulk and combo purchases",
            "Seasonal and festive promotions",
            "Special pricing for repeat customers",
            "Occasional free delivery offers",
        ],
    },
    {
        level: "p",
        body: "These deals are designed to ensure customers get the best experience at the best price.",
    },
    {
        level: "h2",
        heading: "Packaging and Sizes",
    },
    {
        level: "p",
        body: "Zinnie beverages are available in different packaging formats to suit various needs. Whether for personal consumption or large-scale use, we provide flexible options.",
    },
    {
        level: "ul",
        items: [
            "Multiple bottle sizes for convenience",
            "Secure packaging to maintain product quality",
            "Easy-to-carry designs for travel and outdoor use",
            "Suitable for both individual and group consumption",
        ],
    },
    {
        level: "p",
        body: "Our packaging ensures that every bottle reaches you in perfect condition.",
    },
    {
        level: "h2",
        heading: "Health-Conscious Refreshment Choice",
    },
    {
        level: "p",
        body: "Modern consumers are becoming more mindful of what they drink. While soft drinks are primarily enjoyed for refreshment, many customers today prefer beverages that feel lighter and more balanced.",
    },
    {
        level: "p",
        bold: true,
        body: "Zinnie aligns with this shift by offering drinks that:",
    },
    {
        level: "ul",
        items: [
            "Deliver bold flavor without being overly sweet",
            "Provide a refreshing and satisfying experience",
            "Complement Indian meals naturally",
            "Feel more balanced compared to traditional sodas",
        ],
    },
    {
        level: "p",
        body: "This makes Zinnie a preferred choice for those exploring better alternatives in soft drinks in India.",
    },
    {
        level: "h2",
        heading: "Compare Zinnie vs Regular Soft Drinks",
    },
    {
        level: "table",
        headers: ["Feature", "Zinnie", "Regular Soft Drinks"],
        rows: [
            ["Flavor Profile", "Indian-inspired, tangy & spiced", "Mostly sweet & cola-based"],
            ["Variety", "Unique desi flavors", "Limited standard options"],
            ["Experience", "Refreshing + flavorful", "Only fizzy refreshment"],
            ["Use Case", "Meals, daily use, occasions", "Mostly casual consumption"],
        ],
    },
    {
        level: "p",
        body: "This comparison helps users easily understand our **unique selling proposition (USP)**.",
    },
    {
        level: "h2",
        heading: "Our Commitment to Innovation",
    },
    {
        level: "p",
        body: "At Zinnie, we continuously work on improving and expanding our product range. By combining traditional Indian flavors with modern beverage techniques, we aim to stay ahead in the evolving soft drinks market.",
    },
    {
        level: "p",
        bold: true,
        body: "We focus on:",
    },
    {
        level: "ul",
        items: [
            "Researching new flavor combinations",
            "Enhancing product quality and consistency",
            "Adapting to changing customer preferences",
            "Maintaining a balance between tradition and innovation",
        ],
    },
    {
        level: "p",
        body: "This commitment allows us to offer beverages that remain relevant and exciting for modern consumers.",
    },
    {
        level: "h2",
        heading: "Best-Selling Products",
    },
    {
        level: "p",
        body: "Explore our most popular drinks loved by customers across India.",
    },
    {
        level: "ul",
        items: [
            { name: "Chilli Guava Drink", href: "https://zinniezeera.com/product/chilli-guava/", desc: " — Sweet, spicy, and bold" },
            { name: "Nimbu Zeera Drink", href: "https://zinniezeera.com/product/nimbu-zeera/", desc: " — Tangy and refreshing" },
            { name: "Ginger Lemon Drink", href: "https://zinniezeera.com/product/ginger-lemon/", desc: " — Zesty with a spicy twist" },
            { name: "Zeera Masala Soda", href: "https://zinniezeera.com/product/zeera-masala-soda/", desc: " — Classic desi refreshment" },
            { name: "Mango Drink", href: "https://zinniezeera.com/product/zinnie-mango/", desc: " — Smooth and fruity" },
        ],
    },
    {
        level: "p",
        body: "These products are consistently chosen for their taste, quality, and refreshing experience.",
    },
    {
        level: "h2",
        heading: "Refresh Your Day with the Best Cold Drinks in India",
    },
    {
        level: "p",
        body: "Upgrade your beverage experience with Zinnie and discover a refreshing new way to enjoy **cold drinks in India**. Our beverages are crafted to deliver the perfect balance of authentic Indian flavors, refreshing fizz, and bold taste that stands out from ordinary soft drinks.",
    },
    {
        level: "p",
        body: "Whether you are looking for a daily refreshment or something special to serve guests, Zinnie offers a unique alternative to regular sodas. With our signature **jeera-based drinks,** you can enjoy a flavorful experience that is both satisfying and memorable.",
    },
    {
        level: "h2",
        heading: "Order the Best Soft Drinks in India Today",
    },
    {
        level: "p",
        body: "Looking to buy soft drinks online with ease and convenience? Zinnie is your ideal destination. We make it simple for you to explore, choose, and order your favorite beverages from the comfort of your home.",
    },
    {
        level: "p",
        body: "Enjoy affordable soft drinks that don't compromise on quality or taste. Our beverages are crafted to deliver consistent freshness along with a unique desi flavor that sets them apart from regular carbonated drinks.",
    },
    {
        level: "p",
        body: "Experience something different from ordinary sodas—try Zinnie's premium jeera-based beverages today and enjoy a refreshing twist of tradition and taste.",
    },
    {
        level: "p",
        body: "If you are searching for the best cold drinks in India, Zinnie brings you the perfect combination of taste, quality, and affordability—all in one bottle.",
    },
    {
        level: "p",
        bold: true,
        body: "Order now and enjoy fast delivery, great value, and the true taste of one of the best soft drinks in India.",
    },
];

const faqs = [
    {
        q: "What makes Zinnie cold drinks different from regular soft drinks?",
        a: "Zinnie cold drinks are inspired by traditional Indian flavors like jeera, lemon, and spices, combined with modern carbonation to create a unique and refreshing taste.",
    },
    {
        q: "Where can I buy Zinnie soft drinks online?",
        a: "You can easily buy soft drinks online directly from our official website with a simple and secure checkout process.",
    },
    {
        q: "Are Zinnie soft drinks available across India?",
        a: "Yes, we deliver our cold drinks across multiple locations in India with fast and reliable shipping.",
    },
    {
        q: "Are your soft drinks affordable?",
        a: "Yes, Zinnie offers affordable soft drinks without compromising on quality, taste, or freshness.",
    },
    {
        q: "Which are the best cold drinks in India offered by Zinnie?",
        a: "Our popular options include Zeera Masala Soda, Nimbu Zeera Drink, Ginger Lemon Drink, Chilli Guava Drink, and Mango Drink.",
    },
    {
        q: "Are Zinnie drinks suitable for daily consumption?",
        a: "Yes, our beverages are designed for regular refreshment and can be enjoyed daily.",
    },
    {
        q: "What is Zeera Masala Soda?",
        a: "Zeera Masala Soda is a refreshing cold drink made with cumin (jeera), lemon, and traditional Indian spices, offering a bold and tangy flavor.",
    },
    {
        q: "Do your drinks contain artificial preservatives?",
        a: "We focus on quality ingredients and maintain strict production standards to ensure safe and enjoyable beverages.",
    },
    {
        q: "Are Zinnie drinks good for parties and events?",
        a: "Absolutely, our soft drinks are perfect for parties, gatherings, celebrations, and special occasions.",
    },
    {
        q: "Can I order soft drinks in bulk for business use?",
        a: "Yes, you can order in bulk for retail stores, restaurants, cafés, and events.",
    },
    {
        q: "Do you offer distributor opportunities?",
        a: "Yes, we provide opportunities for distributors. You can apply through our \"Become a Distributor\" page.",
    },
    {
        q: "How long does delivery take?",
        a: "Delivery time depends on your location, but we aim to provide fast and reliable shipping across India.",
    },
    {
        q: "Are your cold drinks suitable for restaurants and cafés?",
        a: "Yes, our beverages are ideal for restaurants, cafés, and food service businesses looking to offer unique drinks.",
    },
    {
        q: "What flavors are available in Zinnie soft drinks?",
        a: "We offer a variety of flavors including jeera-based drinks, lemon drinks, mango drinks, ginger lemon, and more.",
    },
    {
        q: "Why are flavored cold drinks becoming popular in India?",
        a: "Consumers prefer unique and traditional flavors that provide better taste and a refreshing experience compared to regular sodas.",
    },
    {
        q: "Are your drinks safe and hygienically produced?",
        a: "Yes, we follow strict quality control and hygienic production processes to ensure safety and freshness.",
    },
    {
        q: "Can I enjoy Zinnie drinks with meals?",
        a: "Yes, our drinks complement Indian meals perfectly and enhance the overall dining experience.",
    },
    {
        q: "What payment options are available for online orders?",
        a: "We offer secure payment options including online payment gateways for a smooth checkout experience.",
    },
    {
        q: "Are Zinnie drinks better than regular colas?",
        a: "Zinnie drinks offer a unique desi flavor and refreshing experience, making them a great alternative to regular colas.",
    },
    {
        q: "Why should I choose Zinnie for soft drinks in India?",
        a: "Zinnie combines quality, affordability, authentic Indian flavors, and convenience, making it one of the best choices for cold drinks in India.",
    },
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

// ── Dynamic Tag Renderer ───────────────────────────────────────────────────────

function ContentCard({ item, index }) {
    const isHeading = ["h1", "h2", "h3"].includes(item.level);
    const Tag = isHeading ? item.level : "div";

    return (
        <div
            className={`content-card content-card--${item.level}`}
            style={{ animationDelay: `${index * 40}ms` }}
        >
            {isHeading && item.heading ? (
                <h2 className={`card-heading card-heading--${item.level}`}>
                    {item.heading}
                </h2>
            ) : null}

            {item.level === "p" && item.body ? (
                <p className="card-text">
                    {item.bold ? <strong>{item.body}</strong> : renderRichText(item.body)}
                </p>
            ) : null}

            {item.level === "ul" && Array.isArray(item.items) ? (
                <ul className="card-list">
                    {item.items.map((li, i) =>
                        typeof li === "string" ? (
                            <li key={i} className="card-list-item">{renderRichText(li)}</li>
                        ) : (
                            <li key={i} className="card-list-item">
                                <a href={li.href} className="card-list-link">
                                    <strong>{li.name}</strong>
                                </a>
                                {li.desc}
                            </li>
                        )
                    )}
                </ul>
            ) : null}

            {item.level === "table" && Array.isArray(item.rows) ? (
                <div className="card-table-wrap">
                    <table className="card-table">
                        <thead>
                            <tr>
                                {item.headers.map((h, i) => (
                                    <th key={i}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {item.rows.map((row, r) => (
                                <tr key={r}>
                                    {row.map((cell, c) => (
                                        <td key={c}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
            <div className="accordion-root">

                {/* ── Section 1: Main Content ── */}
                <div className={`panel ${openSection === "content" ? "is-open" : ""}`}>
                    <button
                        className="panel-header"
                        onClick={() => toggle("content")}
                        aria-expanded={openSection === "content"}
                    >
                        <h2 className="panel-title">Zinnie – About Our Soft Drinks</h2>
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
                        <h2 className="panel-title">Frequently Asked Questions</h2>
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