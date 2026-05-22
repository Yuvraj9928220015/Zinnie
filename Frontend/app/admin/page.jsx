"use client";
import { useState, useEffect, useRef } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.zinniezeera.com";
const ADMIN_TOKEN_KEY = "admin_token";

const VALID_SIZES = [
  "100 ML", "160 ML", "200 ML - 24 Pack", "200 ML - 30 Pack",
  "250 ML", "300 ML", "500 ML", "600 ML", "600 ML - With Sugar", "750 ML"
];

// ─── Slug Generator ───────────────────────────────────────────────────────────
function toSlug(str) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f8f6" }}>
      <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "16px", boxShadow: "0 2px 16px #0001", width: "360px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.25rem" }}>Admin Login</h1>
        <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Zinnie Zeera — Product Management</p>
        {error && <div style={errorStyle}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label style={{ ...labelStyle, marginTop: "0.75rem" }}>Password</label>
          <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={{ ...btnStyle, width: "100%", marginTop: "1.25rem" }} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Product Form ──────────────────────────────────────────────────────────────
function ProductForm({ initial, onSave, onCancel, token }) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    description: initial?.description || "",
    category: initial?.category || "",
    slug: initial?.slug || "",
    metaTitle: initial?.metaTitle || "",
    metaDescription: initial?.metaDescription || "",
    priceVariations: initial?.priceVariations || [{ size: VALID_SIZES[0], price: "" }],
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(initial?.image ? getImageUrl(initial.image) : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slugManual, setSlugManual] = useState(!!initial?.slug); // track if user manually edited slug
  const fileRef = useRef();

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  // Auto-generate slug from title (only if user hasn't manually edited it)
  const handleTitleChange = (val) => {
    setForm(f => ({
      ...f,
      title: val,
      slug: slugManual ? f.slug : toSlug(val),
      metaTitle: f.metaTitle || val, // auto-fill metaTitle if empty
    }));
  };

  const handleSlugChange = (val) => {
    setSlugManual(true);
    setField("slug", val.toLowerCase().replace(/\s+/g, "-"));
  };

  const addVariation = () => setForm(f => ({
    ...f,
    priceVariations: [...f.priceVariations, { size: VALID_SIZES[0], price: "" }]
  }));

  const removeVariation = (i) => setForm(f => ({
    ...f,
    priceVariations: f.priceVariations.filter((_, idx) => idx !== i)
  }));

  const updateVariation = (i, key, val) => setForm(f => {
    const pv = [...f.priceVariations];
    pv[i] = { ...pv[i], [key]: val };
    return { ...f, priceVariations: pv };
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.title || !form.description || !form.category) {
      return setError("Title, description aur category required hain.");
    }
    if (!initial && !imageFile) return setError("Image required hai.");
    if (!form.priceVariations.length) return setError("Kam se kam ek price variation add karein.");
    for (const pv of form.priceVariations) {
      if (!pv.size || pv.price === "" || isNaN(pv.price)) return setError("Sab price variations fill karein.");
    }
    const sizes = form.priceVariations.map(v => v.size);
    if (sizes.length !== new Set(sizes).size) return setError("Duplicate sizes allowed nahi hain.");

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("slug", form.slug || toSlug(form.title));
      fd.append("metaTitle", form.metaTitle || form.title);
      fd.append("metaDescription", form.metaDescription || form.description.slice(0, 160));
      fd.append("priceVariations", JSON.stringify(
        form.priceVariations.map(v => ({ size: v.size, price: Number(v.price) }))
      ));
      if (imageFile) fd.append("image", imageFile);

      const url = initial
        ? `${API_BASE_URL}/api/products/${initial._id}`
        : `${API_BASE_URL}/api/products`;
      const method = initial ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error saving product");
      onSave(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const charCount = form.metaDescription.length;

  return (
    <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e8e8e4" }}>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.25rem" }}>
        {initial ? "Edit Product" : "New Product Add"}
      </h2>
      {error && <div style={errorStyle}>{error}</div>}

      {/* Row 1: Title + Category */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Title *</label>
          <input
            style={inputStyle}
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="e.g. Jeera Cola 500ml"
          />
        </div>
        <div>
          <label style={labelStyle}>Category *</label>
          <input
            style={inputStyle}
            value={form.category}
            onChange={e => setField("category", e.target.value)}
            placeholder="e.g. Energy Drink"
          />
        </div>
      </div>

      {/* Description */}
      <label style={{ ...labelStyle, marginTop: "0.75rem" }}>Description *</label>
      <textarea
        style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
        value={form.description}
        onChange={e => setField("description", e.target.value)}
        placeholder="Product description..."
      />

      {/* SEO Section */}
      <div style={{ marginTop: "1rem", padding: "1rem", background: "#f8f8f6", borderRadius: "8px", border: "1px solid #e8e8e4" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#555", margin: "0 0 0.75rem" }}>🔍 SEO Settings</p>

        {/* Slug */}
        <label style={labelStyle}>URL Slug</label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.8rem", color: "#aaa", whiteSpace: "nowrap" }}>/products/</span>
          <input
            style={{ ...inputStyle, fontFamily: "monospace", fontSize: "0.85rem" }}
            value={form.slug}
            onChange={e => handleSlugChange(e.target.value)}
            placeholder="auto-generated-from-title"
          />
          {slugManual && (
            <button
              style={{ ...btnStyle, background: "#f0f0ec", color: "#888", fontSize: "0.75rem", padding: "0.3rem 0.6rem", whiteSpace: "nowrap" }}
              onClick={() => { setSlugManual(false); setField("slug", toSlug(form.title)); }}
            >
              Reset
            </button>
          )}
        </div>

        {/* Meta Title */}
        <label style={labelStyle}>Meta Title</label>
        <input
          style={{ ...inputStyle, marginBottom: "0.75rem" }}
          value={form.metaTitle}
          onChange={e => setField("metaTitle", e.target.value)}
          placeholder="SEO ke liye title (default: product title)"
          maxLength={70}
        />
        <div style={{ fontSize: "0.75rem", color: form.metaTitle.length > 60 ? "#e87" : "#aaa", marginTop: "-0.5rem", marginBottom: "0.75rem" }}>
          {form.metaTitle.length}/70 characters
        </div>

        {/* Meta Description */}
        <label style={labelStyle}>Meta Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }}
          value={form.metaDescription}
          onChange={e => setField("metaDescription", e.target.value)}
          placeholder="Google search mein dikhne wala description (max 160 chars)"
          maxLength={160}
        />
        <div style={{ fontSize: "0.75rem", color: charCount > 150 ? "#e87" : "#aaa", marginTop: "0.25rem" }}>
          {charCount}/160 characters
          {charCount === 0 && <span style={{ color: "#aaa" }}> — khali rehne par description se auto-fill hoga</span>}
        </div>
      </div>

      {/* Image */}
      <label style={{ ...labelStyle, marginTop: "0.75rem" }}>
        Image {initial ? "(optional — nahi badlenge toh purani rahegi)" : "*"}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem" }}>
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "8px", border: "1px solid #e8e8e4" }}
          />
        )}
        <button
          style={{ ...btnStyle, background: "#f0f0ec", color: "#333" }}
          onClick={() => fileRef.current.click()}
        >
          {preview ? "Image Update" : "Select Image"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImage} />
      </div>

      {/* Price Variations */}
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <label style={labelStyle}>Price Variations *</label>
          <button style={{ ...btnStyle, fontSize: "0.8rem", padding: "0.3rem 0.75rem" }} onClick={addVariation}>
            + Add Size
          </button>
        </div>
        {form.priceVariations.map((pv, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem", alignItems: "center" }}>
            <select
              style={{ ...inputStyle, flex: 2 }}
              value={pv.size}
              onChange={e => updateVariation(i, "size", e.target.value)}
            >
              {VALID_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input
              style={{ ...inputStyle, flex: 1 }}
              type="number"
              min="0"
              value={pv.price}
              onChange={e => updateVariation(i, "price", e.target.value)}
              placeholder="₹ Price"
            />
            {form.priceVariations.length > 1 && (
              <button
                onClick={() => removeVariation(i)}
                style={{ background: "#fee", color: "#c33", border: "none", borderRadius: "6px", padding: "0.4rem 0.6rem", cursor: "pointer", fontSize: "1rem" }}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
        <button style={btnStyle} onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : initial ? "Update Product" : "Add Product"}
        </button>
        <button style={{ ...btnStyle, background: "#f0f0ec", color: "#333" }} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (saved) => {
    if (editProduct) {
      setProducts(ps => ps.map(p => p._id === saved._id ? saved : p));
    } else {
      setProducts(ps => [saved, ...ps]);
    }
    setShowForm(false);
    setEditProduct(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetch(`${API_BASE_URL}/api/products/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(ps => ps.filter(p => p._id !== deleteId));
      setDeleteId(null);
    } catch {
    } finally {
      setDeleting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
  };

  if (!token) return <LoginForm onLogin={setToken} />;

  const filtered = products.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f6" }}>
      {/* Header */}
      <div style={{ padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8e8e4", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, margin: 0 }}>Zinnie Zeera — Admin</h1>
          <p style={{ color: "#888", fontSize: "0.8rem", margin: 0 }}>Product Management</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button style={btnStyle} onClick={() => { setShowForm(true); setEditProduct(null); }}>+ Add Product</button>
          <button style={{ ...btnStyle, background: "#f0f0ec", color: "#666" }} onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1.5rem 2rem" }}>
        {/* Add/Edit Form */}
        {(showForm || editProduct) && (
          <div style={{ marginBottom: "1.5rem" }}>
            <ProductForm
              initial={editProduct}
              token={token}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditProduct(null); }}
            />
          </div>
        )}

        {/* Delete Confirm */}
        {deleteId && (
          <div style={{ background: "#fff7f7", border: "1px solid #fcc", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "#a33" }}>Kya aap sure hain? Yeh product delete ho jayega.</span>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button style={{ ...btnStyle, background: "#c33" }} onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete Karein"}
              </button>
              <button style={{ ...btnStyle, background: "#f0f0ec", color: "#333" }} onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Search */}
        <input
          style={{ ...inputStyle, maxWidth: "360px", marginBottom: "1rem" }}
          placeholder="Search by name, category, ya slug..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Stats */}
        <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "1rem" }}>
          Total: {products.length} products {search && `(${filtered.length} results)`}
        </p>

        {/* Products Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>Loading...</div>
        ) : (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e8e8e4", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f8f6", borderBottom: "1px solid #e8e8e4" }}>
                  <th style={thStyle}>Image</th>
                  <th style={thStyle}>Title & Slug</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>SEO</th>
                  <th style={thStyle}>Sizes</th>
                  <th style={thStyle}>Price Range</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                      Koi product nahi mila.
                    </td>
                  </tr>
                ) : filtered.map(p => {
                  const prices = p.priceVariations?.map(v => v.price) || [];
                  const min = Math.min(...prices), max = Math.max(...prices);
                  const priceStr = prices.length ? (min === max ? `₹${min}` : `₹${min} – ₹${max}`) : "—";
                  const hasMeta = p.metaTitle || p.metaDescription;
                  return (
                    <tr key={p._id} style={{ borderBottom: "1px solid #f0f0ec" }}>
                      <td style={tdStyle}>
                        <img
                          src={getImageUrl(p.image)}
                          alt={p.title}
                          style={{ width: 60, height: 80, objectFit: "cover", borderRadius: "6px", border: "1px solid #e8e8e4" }}
                        />
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>{p.title}</div>
                        <div style={{ color: "#aaa", fontSize: "0.75rem", fontFamily: "monospace" }}>/{p.slug}</div>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ background: "#f0f0ec", padding: "0.25rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem" }}>
                          {p.category}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        {hasMeta ? (
                          <div>
                            <div style={{ fontSize: "0.78rem", color: "#333", fontWeight: 500, maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {p.metaTitle}
                            </div>
                            <div style={{ fontSize: "0.72rem", color: "#999", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {p.metaDescription}
                            </div>
                          </div>
                        ) : (
                          <span style={{ fontSize: "0.78rem", color: "#ccc" }}>—</span>
                        )}
                      </td>
                      <td style={tdStyle}>{p.priceVariations?.length || 0} sizes</td>
                      <td style={{ ...tdStyle, fontWeight: 500 }}>{priceStr}</td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            style={{ ...btnStyle, fontSize: "0.8rem", padding: "0.3rem 0.75rem" }}
                            onClick={() => { setEditProduct(p); setShowForm(false); }}
                          >
                            Edit
                          </button>
                          <button
                            style={{ ...btnStyle, background: "#fee", color: "#c33", fontSize: "0.8rem", padding: "0.3rem 0.75rem" }}
                            onClick={() => setDeleteId(p._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Helpers & Styles ──────────────────────────────────────────────────────────
function getImageUrl(imagePath) {
  if (!imagePath) return "https://via.placeholder.com/80x80?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/").replace(/^\/+/, "")}`;
}

const inputStyle = {
  width: "100%", padding: "0.5rem 0.75rem", borderRadius: "8px",
  border: "1px solid #ddd", fontSize: "0.9rem", outline: "none",
  boxSizing: "border-box", fontFamily: "inherit",
};
const labelStyle = {
  display: "block", fontSize: "0.8rem", fontWeight: 500, color: "#555", marginBottom: "0.25rem"
};
const btnStyle = {
  background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "8px",
  padding: "0.5rem 1rem", fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit",
};
const errorStyle = {
  background: "#fee", color: "#c33", padding: "0.75rem", borderRadius: "8px",
  marginBottom: "1rem", fontSize: "0.875rem"
};
const thStyle = {
  padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.8rem", fontWeight: 600, color: "#555"
};
const tdStyle = {
  padding: "0.75rem 1rem", fontSize: "0.875rem", verticalAlign: "middle"
};