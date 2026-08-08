import Home from "./components/Home/Banner";

const PAGE_URL = "https://zinniezeera.com/";
const OG_IMAGE = "/ZinnieWebsiteImage.jpeg";
const TITLE = "Buy Affordable Soft Drinks & Cold Drinks in India Online";
const DESCRIPTION =
  "Searching for soft drinks in India? Zinnie offers affordable, refreshing cold drinks you'll love. Shop the best cool drinks online today!";

export const metadata = {
  title: {
    default: TITLE,
  },

  description: DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

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
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Affordable Soft Drinks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@zinnie",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Affordable Soft Drinks",
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

// ---- JSON-LD Schema ----
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://zinniezeera.com/#webpage",
      url: "https://zinniezeera.com/",
      name: "Zinnie Soft Drinks – Refreshing & Affordable Cool Drinks in India",
      isPartOf: { "@id": "https://zinniezeera.com/#website" },
      about: { "@id": "https://zinniezeera.com/#organization" },
      description:
        "Discover Zinnie soft drinks – refreshing, affordable, and full of flavor. From Zeera Masala Soda to Mango, Lemon, and more, perfect for every occasion.",
    },
    {
      "@type": "Organization",
      "@id": "https://zinniezeera.com/#organization",
      name: "Zinnie",
      url: "https://zinniezeera.com/",
      logo: "https://zinniezeera.com/Zinnie-logo.png",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "1200",
        reviewCount: "850",
      },
    },
    {
      "@type": "VideoObject",
      "@id": "https://zinniezeera.com/#video-1",
      name: "Zinnie Soft Drinks – Refreshing Beverage Experience",
      description:
        "Experience refreshing Zinnie soft drinks with bold flavors crafted for every moment.",
      thumbnailUrl: "https://zinniezeera.com/1.png",
      uploadDate: "2026-03-01",
      duration: "PT5S",
      contentUrl: "https://zinniezeera.com/Zinnie-banner-2.mp4",
      embedUrl: "https://zinniezeera.com/",
      inLanguage: "en-IN",
      isFamilyFriendly: true,
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: 100,
      },
      publisher: { "@id": "https://zinniezeera.com/#organization" },
      mainEntityOfPage: { "@id": "https://zinniezeera.com/#webpage" },
    },
    {
      "@type": "VideoObject",
      "@id": "https://zinniezeera.com/#video-2",
      name: "Zinnie Cool Drinks – Perfect for Every Occasion",
      description:
        "Enjoy Zinnie cool drinks like Zeera, Mango, and Lemon, perfect for every occasion.",
      thumbnailUrl: "https://zinniezeera.com/4.png",
      uploadDate: "2026-03-01",
      duration: "PT3S",
      contentUrl: "https://zinniezeera.com/Zinnie-banner-Desktop-3.mp4",
      embedUrl: "https://zinniezeera.com/",
      inLanguage: "en-IN",
      isFamilyFriendly: true,
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: 100,
      },
      publisher: { "@id": "https://zinniezeera.com/#organization" },
      mainEntityOfPage: { "@id": "https://zinniezeera.com/#webpage" },
    },
    {
      "@type": "VideoObject",
      "@id": "https://zinniezeera.com/#video-3",
      name: "Zinnie Drinks Collection – Flavorful & Affordable",
      description:
        "Explore Zinnie drinks collection with affordable and refreshing flavors across India.",
      thumbnailUrl: "https://zinniezeera.com/4.png",
      uploadDate: "2026-03-01",
      duration: "PT10S",
      contentUrl: "https://zinniezeera.com/Zinnie-banner-Desktop-1.mp4",
      embedUrl: "https://zinniezeera.com/",
      inLanguage: "en-IN",
      isFamilyFriendly: true,
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: 100,
      },
      publisher: { "@id": "https://zinniezeera.com/#organization" },
      mainEntityOfPage: { "@id": "https://zinniezeera.com/#webpage" },
    },
    {
      "@type": "VideoObject",
      "@id": "https://zinniezeera.com/#video-4",
      name: "Zinnie Refreshing Soft Drinks – Taste the Difference",
      description:
        "Taste the difference with Zinnie refreshing soft drinks made for every mood and season.",
      thumbnailUrl: "https://zinniezeera.com/5.png",
      uploadDate: "2026-03-01",
      duration: "PT12S",
      contentUrl: "https://zinniezeera.com/Zinnie-banner-Desktop-2.mp4",
      embedUrl: "https://zinniezeera.com/",
      inLanguage: "en-IN",
      isFamilyFriendly: true,
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: 100,
      },
      publisher: { "@id": "https://zinniezeera.com/#organization" },
      mainEntityOfPage: { "@id": "https://zinniezeera.com/#webpage" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://zinniezeera.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://zinniezeera.com/",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://zinniezeera.com/#products",
      name: "Zinnie Soft Drinks Collection",
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
      "@type": "FAQPage",
      "@id": "https://zinniezeera.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes Zinnie cold drinks different from regular soft drinks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zinnie cold drinks are inspired by traditional Indian flavors like jeera, lemon, and spices, combined with modern carbonation to create a unique and refreshing taste.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I buy Zinnie soft drinks online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can easily buy soft drinks online directly from our official website with a simple and secure checkout process.",
          },
        },
        {
          "@type": "Question",
          name: "Are Zinnie soft drinks available across India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we deliver our cold drinks across multiple locations in India with fast and reliable shipping.",
          },
        },
        {
          "@type": "Question",
          name: "Are your soft drinks affordable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Zinnie offers affordable soft drinks without compromising on quality, taste, or freshness.",
          },
        },
        {
          "@type": "Question",
          name: "Which are the best cold drinks in India offered by Zinnie?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our popular options include Zeera Masala Soda, Nimbu Zeera Drink, Ginger Lemon Drink, Chilli Guava Drink, and Mango Drink.",
          },
        },
        {
          "@type": "Question",
          name: "Are Zinnie drinks suitable for daily consumption?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our beverages are designed for regular refreshment and can be enjoyed daily.",
          },
        },
        {
          "@type": "Question",
          name: "What is Zeera Masala Soda?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zeera Masala Soda is a refreshing cold drink made with cumin (jeera), lemon, and traditional Indian spices, offering a bold and tangy flavor.",
          },
        },
        {
          "@type": "Question",
          name: "Do your drinks contain artificial preservatives?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We focus on quality ingredients and maintain strict production standards to ensure safe and enjoyable beverages.",
          },
        },
        {
          "@type": "Question",
          name: "Are Zinnie drinks good for parties and events?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely, our soft drinks are perfect for parties, gatherings, celebrations, and special occasions.",
          },
        },
        {
          "@type": "Question",
          name: "Can I order soft drinks in bulk for business use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can order in bulk for retail stores, restaurants, cafés, and events.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer distributor opportunities?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we provide opportunities for distributors. You can apply through our Become a Distributor page.",
          },
        },
        {
          "@type": "Question",
          name: "How long does delivery take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Delivery time depends on your location, but we aim to provide fast and reliable shipping across India.",
          },
        },
        {
          "@type": "Question",
          name: "Are your cold drinks suitable for restaurants and cafés?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our beverages are ideal for restaurants, cafés, and food service businesses looking to offer unique drinks.",
          },
        },
        {
          "@type": "Question",
          name: "What flavors are available in Zinnie soft drinks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer a variety of flavors including jeera-based drinks, lemon drinks, mango drinks, ginger lemon, and more.",
          },
        },
        {
          "@type": "Question",
          name: "Why are flavored cold drinks becoming popular in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Consumers prefer unique and traditional flavors that provide better taste and a refreshing experience compared to regular sodas.",
          },
        },
        {
          "@type": "Question",
          name: "Are your drinks safe and hygienically produced?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we follow strict quality control and hygienic production processes to ensure safety and freshness.",
          },
        },
        {
          "@type": "Question",
          name: "Can I enjoy Zinnie drinks with meals?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our drinks complement Indian meals perfectly and enhance the overall dining experience.",
          },
        },
        {
          "@type": "Question",
          name: "What payment options are available for online orders?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer secure payment options including online payment gateways for a smooth checkout experience.",
          },
        },
        {
          "@type": "Question",
          name: "Are Zinnie drinks better than regular colas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zinnie drinks offer a unique desi flavor and refreshing experience, making them a great alternative to regular colas.",
          },
        },
        {
          "@type": "Question",
          name: "Why should I choose Zinnie for soft drinks in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zinnie combines quality, affordability, authentic Indian flavors, and convenience, making it one of the best choices for cold drinks in India.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Home />
    </>
  );
}