import About from "./About";

export const metadata = {
    title: "About Zinnie | Our Story, Vision & Brand Journey",
    description:
        "Discover the story behind Zinnie, our vision, values, and commitment to quality. Learn how we bring style, comfort, and innovation together for modern lifestyles.",

    alternates: {
        canonical: "https://zinniezeera.com/about/",
    },

    openGraph: {
        title: "About Zinnie | Our Story, Vision & Brand Journey",
        description:
            "Discover the story behind Zinnie, our vision, values, and commitment to quality. Learn how we bring style, comfort, and innovation together for modern lifestyles.",
        url: "https://zinniezeera.com/about/",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function Page() {
    return <About />;
}