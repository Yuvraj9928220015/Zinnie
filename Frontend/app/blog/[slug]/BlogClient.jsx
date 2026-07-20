"use client";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "../blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function getSlugFromURL() {
  if (typeof window === "undefined") return null;
  const parts = window.location.pathname.split("/").filter(Boolean);
  const blogIndex = parts.indexOf("blog");
  if (blogIndex !== -1 && parts[blogIndex + 1]) {
    return decodeURIComponent(parts[blogIndex + 1]);
  }
  return null;
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
    if (blog && !initialBlog) {
      document.title = blog.pageTitle || blog.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", blog.metaDescription || "");
    }
  }, [blog, initialBlog]);

  if (loading) {
    return <div style={{ padding: "60px", textAlign: "center" }}>Loading Blog...</div>;
  }

  if (failed || !blog) {
    return notFound();
  }

  const imgSrc =
    blog.image && blog.image.trim() !== ""
      ? blog.image.startsWith("http")
        ? blog.image
        : `${API_URL}${blog.image}`
      : null;

  return (
    <div className="blog-detail-wrapper">
      <div className="blog-detail-header">
        <h1>{blog.title}</h1>
        <div className="blog-detail-meta">
          <span>{blog.author}</span> ·{" "}
          <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
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