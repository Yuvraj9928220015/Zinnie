"use client";
import { useState } from "react";
import "./faqs.css";

// Schema data
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "How can I contact Zinnie Zeera?", acceptedAnswer: { "@type": "Answer", text: "You can contact Zinnie Zeera through our contact form, email, or phone number provided on this page." } },
        { "@type": "Question", name: "What is the customer support email of Zinnie Zeera?", acceptedAnswer: { "@type": "Answer", text: "You can reach our support team via email for any queries, feedback, or business inquiries." } },
        { "@type": "Question", name: "What details should I include in the contact form?", acceptedAnswer: { "@type": "Answer", text: "Please include your name, email, phone number, and a clear message describing your query." } },
        { "@type": "Question", name: "How long does it take to get a response?", acceptedAnswer: { "@type": "Answer", text: "We usually respond to all queries within 24–48 business hours." } },
        { "@type": "Question", name: "Can I contact Zinnie Zeera for distributorship inquiries?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can use this page to contact us regarding distributorship opportunities." } },
        { "@type": "Question", name: "Is there a phone number available for quick support?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can call us directly using the contact number provided on this page." } },
        { "@type": "Question", name: "What type of queries can I submit through this page?", acceptedAnswer: { "@type": "Answer", text: "You can submit product inquiries, bulk orders, partnership requests, feedback, and general questions." } },
        { "@type": "Question", name: "Can retailers contact you for bulk orders?", acceptedAnswer: { "@type": "Answer", text: "Yes, retailers and wholesalers can contact us for bulk purchasing and pricing details." } },
        { "@type": "Question", name: "Do you provide support for existing customers?", acceptedAnswer: { "@type": "Answer", text: "Yes, we offer full support for all our customers regarding products and services." } },
        { "@type": "Question", name: "Is my personal information safe when I contact you?", acceptedAnswer: { "@type": "Answer", text: "Yes, your personal information is kept secure and used only for communication purposes." } },
        { "@type": "Question", name: "Can I contact you for complaints or feedback?", acceptedAnswer: { "@type": "Answer", text: "Absolutely, we welcome feedback and resolve complaints as quickly as possible." } },
        { "@type": "Question", name: "What are your customer support working hours?", acceptedAnswer: { "@type": "Answer", text: "Our team operates during standard business hours and responds to queries promptly." } },
        { "@type": "Question", name: "Do you offer WhatsApp or instant support?", acceptedAnswer: { "@type": "Answer", text: "Depending on availability, we may offer WhatsApp or quick-response support options." } },
        { "@type": "Question", name: "Can I contact Zinnie Zeera for partnership or collaboration?", acceptedAnswer: { "@type": "Answer", text: "Yes, we welcome business collaborations and partnership inquiries." } },
        { "@type": "Question", name: "What should I do if I don't get a response?", acceptedAnswer: { "@type": "Answer", text: "If you don't receive a response within 48 hours, you can resend your query or try alternative contact methods." } },
    ],
};

const faqData = [
    { id: 1, question: "How can I contact Zinnie Zeera?", answer: "You can contact Zinnie Zeera through our contact form, email, or phone number provided on this page.", tag: "Support" },
    { id: 2, question: "What is the customer support email of Zinnie Zeera?", answer: "You can reach our support team via email for any queries, feedback, or business inquiries.", tag: "Support" },
    { id: 3, question: "What details should I include in the contact form?", answer: "Please include your name, email, phone number, and a clear message describing your query.", tag: "Support" },
    { id: 4, question: "How long does it take to get a response?", answer: "We usually respond to all queries within 24–48 business hours.", tag: "Support" },
    { id: 5, question: "Can I contact Zinnie Zeera for distributorship inquiries?", answer: "Yes, you can use this page to contact us regarding distributorship opportunities.", tag: "Orders" },
    { id: 6, question: "Is there a phone number available for quick support?", answer: "Yes, you can call us directly using the contact number provided on this page.", tag: "Support" },
    { id: 7, question: "What type of queries can I submit through this page?", answer: "You can submit product inquiries, bulk orders, partnership requests, feedback, and general questions.", tag: "Support" },
    { id: 8, question: "Can retailers contact you for bulk orders?", answer: "Yes, retailers and wholesalers can contact us for bulk purchasing and pricing details.", tag: "Orders" },
    { id: 9, question: "Do you provide support for existing customers?", answer: "Yes, we offer full support for all our customers regarding products and services.", tag: "Support" },
    { id: 10, question: "Is my personal information safe when I contact you?", answer: "Yes, your personal information is kept secure and used only for communication purposes.", tag: "Account" },
    { id: 11, question: "Can I contact you for complaints or feedback?", answer: "Absolutely, we welcome feedback and resolve complaints as quickly as possible.", tag: "Support" },
    { id: 12, question: "What are your customer support working hours?", answer: "Our team operates during standard business hours and responds to queries promptly.", tag: "Support" },
    { id: 13, question: "Do you offer WhatsApp or instant support?", answer: "Depending on availability, we may offer WhatsApp or quick-response support options.", tag: "Support" },
    { id: 14, question: "Can I contact Zinnie Zeera for partnership or collaboration?", answer: "Yes, we welcome business collaborations and partnership inquiries.", tag: "Orders" },
    { id: 15, question: "What should I do if I don't get a response?", answer: "If you don't receive a response within 48 hours, you can resend your query or try alternative contact methods.", tag: "Support" },
];

// Sirf "-" aur "+" text icon — koi SVG nahi
function PlusIcon({ open }) {
    return (
        <span className={`faq-icon ${open ? "faq-icon--open" : ""}`}>
            {open ? "−" : "+"}
        </span>
    );
}

function FaqItem({ faq, isOpen, onClick }) {
    return (
        <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
            <button className="faq-btn" onClick={onClick} aria-expanded={isOpen}>
                <span className="faq-q">{faq.question}</span>
                <PlusIcon open={isOpen} />
            </button>
            <div className={`faq-body ${isOpen ? "faq-body--open" : ""}`}>
                <div className="faq-body-inner">
                    <p className="faq-a">{faq.answer}</p>
                </div>
            </div>
        </div>
    );
}

export default function Faqs() {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <>
            {/* Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="faq-section">
                <div className="faq-container">
                    <div className="faq-header">
                        <h2 className="faq-title">Frequently Asked Questions</h2>
                        <p className="faq-subtitle">
                            Welcome to our FAQs section, where you can find quick answers to the most common questions about our products, services, ordering, delivery, and policies. If you still need help, feel free to contact our support team anytime.
                        </p>
                    </div>
                    <div className="faq-list">
                        {faqData.map((faq) => (
                            <FaqItem
                                key={faq.id}
                                faq={faq}
                                isOpen={openId === faq.id}
                                onClick={() => handleToggle(faq.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}