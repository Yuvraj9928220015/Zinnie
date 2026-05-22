import BlogClient from "./BlogClient";
import { blogs } from "../data";

//Add karo
export const dynamicParams = false;

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Zinnie",
      description: "This blog post does not exist.",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [{ url: blog.image, alt: blog.altTag || blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BlogClient slug={slug} />;
}