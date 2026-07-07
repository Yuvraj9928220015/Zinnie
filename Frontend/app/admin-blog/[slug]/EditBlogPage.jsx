"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../admin-blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MDXEditorComponent = dynamic(
  () => import("../../components/Toolbar/MDXEditorComponent"),
  { ssr: false }
);

function toUrlHandle(str) {
  return str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 80);
}

export default function EditBlogPage({ slug }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [altTag, setAltTag] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [editorKey, setEditorKey] = useState(0);
  const [seoOpen, setSeoOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [urlHandle, setUrlHandle] = useState("");
  const [script, setScript] = useState("");

  useEffect(() => {
    if (!slug || slug === "placeholder") { setLoading(false); return; }
    fetch(`${API_URL}/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data || data.message === "Blog not found") {
          alert("Blog nahi mila!");
          router.push("/admin-blog");
          return;
        }
        setTitle(data.title || "");
        setAuthor(data.author || "");
        setContent(data.content || "");
        setExistingImage(data.image || "");
        setAltTag(data.altTag || data.title || "");
        setPageTitle(data.pageTitle || data.title || "");
        setMetaDescription(data.metaDescription || "");
        setUrlHandle(data.urlHandle || slug);
        setScript(data.script || "");
        setEditorKey((k) => k + 1);
        setLoading(false);
      })
      .catch(() => { alert("Fetch error!"); setLoading(false); });
  }, [slug, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !content) { alert("Title and Content required!"); return; }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("author", author);
    fd.append("content", content);
    fd.append("altTag", altTag);
    fd.append("pageTitle", pageTitle);
    fd.append("metaDescription", metaDescription);
    fd.append("urlHandle", urlHandle);
    fd.append("script", script);
    if (image) fd.append("image", image);

    try {
      const res = await fetch(`${API_URL}/api/blogs/${slug}`, { method: "PUT", body: fd });
      const data = await res.json();
      if (data.success) { alert("Blog Updated!"); router.push("/admin-blog"); }
      else alert("Update failed: " + data.message);
    } catch { alert("Server error!"); }
  };

  if (!slug || slug === "placeholder") {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Invalid page.</p>
        <button onClick={() => router.push("/admin-blog")}>← Back</button>
      </div>
    );
  }

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

  return (
    <div className="admin-page-wrapper">
      <div className="admin-card">
        <div className="admin-header">
          <h2>✏️ Edit Blog Article</h2>
          <button onClick={() => router.push("/admin-blog")} className="admin-back-btn">← Back</button>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="admin-input-group">
            <label>Blog Title</label>
            <input className="admin-input-field" type="text" value={title}
              onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="admin-input-group">
            <label>URL Handle (Slug)</label>
            <div style={{ display: "flex" }}>
              <span style={{ padding: "10px 12px", background: "#1a1a1a", border: "1px solid #333", borderRight: "none", borderRadius: "6px 0 0 6px", color: "#666" }}>blog/</span>
              <input className="admin-input-field" type="text" value={urlHandle}
                onChange={(e) => setUrlHandle(toUrlHandle(e.target.value))}
                style={{ borderRadius: "0 6px 6px 0", marginBottom: 0 }} />
            </div>
          </div>

          <div className="admin-input-group">
            <label>Author</label>
            <input className="admin-input-field" type="text" value={author}
              onChange={(e) => setAuthor(e.target.value)} />
          </div>

          <div className="admin-input-group">
            <label>Cover Image</label>
            {existingImage && (
              <div style={{ marginBottom: "10px" }}>
                <Image src={existingImage.startsWith("http") ? existingImage : `${API_URL}${existingImage}`}
                  alt="Cover" width={150} height={100} style={{ borderRadius: "6px", objectFit: "cover" }} unoptimized />
              </div>
            )}
            <input className="admin-input-field" type="file" accept="image/*"
              onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <div className="admin-input-group">
            <label>Image Alt Tag</label>
            <input className="admin-input-field" type="text" value={altTag}
              onChange={(e) => setAltTag(e.target.value)} />
          </div>

          <div className="admin-input-group">
            <label>Article Content</label>
            <div className="admin-editor-box">
              <MDXEditorComponent key={editorKey} initialContent={content} onChange={setContent} />
            </div>
          </div>

          {/* SEO SECTION — ye naya add kiya hai */}
          <div className="admin-seo-section">
            <button
              type="button"
              className="admin-seo-toggle"
              onClick={() => setSeoOpen(!seoOpen)}
            >
              <div className="admin-seo-toggle-left">
                <span className="admin-seo-title">Search engine listing</span>
                <span className="admin-seo-subtitle">Meta title, description aur script edit karo</span>
              </div>
              <span className="admin-seo-arrow">{seoOpen ? "▲" : "▼"}</span>
            </button>

            {seoOpen && (
              <div className="admin-seo-content">
                <div className="admin-seo-group">
                  <label>Meta Title</label>
                  <input className="admin-seo-input" type="text"
                    value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
                </div>
                <div className="admin-seo-group">
                  <label>Meta Description</label>
                  <textarea className="admin-seo-textarea"
                    value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                </div>
                <div className="admin-seo-group">
                  <label>Script (JSON-LD / Custom)</label>
                  <textarea className="admin-seo-textarea"
                    value={script} onChange={(e) => setScript(e.target.value)} />
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="admin-submit-btn">Update Blog</button>
        </form>
      </div>
    </div>
  );
}