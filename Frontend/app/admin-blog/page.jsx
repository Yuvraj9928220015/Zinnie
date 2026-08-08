"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./admin-blog.css";

const HARDCODED_USERNAME = "admin";
const HARDCODED_PASSWORD = "123456";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.zinniezeera.com";

const MDXEditorComponent = dynamic(
  () => import("../components/Toolbar/MDXEditorComponent"),
  { ssr: false }
);

function toUrlHandle(str) {
  return str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 80);
}

export default function AdminPage() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [title, setTitle] = useState("");
  const [urlHandle, setUrlHandle] = useState("");
  const [urlHandleEdited, setUrlHandleEdited] = useState(false);
  const [author, setAuthor] = useState("ZINNIE");
  const [image, setImage] = useState(null);
  const [altTag, setAltTag] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [seoOpen, setSeoOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [script, setScript] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const savedUser = localStorage.getItem("adminUser");
    if (token) {
      setIsAuthenticated(true);
      if (savedUser) setUsername(savedUser);
      fetchBlogs(token);
    } else {
      setLoadingBlogs(false);
    }
  }, []);

  useEffect(() => {
    if (!urlHandleEdited) setUrlHandle(toUrlHandle(title));
  }, [title, urlHandleEdited]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
      const token = "admin-local-token";

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", username);

      setIsAuthenticated(true);
      fetchBlogs(token);
    } else {
      setLoginError("Invalid Username or Password!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const fetchBlogs = (token) => {
    const authToken = token || localStorage.getItem("adminToken");
    fetch(`${API_URL}/api/blogs`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoadingBlogs(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setLoadingBlogs(false);
      });
  };

  const handleUrlChange = (e) => {
    setUrlHandle(toUrlHandle(e.target.value));
    setUrlHandleEdited(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert("Please fill all fields before publishing!");
      return;
    }
    const finalHandle = urlHandle || toUrlHandle(title);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("altTag", altTag || title);
    formData.append("pageTitle", pageTitle || title);
    formData.append("metaDescription", metaDescription);
    formData.append("urlHandle", finalHandle);
    formData.append("script", script);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert("Blog Published Successfully! 🎉");
        setTitle("");
        setUrlHandle("");
        setUrlHandleEdited(false);
        setContent("");
        setImage(null);
        setAltTag("");
        setPageTitle("");
        setMetaDescription("");
        setScript("");
        setSeoOpen(false);
        fetchBlogs();
      } else {
        alert("Failed to publish: " + data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Server error, make sure Node backend is running!");
    }
  };

  const handleDelete = async (identifier) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/blogs/${identifier}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        alert("Blog deleted!");
        fetchBlogs();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // 🔒 LOGIN FORM SCREEN
  if (!isAuthenticated) {
    return (
      <div className="admin-page-wrapper admin-login-wrapper">
        <div className="admin-card admin-login-card">
          <div className="admin-header">
            <h2>Admin Login</h2>
          </div>
          <form onSubmit={handleLogin}>
            {loginError && <div className="admin-error-msg">{loginError}</div>}
            <div className="admin-input-group">
              <label>Username</label>
              <input
                className="admin-input-field"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="admin-input-group">
              <label>Password</label>
              <input
                className="admin-input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="admin-submit-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 🔓 ADMIN DASHBOARD
  return (
    <div className="admin-page-wrapper">
      <div className="admin-top-bar">
        <span>Logged in as <strong>{username || "Admin"}</strong></span>
        <button onClick={handleLogout} className="admin-logout-btn">
          Logout 🚪
        </button>
      </div>

      <div className="admin-layout">
        <div className="admin-card">
          <div className="admin-header">
            <h2>New Blog Article</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <label>Blog Title</label>
              <input
                className="admin-input-field"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="admin-input-group">
              <label>URL Handle</label>
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    padding: "10px 12px",
                    background: "#1a1a1a",
                    border: "1px solid #333",
                    borderRight: "none",
                    borderRadius: "6px 0 0 6px",
                    color: "#666",
                    fontSize: "0.875rem",
                  }}
                >
                  blog/
                </span>
                <input
                  className="admin-input-field"
                  type="text"
                  value={urlHandle}
                  onChange={handleUrlChange}
                  style={{ borderRadius: "0 6px 6px 0", marginBottom: 0 }}
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Author</label>
              <input
                className="admin-input-field"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="admin-input-group">
              <label>Cover Image</label>
              <input
                className="admin-input-field"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Image Alt Tag</label>
              <input
                className="admin-input-field"
                type="text"
                value={altTag}
                onChange={(e) => setAltTag(e.target.value)}
              />
            </div>

            <div className="admin-input-group">
              <label>Article Content</label>
              <div className="admin-editor-box">
                <MDXEditorComponent onChange={setContent} />
              </div>
            </div>

            {/* SEO DROPDOWN SECTION */}
            <div className="admin-seo-section">
              <button
                type="button"
                className="admin-seo-toggle"
                onClick={() => setSeoOpen(!seoOpen)}
              >
                <div className="admin-seo-toggle-left">
                  <span className="admin-seo-title">Search engine listing</span>
                  <span className="admin-seo-subtitle">
                    Meta title, description aur script add karo
                  </span>
                </div>
                <span className="admin-seo-arrow">{seoOpen ? "▲" : "▼"}</span>
              </button>

              {seoOpen && (
                <div className="admin-seo-content">
                  <div className="admin-seo-group">
                    <label>Meta Title</label>
                    <input
                      className="admin-seo-input"
                      type="text"
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                    />
                  </div>

                  <div className="admin-seo-group">
                    <label>Meta Description</label>
                    <textarea
                      className="admin-seo-textarea"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                    />
                  </div>

                  <div className="admin-seo-group">
                    <label>Script (JSON-LD / Custom)</label>
                    <textarea
                      className="admin-seo-textarea"
                      value={script}
                      onChange={(e) => setScript(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="admin-submit-btn">
              Publish Blog
            </button>
          </form>
        </div>

        {/* RIGHT: Published Blogs */}
        <div className="admin-card admin-blog-list-card">
          <div className="admin-header">
            <h2>Published Blogs</h2>
            <span className="admin-blog-count">{blogs.length}</span>
          </div>

          {loadingBlogs ? (
            <p className="admin-empty">Loading...</p>
          ) : blogs.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">📝</div>
              <p>No blogs published yet.</p>
            </div>
          ) : (
            <div className="admin-blog-list">
              {blogs.map((blog) => {
                const identifier = blog.urlHandle || blog.slug;
                return (
                  <div key={blog._id} className="admin-blog-item">
                    <div className="admin-blog-info">
                      <h3>{blog.title}</h3>
                      <p>
                        By {blog.author} ·{" "}
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#999" }}>
                        /blog/{identifier}
                      </p>
                    </div>
                    <div className="admin-blog-actions">
                      <Link
                        href={`/admin-blog/${identifier}`}
                        className="admin-edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        className="admin-delete-btn"
                        onClick={() => handleDelete(identifier)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}