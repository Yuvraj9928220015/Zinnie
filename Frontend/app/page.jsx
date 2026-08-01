import Home from "./components/Home/Banner";

const PAGE_URL = "https://zinniezeera.com/";

export const metadata = {
  metadataBase: new URL("https://zinniezeera.com"),
  title: "Buy Affordable Soft Drinks & Cold Drinks in India Online",
  description:
    "Searching for soft drinks in India? Zinnie offers affordable, refreshing cold drinks you'll love.",
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function Page() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zinnie Zeera",
    url: PAGE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "9167",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      <Home />
    </>
  );
}