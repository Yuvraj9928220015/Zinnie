"use client";
import React from "react";
import "./aboutUs.css";

const AboutUs = () => {
    return (
        <section className="au-about-section">
            <h2 className="au-about-title">About Us</h2>

            <div className="au-about-container">
                <div className="container-fluid">
                    <div className="row au-about-row">
                        <div className="col-6 au-about-col">
                            <div className="au-about-image-wrapper">
                                <img
                                    src="/New-About-image.png"
                                    alt="About Us"
                                    className="au-about-image"
                                />
                            </div>
                        </div>
                        {/* */}
                        <div className="col-6 au-about-col">
                            <div className="au-about-content">
                                <p>
                                    At Zinnie, we are passionate about bringing India’s favorite flavors to life in a refreshing and modern way. As a growing name in the Indian beverage industry, our mission is simple — to create affordable, high-quality drinks that suit every Indian taste and lifestyle.
                                </p>

                                <p>
                                    Founded with a vision to serve both urban and rural India, Zinnie blends the richness of traditional Indian flavors like jeera, nimbu, and masala with advanced manufacturing techniques. The result is a range of beverages that are not only delicious but also consistent in quality and safe to consume.
                                </p>

                                <p>
                                    Our state-of-the-art manufacturing facility in Ajmer, Rajasthan, is equipped with modern machinery and strict quality control systems. Every bottle of Zinnie is produced with a strong focus on hygiene, taste, and excellence, ensuring that customers get the same refreshing experience every time.
                                </p>

                                <p>
                                    What truly sets us apart is our deep understanding of Indian consumers. With years of experience in the food and beverage industry, our leadership focuses on delivering products that connect with real preferences — bold taste, great value, and reliable quality.
                                </p>
                                <p>Today, Zinnie is proudly serving customers across cities, towns, and villages, becoming a trusted choice for those who seek refreshment with a traditional twist.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;