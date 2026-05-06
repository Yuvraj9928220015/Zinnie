'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "./Navbar.css";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !event.target.closest('.mobile-menu') &&
                !event.target.closest('.mobile-menu-btn')
            ) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <>
            <div className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container-fluid">
                    <div className="navbar-content">
                        <div className="navbar-section">

                            {/* Logo */}
                            <div className="navbar-logo-section">
                                <div className="navbar-logo">
                                    <Link href="/" onClick={handleLinkClick}>
                                        <Image
                                            src="/Zinnie-logo.png"
                                            alt="Zinnie Logo"
                                            width={120}
                                            height={50}
                                            priority
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Desktop Menu */}
                            <div className="navbar-menu-section">
                                <div className="navbar-list">
                                    <ul>
                                        <li>
                                            <Link href="/" onClick={handleLinkClick}>
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/about" onClick={handleLinkClick}>
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog" onClick={handleLinkClick}>
                                                Blog
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/product" onClick={handleLinkClick}>
                                                Products
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/distributor" onClick={handleLinkClick}>
                                                Distributor
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/faqs" onClick={handleLinkClick}>
                                                Faqs
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="mobile-menu-btn"
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                            >
                                <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>

                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    <ul>
                        <li>
                            <Link href="/" onClick={handleLinkClick}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" onClick={handleLinkClick}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" onClick={handleLinkClick}>
                                Blog
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
};

export default Navbar;