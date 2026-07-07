"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "../blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BlogClient({ slug }) {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || slug === "placeholder") { setLoading(false); return; }
    fetch(`${API_URL}/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data || data.message === "Blog not found") { router.push("/blog"); return; }
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, router]);

  if (loading) return <div className="blog-detail-loading">Loading...</div>;
  if (!blog) return <div className="blog-detail-loading">Blog not found.</div>;

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