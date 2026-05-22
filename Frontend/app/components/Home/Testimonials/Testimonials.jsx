import { useState, useEffect, useRef, useCallback } from "react";
import "./Testimonials.css";

const testimonialsData = [
    {
        id: 1,
        text: "The perfect blend of authentic jeera flavor and refreshing taste! It feels truly traditional, not overly sweet, and instantly refreshing. A favorite in our home.",
        author: "Shradha",
    },
    {
        id: 2,
        text: "Zinnie Zeera has become my everyday refreshment, especially during hot days. The taste feels unique, satisfying, and far better than ordinary soft drinks.",
        author: "Yuvraj",
    },
    {
        id: 3,
        text: "From the first sip, you can experience the premium quality. Refreshing taste, authentic flavor, and attractive packaging make Zinnie Zeera stand out.",
        author: "Mukul",
    },
    {
        id: 4,
        text: "Whether it’s a family gathering, celebration, or daily refreshment, Zinnie Zeera always brings the perfect desi touch to every moment.",
        author: "Ashraf Khan",
    },
    {
        id: 5,
        text: "Absolutely loved the authentic jeera taste! It’s refreshing, nostalgic, and offers something completely different from regular beverages.",
        author: "Mr. Sahil",
    },
    {
        id: 6,
        text: "Zinnie Zeera is a family favorite at our home. Kids enjoy the refreshing taste, while adults love its authentic traditional flavor.",
        author: "Gaurav Singh",
    },
];

const TOTAL = testimonialsData.length;
const TRANSITION_DURATION = 500;
const AUTO_PLAY_INTERVAL = 3500;

export default function Testimonials() {
    const [trackIndex, setTrackIndex] = useState(1);
    const [activeDot, setActiveDot] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const trackRef = useRef(null);
    const autoPlayRef = useRef(null);
    const isJumping = useRef(false);

    const extendedSlides = [
        testimonialsData[TOTAL - 1],
        ...testimonialsData,
        testimonialsData[0],
    ];

    const moveTo = useCallback((index, animate = true) => {
        setIsTransitioning(animate);
        setTrackIndex(index);
    }, []);

    const handleTransitionEnd = useCallback(() => {
        if (isJumping.current) return;

        if (trackIndex === TOTAL + 1) {
            isJumping.current = true;
            setIsTransitioning(false);
            setTrackIndex(1);
            setActiveDot(0);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    isJumping.current = false;
                    setIsTransitioning(true);
                });
            });
        } else if (trackIndex === 0) {
            isJumping.current = true;
            setIsTransitioning(false);
            setTrackIndex(TOTAL);
            setActiveDot(TOTAL - 1);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    isJumping.current = false;
                    setIsTransitioning(true);
                });
            });
        }
    }, [trackIndex]);

    // Next slide
    const goNext = useCallback(() => {
        setTrackIndex((prev) => {
            const next = prev + 1;
            const realIndex = next > TOTAL ? 0 : next - 1;
            setActiveDot(realIndex < TOTAL ? realIndex : 0);
            return next;
        });
        setIsTransitioning(true);
    }, []);

    const goToDot = useCallback((dotIndex) => {
        setActiveDot(dotIndex);
        moveTo(dotIndex + 1);
    }, [moveTo]);

    // Auto-play
    const startAutoPlay = useCallback(() => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(goNext, AUTO_PLAY_INTERVAL);
    }, [goNext]);

    const stopAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [startAutoPlay]);

    return (
        <>
            <section className="testimonials-section">
                <h2 className="testimonials-title">Customer reviews and testimonials</h2>

                <div
                    className="testimonials-slider-wrapper"
                    onMouseEnter={stopAutoPlay}
                    onMouseLeave={startAutoPlay}
                >
                    <div
                        ref={trackRef}
                        className="testimonials-track"
                        onTransitionEnd={handleTransitionEnd}
                        style={{
                            transform: `translateX(-${trackIndex * 100}%)`,
                            transition: isTransitioning
                                ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                                : "none",
                        }}
                    >
                        {extendedSlides.map((item, i) => (
                            <div className="testimonial-card" key={i}>
                                <p className="testimonial-text">
                                    <span className="quote-open">❝</span>
                                    {item.text}
                                    <span className="quote-close">❞</span>
                                </p>
                                <p className="testimonial-author">" {item.author} "</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots (only TOTAL dots for real slides) */}
                <div className="testimonials-dots">
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${activeDot === index ? "active" : ""}`}
                            onClick={() => goToDot(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}