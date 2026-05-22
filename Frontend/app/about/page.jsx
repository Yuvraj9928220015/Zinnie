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

    const banners = [
        { desktop: "/founder.jpg.jpeg", mobile: "/founder-Your-Story.jpeg" },
    ];
    return (    
        <>
            <div className={`page-transition-enter ${visible ? 'page-transition-enter-active' : ''}`}>
                {banners.map((banner, index) => (
                    <section className="banner" key={index}>
                        {isMobile ? (
                            <img
                                src={banner.mobile}
                                alt="Founder"
                                className="banner__image"
                            />
                        ) : (
                            <img
                                src={banner.desktop}
                                alt="Founder"
                                className="banner__image"
                            />
                        )}
                    </section>
                ))}
            </div>
        </>
    );
}