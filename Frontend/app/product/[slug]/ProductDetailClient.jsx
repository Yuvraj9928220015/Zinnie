"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./productDetail.css";

const API_BASE_URL = "https://api.zinniezeera.com";
const API_URL = `${API_BASE_URL}/api`;

export default function ProductDetailClient({ slug, initialProduct }) {
  const router = useRouter();

  // Fix: loading=true jab initialProduct nahi hai
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [cartAdded, setCartAdded] = useState(false);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/500x500?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/").replace(/^\/+/, "")}`;
  };

  // Main effect: initialProduct use karo ya fetch karo
  useEffect(() => {
    const initProduct = (p) => {
      setProduct(p);
      if (p?.priceVariations?.length > 0) {
        setSelectedSize(p.priceVariations[0].size);
        setCurrentPrice(p.priceVariations[0].price);
      } else {
        setCurrentPrice(p?.price || 0);
      }
      setLoading(false);
    };

    if (initialProduct) {
      // Server se data aaya — directly use karo
      initProduct(initialProduct);
      return;
    }

    // Server se data nahi aaya — client fetch karo
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!slug) throw new Error("Invalid product identifier");

        const res = await fetch(`${API_URL}/products`);

        if (!res.ok) throw new Error(`Backend error: ${res.status} — localhost:5000 chal raha hai?`);

        const allProducts = await res.json();
        const found = allProducts.find((p) => p.slug === slug);

        if (!found) throw new Error(`"${slug}" slug wala product nahi mila`);

        initProduct(found);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, initialProduct]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);


  useEffect(() => {
    console.log("=== DEBUG ===");
    console.log("Slug:", slug);
    console.log("InitialProduct:", initialProduct);
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("API_BASE_URL being used:", API_BASE_URL);
  }, []);

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);
    const variation = product?.priceVariations?.find((v) => v.size === size);
    if (variation) setCurrentPrice(variation.price);
  };

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2500);
  };

  const getPriceRange = () => {
    if (!product) return "₹0.00";
    if (!product.priceVariations || product.priceVariations.length === 0)
      return `₹${Number(product.price || 0).toFixed(2)}`;
    const prices = product.priceVariations.map((v) => Number(v.price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min.toFixed(2)}` : `₹${min.toFixed(2)} – ₹${max.toFixed(2)}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-detail-wrapper">
        <div className="detail-loading">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail-container">

        {/* Main Section */}
        <div className="product-main-section">

          {/* Image */}
          <div className="productDetail-image-container">
            <img
              src={getImageUrl(product.image)}
              alt={product.title || "Product"}
              className="product-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/500x500?text=Image+Error";
              }}
            />
          </div>

          {/* Info */}
          <div className="product-info-container">
            <h1 className="productDetail-title">{product.title}</h1>

            <div className="product-description">
              <p>{product.description || "A refreshing drink made with pure ingredients."}</p>
            </div>

            <div className="product-price">₹{Number(currentPrice).toFixed(2)}</div>

            {/* Size Selector */}
            {product.priceVariations && product.priceVariations.length > 0 && (
              <div className="bottle-pack-section">
                <label className="pack-label">SELECT SIZE</label>
                <select className="pack-select" value={selectedSize} onChange={handleSizeChange}>
                  {product.priceVariations.map((v) => (
                    <option key={v.size} value={v.size}>
                      {v.size} — ₹{Number(v.price).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity + Cart */}
            <div className="quantity-cart-section">
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="qty-input"
                />
                <button className="qty-btn" onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>

              <button
                className={`add-to-cart-button ${cartAdded ? "cart-added" : ""}`}
                onClick={handleAddToCart}
              >
                {cartAdded ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      style={{ marginRight: "8px", flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Added!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      style={{ marginRight: "8px", flexShrink: 0 }}>
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-tabs-section">
          <div className="tabs-header">
            {["description", "additional", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${selectedTab === tab ? "active" : ""}`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab === "description" && "Description"}
                {tab === "additional" && "Additional Information"}
                {tab === "reviews" && "Reviews (0)"}
              </button>
            ))}
          </div>

          <div className="tab-content-area">
            <div className="tab-content">

              {selectedTab === "description" && (
                <div id="Product-Details">
                  <h3 style={{ fontSize: "22px", marginBottom: "15px", color: "#1a202c" }}>
                    Product Description
                  </h3>
                  <p>{product.description || "A drink that needs no introduction."}</p>

                  {product.priceVariations?.length > 0 && (
                    <>
                      <h4 style={{ fontSize: "18px", margin: "20px 0 10px", color: "#2d3748" }}>
                        Available Sizes & Pricing
                      </h4>
                      <ul className="product-specs">
                        {product.priceVariations.map((v) => (
                          <li key={v.size}>
                            <span>{v.size}:</span> ₹{Number(v.price).toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <h4 style={{ fontSize: "18px", margin: "20px 0 10px", color: "#2d3748" }}>
                    Product Details
                  </h4>
                  <ul className="product-specs">
                    <li><span>Category:</span> {product.category || "Beverage"}</li>
                    <li>
                      <span>Product ID:</span>{" "}
                      {product._id ? product._id.slice(-8).toUpperCase() : "N/A"}
                    </li>
                    {product.priceVariations?.length > 0 && (
                      <li>
                        <span>Size Options:</span> {product.priceVariations.length} available
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {selectedTab === "additional" && (
                <div id="Product-Details">
                  <h3 style={{ fontSize: "22px", marginBottom: "20px", color: "#1a202c" }}>
                    Additional Information
                  </h3>
                  <table className="additional-info-table">
                    <tbody>
                      <tr>
                        <th>Category</th>
                        <td>{product.category || "Beverage"}</td>
                      </tr>
                      {product.priceVariations?.length > 0 ? (
                        <>
                          <tr>
                            <th>Price Range</th>
                            <td>{getPriceRange()}</td>
                          </tr>
                          <tr>
                            <th>Available Sizes</th>
                            <td>{product.priceVariations.map((v) => v.size).join(", ")}</td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <th>Price</th>
                          <td>₹{Number(product.price || 0).toFixed(2)}</td>
                        </tr>
                      )}
                      <tr>
                        <th>SKU</th>
                        <td>{product._id ? product._id.slice(-8).toUpperCase() : "N/A"}</td>
                      </tr>
                      <tr>
                        <th>Product ID</th>
                        <td>{product._id || "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {selectedTab === "reviews" && (
                <div className="no-reviews">
                  <h3>Reviews</h3>
                  <p>There are no reviews yet.</p>
                  <div className="review-form">
                    <h4>Be the first to review "{product.title}"</h4>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    <div className="rating-select">
                      <label>Your rating *</label>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>⭐</span>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Your review *</label>
                      <textarea rows={5} placeholder="Write your review here..." />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name *</label>
                        <input type="text" />
                      </div>
                      <div className="form-group">
                        <label>Email *</label>
                        <input type="email" />
                      </div>
                    </div>
                    <div className="checkbox-group">
                      <input type="checkbox" id="save-info" />
                      <label htmlFor="save-info">Save my name and email for next time.</label>
                    </div>
                    <button className="submit-review-btn" onClick={(e) => e.preventDefault()}>
                      Submit
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}