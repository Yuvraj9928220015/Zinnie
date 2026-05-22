import Home from './components/Home/Banner';

export default function Page() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zinnie Zeera",
    "url": "https://zinniezeera.com/",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "9167"
    }
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