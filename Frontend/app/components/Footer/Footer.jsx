import Link from 'next/link';
import { FaInstagram, FaPhone, FaTwitter, FaPinterest, FaEnvelope, FaLinkedin } from 'react-icons/fa';
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
                            <a href="https://x.com/zinniezeera" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/zinniezeera/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="https://www.instagram.com/zinniezeera/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://in.pinterest.com/zinniezeera/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaPinterest size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="footer-col">
                        <h4 className="footer-heading">About</h4>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/faqs">Faqs</a></li>
                            <li><a href="/become-a-distributor/">Distributor</a></li>
                            <li><a href="/blog/">Blog</a></li>
                            <li><a href="/contact-us/">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Products</h4>
                        <ul className="footer-links">
                            <li><a href="/product/">All Products</a></li>
                            <li><a href="/product/chilli-guava-drink/">Chilli Guava Drink</a></li>
                            <li><a href="/product/nimbu-zeera-drink/">Nimbu Zeera</a></li>
                            <li><a href="/product/ginger-lemon-drink/">Ginger Lemon</a></li>
                            <li><a href="/product/zeera-masala-soda/">Zinnie Zeera</a></li>
                            <li><a href="/product/mango-drink/">Zinnie Mango</a></li>
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
                    <p className="copyright">
                        © {new Date().getFullYear()} <span>Zinnie</span>. All rights reserved.
                    </p>

                    <p className="Developed">
                        <a href="/sitemap"> Sitemap </a> | Developed By
                        <a href="https://lensclickerdigital.com" target="_blank" rel="noopener noreferrer"> LensClickerDigital </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;