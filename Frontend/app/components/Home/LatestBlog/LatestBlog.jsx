"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./LatestBlog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.zinniezeera.com";
const BLOGS_TO_SHOW = 3;

function stripMarkdown(md = "") {
  return md
    .replace(/[#*_`>~-]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
}

export default function LatestBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;

        const list = Array.isArray(data) ? data : [];

        // Sabse naye blog pehle (createdAt descending) aur sirf top 3
        const latest = [...list]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, BLOGS_TO_SHOW);

        setBlogs(latest);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Latest blog fetch error:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="latest-blog-wrapper">
        <h2 className="latest-blog-heading">Latest Blogs</h2>
        <p className="latest-blog-loading">Loading...</p>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="latest-blog-wrapper">
      <h2 className="latest-blog-heading">Latest Blogs</h2>

      <div className="latest-blog-grid">
        {blogs.map((blog) => {
          const identifier = blog.urlHandle || blog.slug;
          const imgSrc = blog.image
            ? blog.image.startsWith("http")
              ? blog.image
              : `${API_URL}${blog.image}`
            : "/placeholder-blog.jpg";
          const excerpt = stripMarkdown(blog.content).slice(0, 140);

          return (
            <Link
              href={`/blog/${identifier}`}
              key={blog._id}
              className="latest-blog-card"
            >
              <div className="latest-blog-card-image">
                <img src={imgSrc} alt={blog.altTag || blog.title} />
              </div>
              <div className="latest-blog-card-body">
                <div className="latest-blog-card-meta">
                  <span>{blog.author}</span>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3>{blog.title}</h3>
                <p>{excerpt}...</p>
                <span className="latest-blog-read-more">Read More →</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="latest-blog-view-all">
        <Link href="/blog">View All Blogs →</Link>
      </div>
    </section>
  );
}