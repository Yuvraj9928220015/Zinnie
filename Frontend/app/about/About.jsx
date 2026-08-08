'use client';

import { useState, useEffect } from 'react';
import "./about.css";

export default function About() {
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 50);

        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => {
            window.removeEventListener("resize", checkScreen);
            clearTimeout(timer);
        };
    }, []);

    const banner = {
        desktop: "/aboutimage.png",
        mobile: "/aboutimage.png",
    };

    return (
        <>
            <div className={`page-transition-enter ${visible ? 'page-transition-enter-active' : ''}`}>
                <section className="founder-section">
                    {/* Left - Image */}
                    <div className="founder-image-wrapper">
                        <img
                            src={isMobile ? banner.mobile : banner.desktop}
                            alt="Mr. Rajeyssh Saddhwani - CEO / Founder"
                            className="founder-image"
                        />
                    </div>

                    {/* Right - Content */}
                    <div className="founder-content">
                        <h3 className="founder-label">CEO / Founder</h3>
                        <h1 className="founder-name">Mr. Rajeyssh Saddhwani</h1>

                        <p>
                            Founded in 2026, Zinnie is a new and growing name in
                            the Indian beverage industry, dedicated to crafting
                            refreshing and affordable drinks tailored to Indian
                            tastes. With a vision to quench the thirst of
                            millions across urban and rural India, we blend
                            tradition and innovation to deliver high-quality
                            beverages that resonate with every Indian palate.
                        </p>

                        <p>
                            Our manufacturing facility, located in the
                            industrial heart of Ajmer, Rajasthan, is equipped
                            with modern machinery and stringent quality-control
                            processes to ensure that every bottle that leaves
                            our plant reflects excellence.
                        </p>

                        <p>
                            What sets us apart is our founder&apos;s deep
                            understanding of consumer needs. With over a decade
                            of experience in food and beverage manufacturing,
                            Mr. Rajeyssh Saddhwani continues to lead the company
                            with a hands-on approach, focused on quality, trust,
                            and customer satisfaction.
                        </p>

                        <p>
                            At Zinnie, we specialize in creating beverages that
                            blend traditional Indian flavors with modern
                            processing techniques, ensuring both taste and
                            safety in every bottle. Our commitment to hygiene,
                            innovation, and affordability has helped us win
                            hearts across the country from bustling cities to
                            the smallest villages.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}