import Link from 'next/link';
import { FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="footer-overlay" />

            <div className="footer-content">
                <div className="footer-grid">

                    {/* Brand Column */}
                    <div className="footer-col brand-col">
                        <img src="/Zinnie-logo.png" alt="Zinnie Logo" className="footer-logo" />
                        <p className="brand-tagline">
                            SHREE BALAJI FOODS
                        </p>
                        <div className="social-icons">
                            <a href="https://www.instagram.com/zinniezeera/" className="social-btn" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/faqs">Faqs</a></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Contact Us</h4>
                        <ul className="contact-list">
                            <li>
                                <FaPhone className="contact-icon" />
                                <span>+91-8432221711</span>
                            </li>
                            <li>
                                <FaEnvelope className="contact-icon" />
                                <span>info@balajibeverages.com</span>
                            </li>
                            {/* <li>
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>Mumbai, Maharashtra, India</span>
                            </li> */}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="divider" />
                    <p className="copyright">
                        © {new Date().getFullYear()} <span>Zinnie</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;