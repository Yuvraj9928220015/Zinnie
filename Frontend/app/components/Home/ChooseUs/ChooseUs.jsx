import "./ChooseUs.css";

const features = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 4L8 14v18c0 12.7 10.3 24.6 24 28 13.7-3.4 24-15.3 24-28V14L32 4z"
          fill="#e8f5e9"
          stroke="#2e7d32"
          strokeWidth="2.5"
        />
        <path
          d="M22 32l7 7 13-13"
          stroke="#2e7d32"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Global Quality Standards",
    description:
      "We adhere to international quality and safety standards, ensuring premium manufacturing, strict hygiene, and consistent product excellence.",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 6l4 12h13l-10.5 7.6 4 12L32 30l-10.5 7.6 4-12L15 18h13z"
          fill="#fff8e1"
          stroke="#f9a825"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x="24" y="48" width="16" height="4" rx="2" fill="#f9a825" />
        <rect x="28" y="52" width="8" height="5" rx="1" fill="#f9a825" />
      </svg>
    ),
    title: "Expert R&D Team",
    description:
      "Our experienced R&D specialists develop innovative beverage formulations, customized flavors, and market-driven solutions tailored to evolving consumer needs.",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="28" width="48" height="26" rx="3" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2.5" />
        <rect x="14" y="34" width="10" height="14" rx="2" fill="#1565c0" opacity="0.7" />
        <rect x="27" y="34" width="10" height="14" rx="2" fill="#1565c0" opacity="0.7" />
        <rect x="40" y="34" width="10" height="14" rx="2" fill="#1565c0" opacity="0.7" />
        <path d="M16 28V18a4 4 0 018 0v10M40 28V18a4 4 0 018 0v10" stroke="#1565c0" strokeWidth="2.5" />
        <circle cx="20" cy="18" r="3" fill="#1565c0" />
        <circle cx="44" cy="18" r="3" fill="#1565c0" />
      </svg>
    ),
    title: "Advanced Manufacturing",
    description:
      "Powered by advanced technology and modern facilities, we ensure precision manufacturing with stringent quality control at every stage.",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="38" rx="20" ry="14" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2.5" />
        <path
          d="M22 28c0-5.5 4.5-14 10-14s10 8.5 10 14"
          stroke="#7b1fa2"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="32" cy="20" r="5" fill="#ce93d8" stroke="#7b1fa2" strokeWidth="2" />
        <path d="M18 36c3-4 8-6 14-6s11 2 14 6" stroke="#7b1fa2" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Premium Raw Materials",
    description:
      "We source carefully selected, high-quality ingredients to deliver exceptional taste, freshness, and consistent product quality.",
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 8c-8.8 0-16 7.2-16 16 0 11 16 32 16 32s16-21 16-32c0-8.8-7.2-16-16-16z"
          fill="#fce4ec"
          stroke="#c62828"
          strokeWidth="2.5"
        />
        <circle cx="32" cy="24" r="6" fill="#c62828" opacity="0.8" />
      </svg>
    ),
    title: "End-to-End OEM/ODM Solutions",
    description:
      "From formulation and packaging to final production, we provide complete OEM/ODM beverage manufacturing solutions tailored to your brand requirements.",
  },
  {
    id: 6,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="22" fill="#e0f7fa" stroke="#00838f" strokeWidth="2.5" />
        <ellipse cx="32" cy="32" rx="10" ry="22" stroke="#00838f" strokeWidth="2" fill="none" />
        <path d="M10 32h44M12 20h40M12 44h40" stroke="#00838f" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Global Export Expertise",
    description:
      "Backed by strong export capabilities, we ensure seamless logistics, regulatory compliance, and reliable worldwide product delivery.",
  },
];

export default function ChooseUs() {
  return (
    <>
      <section className="choose-us-section" aria-labelledby="choose-us-heading">
        <div className="choose-us-container">
          {/* Header */}
          <div className="choose-us-header">
            <h2 id="choose-us-heading" className="choose-us-title">
              Why Choose <span className="choose-us-brand">Zinnie?</span>
            </h2>
            <p className="choose-us-subtitle">
              Your reliable strategic partner for premium beverage manufacturing,
              delivering excellence from concept to consumer.
            </p>
            <div className="choose-us-divider" aria-hidden="true"></div>
          </div>

          {/* Grid */}
          <div className="choose-us-grid" role="list">
            {features.map((feature) => (
              <article
                className="choose-us-card"
                key={feature.id}
                role="listitem"
              >
                <div className="choose-us-icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="choose-us-card-title">{feature.title}</h3>
                <p className="choose-us-card-desc">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}