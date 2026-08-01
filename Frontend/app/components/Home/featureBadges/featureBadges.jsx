"use client";
import React from "react";
import { FiShield, FiTruck, FiHeart, FiCheckCircle } from "react-icons/fi";
import "./featureBadges.css";

const featuresData = [
  {
    icon: <FiShield />,
    title: "Since",
    subtitle: "2026",
  },
  {
    icon: <FiTruck />,
    title: "Fast Delivery",
    subtitle: "3-4 business days",
  },
  {
    icon: <FiHeart />,
    title: "With Love From",
    subtitle: "Ajmer",
  },
  {
    icon: <FiCheckCircle />,
    title: "Quality Guarantee",
    subtitle: "Premium quality products",
  },
];

const FeatureBadges = () => {
  return (
    <section className="fb-badges-section">
      <div className="fb-badges-container">
        {featuresData.map((item, idx) => (
          <div className="fb-badge-card" key={idx}>
            <div className="fb-badge-icon">{item.icon}</div>
            <div className="fb-badge-text">
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureBadges;