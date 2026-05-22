"use client";

import React, { useState } from 'react';
import "./distributor.css";
import DistributorPageContent from './DistributorPageContent';

const products = [
  {
    id: 1,
    title: "Zinnie Zeera",
    bg: "green-bg",
    img: "4.png",
    reverse: false,
    link: "/product/zeera-masala-soda/",
    des: "ZINNIE ZEERA delivers a bold, fizzy masala kick with the authentic taste of Indian jeera. Every sip refreshes your body while helping digestion with its classic spice blend. Perfect after meals or on a hot day, it gives you that desi cooling sensation with a punch of flavor. ZINNIE ZEERA — the ultimate fizzy masala refreshment!"
  },
  {
    id: 2,
    title: "Mango",
    bg: "cream-bg",
    img: "5.png",
    reverse: true,
    link: "/product/mango-drink/",
    des: "ZINNIE MANGO bursts with the rich, juicy taste of ripe mangoes in every sip. Smooth, sweet, and refreshing, it delivers a tropical vibe that instantly lifts your mood. Perfect for beating the heat or enjoying a fruity break anytime. ZINNIE MANGO — the king of fruits in a refreshing drink!"
  },
  {
    id: 3,
    title: "Ginger Lemon",
    bg: "yellow-bg",
    img: "2.png",
    reverse: false,
    link: "/product/ginger-lemon-drink/",
    des: "ZINNIE GINGER LEMON blends the zesty freshness of lemon with a warm hint of ginger for a perfectly balanced taste. It refreshes instantly while giving a light, soothing kick that energizes your body. Ideal for a fresh start or a midday boost. ZINNIE GINGER LEMON — a refreshing fusion with a spicy twist!"
  },
  {
    id: 4,
    title: "Nimbu Zeera",
    bg: "blue-bg",
    img: "1.png",
    reverse: true,
    link: "/product/nimbu-zeera-drink/",
    des: "ZINNIE NIMBU ZEERA combines tangy lemon with the bold taste of roasted jeera for a perfectly refreshing desi drink. It cools you down, aids digestion, and delivers a unique spicy-tangy flavor in every sip. ZINNIE NIMBU ZEERA — the perfect blend of nimbu freshness and jeera punch!"
  },
  {
    id: 5,
    title: "Chilli Guava",
    bg: "green-bg",
    img: "3.png",
    reverse: false,
    link: "/product/chilli-guava-drink/",
    des: "ZINNIE CHILLI GUAVA brings a unique twist of sweet guava with a spicy chilli kick. This bold fusion creates an exciting flavor that refreshes and energizes instantly. Perfect for those who love a tangy, spicy edge in their drink. ZINNIE CHILLI GUAVA — sweet, spicy, and totally refreshing!"
  }
];

export default function Distributor() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNo: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ firstName: '', lastName: '', contactNo: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <div className="distributor-page-banner">
        <img src="/zinnie-banner-5.webp" alt="Just Drink Banner" />
      </div>

      <div className="distributor-page">
        <div className="distributor-page-title">Become A Distributor</div>

        {products.map((p) => (
          <section key={p.id} className={`product-hero ${p.bg || ''}`}>
            <div className={`product-container ${p.reverse ? 'reverse' : ''}`}>
              <div className="product-image-box">
                <img src={`/${p.img}`} alt={p.title} className="floating-bottle" />
              </div>
              <div className="product-info">
                <h2 className="product-title">{p.title}</h2>
                <p className="description">{p.des}</p>
                <a
                  href={p.link}
                  className="view-btn"
                  aria-label={`View ${p.title} collection`}
                >
                  View Product
                </a>
              </div>
            </div>
          </section>
        ))}

        {/* Partnership Contact Section */}
        <section className="distributor-contact">
          <div className="contact-inner">

            {/* Left: Info */}
            <div className="contact-details">
              <span className="contact-eyebrow">Get In Touch</span>
              <h3 className="contact-heading">Become a<br /><span className="accent-text">Partner</span></h3>
              <div className="contact-divider" />
              <p className="contact-desc">
                Join our growing network of distributors and bring Savoy's premium spirits to your market. Fill in the form and our team will reach out to you.
              </p>
              <ul className="contact-info-list">
                <li>
                  <span className="info-icon">📍</span>
                  <span>Ajmer, Rajasthan, India</span>
                </li>
                <li>
                  <span className="info-icon">📞</span>
                  <span>+91-8432221711</span>
                </li>
                <li>
                  <span className="info-icon">✉️</span>
                  <span>info@balajibeverages.com</span>
                </li>
              </ul>
            </div>

            {/* Right: Form */}
            <div className="contact-form-wrapper">
              {submitted && (
                <div className="form-success">
                  Thank you! We'll be in touch soon.
                </div>
              )}
              <form className="contact-form-grid" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactNo">Contact No.</label>
                    <input
                      type="tel"
                      id="contactNo"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail ID</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your distribution region, experience, and goals..."
                    rows={6}
                    required
                  />
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>

          </div>
        </section>
      </div>
      <DistributorPageContent />
    </>
  );
}