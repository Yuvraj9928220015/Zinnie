"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function stripMarkdown(md = "") {
  return md.replace(/[#*_`>~-]/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1").replace(/\n+/g, " ").trim();
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => { setBlogs(Array.isArray(data) ? data : []); setLoading(false); })
      .catch((err) => { console.error("Blog fetch error:", err); setLoading(false); });
  }, []);

  return (
    <div className="blog-page-wrapper">
      <div className="blog-hero"><h1>Zinnie Blog – Trends, Tips & Insights</h1></div>

      {loading ? (
        <p className="blog-loading">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="blog-loading">No blogs published yet.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => {
            const identifier = blog.urlHandle || blog.slug;
            const imgSrc = blog.image
              ? blog.image.startsWith("http") ? blog.image : `${API_URL}${blog.image}`
              : "/placeholder-blog.jpg";
            const excerpt = stripMarkdown(blog.content).slice(0, 140);

            return (
              <Link href={`/blog/${identifier}`} key={blog._id} className="blog-card">
                <div className="blog-card-image"><img src={imgSrc} alt={blog.altTag || blog.title} /></div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>{blog.author}</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{excerpt}...</p>
                  <span className="blog-read-more">Read More →</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}