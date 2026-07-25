"use client";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "../blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.zinniezeera.com";

function getSlugFromURL() {
  if (typeof window === "undefined") return null;
  const parts = window.location.pathname.split("/").filter(Boolean);
  const blogIndex = parts.indexOf("blog");
  if (blogIndex !== -1 && parts[blogIndex + 1]) {
    return decodeURIComponent(parts[blogIndex + 1]);
  }
  return null;
}

function getAbsoluteImageUrl(imagePath) {
  if (!imagePath || imagePath.trim() === "") return null;
  return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
}

function extractJsonLd(rawScript) {
  if (!rawScript || typeof rawScript !== "string") return null;
  let jsonString = rawScript.trim();
  const match = jsonString.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  if (match && match[1]) jsonString = match[1].trim();
  if (!jsonString) return null;
  try {
    JSON.parse(jsonString);
    return jsonString;
  } catch {
    return null;
  }
}

export default function BlogClient({ initialBlog }) {
  const [blog, setBlog] = useState(initialBlog || null);
  const [loading, setLoading] = useState(!initialBlog);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (initialBlog) return;

    const realSlug = getSlugFromURL();

    if (!realSlug || realSlug === "placeholder") {
      setLoading(false);
      setFailed(true);
      return;
    }

    fetch(`${API_URL}/api/blogs/${realSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then((data) => {
        if (!data || data.message === "Blog not found") {
          setFailed(true);
          setLoading(false);
          return;
        }
        setBlog(data);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
        setLoading(false);
      });
  }, [initialBlog]);

  useEffect(() => {
    if (!blog || initialBlog) return;

    document.title = blog.pageTitle || blog.title;

    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        const [, attrName, attrValue] = selector.match(/\[(\w+)="([^"]+)"\]/) || [];
        if (attrName && attrValue) tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute(attr, value);
    };

    const description = blog.metaDescription || "";
    const absoluteImage = getAbsoluteImageUrl(blog.image);

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", blog.pageTitle || blog.title);
    setMeta('meta[property="og:description"]', "content", description);
    if (absoluteImage) setMeta('meta[property="og:image"]', "content", absoluteImage);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", blog.pageTitle || blog.title);
    setMeta('meta[name="twitter:description"]', "content", description);
    if (absoluteImage) setMeta('meta[name="twitter:image"]', "content", absoluteImage);

    const jsonLd = extractJsonLd(blog.script);
    if (jsonLd && !document.getElementById("blog-jsonld")) {
      const scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.id = "blog-jsonld";
      scriptTag.textContent = jsonLd;
      document.head.appendChild(scriptTag);
    }
  }, [blog, initialBlog]);

  if (loading) {
    return <div style={{ padding: "60px", textAlign: "center" }}>Loading Blog...</div>;
  }

  if (failed || !blog) {
    return notFound();
  }

  const imgSrc = getAbsoluteImageUrl(blog.image);

  return (
    <div className="blog-detail-wrapper">
      <div className="blog-detail-header">
        <h1>{blog.title}</h1>
        <div className="blog-detail-meta">
          <span>{blog.author}</span> ·{" "}
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      {imgSrc && (
        <div className="blog-detail-cover">
          <img src={imgSrc} alt={blog.altTag || blog.title} />
        </div>
      )}
      <div className="blog-detail-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            img: ({ node, ...props }) => {
              if (!props.src || props.src.trim() === "") return null;
              return <img {...props} style={{ maxWidth: "100%", borderRadius: "8px" }} />;
            },
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}