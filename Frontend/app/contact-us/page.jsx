"use client";

import "./contact.css";

export default function Page() {
  return (
    <>
      <main className="contact-page">

        {/* ── BANNER ── */}
        <section className="contact-banner">

        </section>

        {/* ── CONTACT FORM ── */}
        <section className="contact-form-section">
          <div className="form-card">

            <div className="form-header">
              <h2 className="form-title">Send a Message</h2>
              <p className="form-subtitle">Fill in the details below and we'll respond soon.</p>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>

              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    placeholder="Aarav"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last-name">Last Name</label>
                  <input id="last-name" type="text" placeholder="Sharma" required />
                </div>
              </div>

              <div className="form-row two-col">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" placeholder="aarav@email.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" required defaultValue="">
                    <option value="" disabled>Select a topic…</option>
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
                  <textarea id="message" rows="5" placeholder="Tell us what's on your mind…" required />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

            </form>
          </div>
        </section>

      </main>
    </>
  );
}