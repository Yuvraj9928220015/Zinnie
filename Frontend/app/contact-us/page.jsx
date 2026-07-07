import Contact from "./Contact";

export const metadata = {
  title: "Contact Zinnie | Get in Touch With Us Today",
  description:
    "Have questions or need support? Contact Zinnie for quick assistance. Reach out via email, phone, or our contact form—we’re here to help you.",

  alternates: {
    canonical: "https://zinniezeera.com/contact-us/",
  },

  openGraph: {
    title: "Contact Zinnie | Get in Touch With Us Today",
    description:
      "Have questions or need support? Contact Zinnie for quick assistance. Reach out via email, phone, or our contact form—we’re here to help you.",
    url: "https://zinniezeera.com/contact-us/",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <Contact />;
}