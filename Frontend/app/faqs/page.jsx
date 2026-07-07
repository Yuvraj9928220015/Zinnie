import Faqs from "./Faqs";

export const metadata = {
  title: "Zinnie FAQs | Answers to Common Questions",
  description:
    "Find answers to frequently asked questions about orders, shipping, returns, and more at Zinnie. Get quick solutions to your queries.",

  alternates: {
    canonical: "https://zinniezeera.com/faqs/",
  },

  openGraph: {
    title: "Zinnie FAQs | Answers to Common Questions",
    description:
      "Find answers to frequently asked questions about orders, shipping, returns, and more at Zinnie. Get quick solutions to your queries.",
    url: "https://zinniezeera.com/faqs/",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <Faqs />;
}