"use client";
import Link from "next/link"; // Link import karo
import { useEffect, useRef } from "react";
import { blogs } from "../data";
import "../blog.css";

export default function BlogClient({ slug }) {
  const contentRef = useRef(null);
  const selectedBlog = blogs.find((b) => b.slug === slug);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [selectedBlog]);

  if (!selectedBlog) {
    return (
      <div className="Blog">
        <div className="Blog-line"></div>
        <div className="BlogDetail-wrapper">
          {/* button → Link */}
          <Link href="/blog" className="back-btn">← Back to Blogs</Link>
          <h2>Blog not found.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="Blog">
      <div className="Blog-line"></div>
      <div className="BlogDetail-wrapper">
        {/* button → Link */}
        <Link href="/blog" className="back-btn">← Back to Blogs</Link>

        <div className="BlogDetail-hero">
          <img
            src={selectedBlog.image}
            alt={selectedBlog.altTag || selectedBlog.title}
          />
          <div className="BlogDetail-hero-overlay"></div>
        </div>

        <div className="BlogDetail-body">
          <div
            ref={contentRef}
            className="BlogDetail-content"
            dangerouslySetInnerHTML={{ __html: selectedBlog.contentHTML }}
          />
          {selectedBlog.hashtags && (
            <div className="BlogDetail-hashtags">
              {selectedBlog.hashtags.map((tag) => (
                <span key={tag} className="hashtag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}