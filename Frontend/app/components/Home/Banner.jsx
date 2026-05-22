'use client';

import { useEffect, useState } from "react";
import "./Banner.css";
import Header from "./Header/Header";
import ChooseUs from "./chooseUs/ChooseUs";
import Testimonials from "./Testimonials/Testimonials";
import BestSelling from "./BestSelling/BestSelling";


export default function Banner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const banners = [
    { desktop: "/Zinnie-banner-Desktop-1.mp4", mobile: "/Zinnie-banner-Mobile-1.mp4" },
    { desktop: "/Zinnie-banner-2.mp4",         mobile: "/Zinnie-banner-2.mp4" },
    { desktop: "/Zinnie-banner-Desktop-2.mp4", mobile: "/Zinnie-banner-Mobile-2.mp4" },
    { desktop: "/Zinnie-banner-Desktop-3.mp4", mobile: "/Zinnie-banner-Mobile-3.mp4" },
  ];

  return (
    <>
      {banners.map((banner, index) => (
        <section className="banner" key={index}>
          <video
            className="banner__video"
            src={isMobile ? banner.mobile : banner.desktop}
            autoPlay
            muted
            loop
            playsInline
          />
        </section>
      ))}
      <ChooseUs/>
      <BestSelling/>
      <Testimonials/>
      <Header/>
    </>
  );
}