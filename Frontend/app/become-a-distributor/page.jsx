import DistributorClient from './Distributorclient';

const PAGE_URL = "https://zinniezeera.com/become-a-distributor/";
const OG_IMAGE = "https://zinniezeera.com/ZinnieWebsiteImage.jpeg";
const TITLE = "Become a Beverage Distributor in India | Zinnie Soft Drinks";
const DESCRIPTION =
  "Join Zinnie as a beverage distributor in India. Partner with a leading soft drink supplier and grow your business with jeera soda, nimbu zeera, masala soda, and flavored drinks.";

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
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Become a Zinnie Beverage Distributor in India",
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
        alt: "Become a Zinnie Beverage Distributor in India",
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

// Full Combined Schema: WebPage + ContactPage + BreadcrumbList + Organization
const fullSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://zinniezeera.com/become-a-distributor/#webpage",
      url: "https://zinniezeera.com/become-a-distributor/",
      name: "Become a Distributor | Zinnie Zeera",
      description:
        "Partner with Zinnie Zeera and become a distributor. Join our growing beverage network and expand your business with high-demand products.",
      inLanguage: "en",
    },
    {
      "@type": "ContactPage",
      "@id": "https://zinniezeera.com/become-a-distributor/#contactpage",
      url: "https://zinniezeera.com/become-a-distributor/",
      name: "Distributor Inquiry - Zinnie Zeera",
      description:
        "Contact Zinnie Zeera for distributorship, bulk orders, and business partnerships.",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://zinniezeera.com/become-a-distributor/#breadcrumb",
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
          name: "Become a Distributor",
          item: "https://zinniezeera.com/become-a-distributor/",
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://zinniezeera.com/#organization",
      name: "Zinnie Zeera",
      url: "https://zinniezeera.com/",
      logo: "https://zinniezeera.com/Zinnie-logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8432221711",
        contactType: "customer support",
        email: "info@balajibeverages.com",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    },
  ],
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://zinniezeera.com/become-a-distributor/#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Zinnie beverage distributor program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a business opportunity where partners can distribute Zinnie's ready-to-drink beverages across their assigned region.",
      },
    },
    {
      "@type": "Question",
      name: "How can I become a beverage distributor in India with Zinnie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can apply through the inquiry form, after which the team reviews your application and proceeds with onboarding.",
      },
    },
    {
      "@type": "Question",
      name: "Is prior experience required to become a distributor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, both experienced FMCG distributors and new entrepreneurs can apply.",
      },
    },
    {
      "@type": "Question",
      name: "What products will I be distributing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You will handle products like jeera soda, masala soda, nimbu jeera, mango drink, and other flavored beverages.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum investment required?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Investment depends on territory size and initial stock requirements. Details are shared after inquiry evaluation.",
      },
    },
    {
      "@type": "Question",
      name: "Do I get an exclusive territory?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, distributors are assigned specific territories to avoid overlap and ensure focused growth.",
      },
    },
    {
      "@type": "Question",
      name: "What margins can I expect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie offers attractive and competitive margins designed for long-term business growth.",
      },
    },
    {
      "@type": "Question",
      name: "Which regions are available for distribution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Availability depends on current market coverage and is discussed during onboarding.",
      },
    },
    {
      "@type": "Question",
      name: "Is this suitable for small business owners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, retail owners and small wholesalers can also become distributors.",
      },
    },
    {
      "@type": "Question",
      name: "What support does Zinnie provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Support includes product guidance, supply coordination, marketing assistance, and business onboarding.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can I start after applying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After approval, onboarding and supply can begin within a short time depending on location.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Zinnie different from other beverage brands?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zinnie focuses on traditional Indian-inspired flavors combined with modern packaging and consistency.",
      },
    },
    {
      "@type": "Question",
      name: "Are the products fast-moving in the market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, categories like jeera soda and fruit drinks have strong and growing demand.",
      },
    },
    {
      "@type": "Question",
      name: "Can I distribute multiple Zinnie products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, distributors can handle the full product range.",
      },
    },
    {
      "@type": "Question",
      name: "Is storage space required?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, basic storage space is needed for inventory management.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need my own delivery system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use your own logistics or arrange local delivery partners.",
      },
    },
    {
      "@type": "Question",
      name: "Are these products suitable for all age groups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Zinnie beverages are designed for wide consumer acceptance.",
      },
    },
    {
      "@type": "Question",
      name: "Can I expand my business later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, distributors can scale into larger territories or super stockist roles.",
      },
    },
    {
      "@type": "Question",
      name: "How is product supply managed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Supply is coordinated regularly based on demand and distributor requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How do I apply for Zinnie distribution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can apply directly through the official distributor inquiry page and the team will guide you through the process.",
      },
    },
  ],
};

export default function Distributor() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DistributorClient />
    </>
  );
}