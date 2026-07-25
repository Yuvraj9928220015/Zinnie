"use client";

import { useState } from "react";
import "./contact.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      "first-name": "firstName",
      "last-name": "lastName",
      "email": "email",
      "phone": "phone",
      "subject": "subject",
      "message": "message",
    };
    setFormData((prev) => ({ ...prev, [fieldMap[id]]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({ loading: false, success: data.message, error: "" });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setStatus({ loading: false, success: "", error: err.message });
    }
  };

  return (
    <>
      <main className="contact-page">

        <section className="contact-banner">
        </section>

        <section className="contact-form-section">
          <div className="form-card">

            <div className="form-header">
              <h2 className="form-title">Contact Us – We’re Here to Help</h2>
              <p className="form-subtitle">
                Fill in the details below and we'll respond soon.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>

              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    placeholder="Aarav"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    id="last-name"
                    placeholder="Sharma"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="aarav@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a topic…
                    </option>
                    <option>General Enquiry</option>
                    <option>Wholesale / Bulk Order</option>
                    <option>Partnership</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Tell us what's on your mind…"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {status.error && <p className="form-error">{status.error}</p>}
              {status.success && <p className="form-success">{status.success}</p>}

              <button type="submit" className="submit-btn" disabled={status.loading}>
                <span>{status.loading ? "Sending..." : "Send Message"}</span>

                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

            </form>
          </div>
        </section>
      </main>
    </>
  );
}