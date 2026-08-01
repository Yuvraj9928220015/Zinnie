import { useState, useEffect, useRef, useCallback } from "react";
import "./Testimonials.css";

const testimonialsData = [
    {
        id: 1,
        text: "Zinnie ka taste kaafi alag aur refreshing hai. Nimbu Zeera peene ke baad sach mein thandak feel hoti hai.",
        author: " Deepak R.",
    },
    {
        id: 2,
        text: "Chilli Guava ekdum unique flavor hai. Pehle kabhi aisa taste try nahi kiya — really liked it!",
        author: "Ritu S.",
    },
    {
        id: 3,
        text: "Mango flavor kaafi natural lagta hai. Sweetness bhi balanced hai, over nahi lagti.",
        author: "Anuj K.",
    },
    {
        id: 4,
        text: "Ginger Lemon ka flavor light aur refreshing hai. Daily peene ke liye perfect drink hai.",
        author: "Kavita P.",
    },
    {
        id: 5,
        text: "Zinnie drinks ka sabse accha part hai ki taste consistent rehta hai. Har baar same quality milti hai.",
        author: "Mohit A",
    },
    {
        id: 6,
        text: "Family ke saath try kiya tha, sabko alag-alag flavors pasand aaye. Kaafi versatile range hai.",
        author: "Farhan M.",
    },
    {
        id: 7,
        text: "Zinnie ka overall experience kaafi acha hai — taste, price aur quality sab balanced hai.",
        author: "Sneha T.",
    },
    {
        id: 8,
        text: "Garmi ke time pe Zinnie drinks kaafi refreshing lagte hain. Light aur easy to drink hain.",
        author: "Nitin G.",
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
    const isAnimating = useRef(false); // NEW: lock so goNext can't fire mid-transition
    const fallbackTimer = useRef(null); // NEW: safety unlock if transitionend never fires

    const extendedSlides = [
        testimonialsData[TOTAL - 1],
        ...testimonialsData,
        testimonialsData[0],
    ];

    const moveTo = useCallback((index, animate = true) => {
        setIsTransitioning(animate);
        setTrackIndex(index);
    }, []);

    const clearFallbackTimer = () => {
        if (fallbackTimer.current) {
            clearTimeout(fallbackTimer.current);
            fallbackTimer.current = null;
        }
    };

    const handleTransitionEnd = useCallback(() => {
        clearFallbackTimer();
        isAnimating.current = false; // unlock, transition is genuinely done

        if (isJumping.current) return;

        // Use >= / <= instead of === so any out-of-range value self-corrects
        if (trackIndex >= TOTAL + 1) {
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
        } else if (trackIndex <= 0) {
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
        if (isAnimating.current) return; // guard: skip if a transition is already running
        isAnimating.current = true;
        setIsTransitioning(true);

        setTrackIndex((prev) => {
            const next = prev + 1;
            const realIndex = next > TOTAL ? 0 : next - 1;
            setActiveDot(realIndex < TOTAL ? realIndex : 0);
            return next;
        });

        // Safety net: if transitionend somehow never fires (tab was
        // backgrounded, CSS transition got interrupted, etc.), force-unlock
        // after a bit longer than the transition duration so autoplay
        // doesn't get stuck forever.
        clearFallbackTimer();
        fallbackTimer.current = setTimeout(() => {
            isAnimating.current = false;
        }, TRANSITION_DURATION + 300);
    }, []);

    const goToDot = useCallback((dotIndex) => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        setActiveDot(dotIndex);
        moveTo(dotIndex + 1);

        clearFallbackTimer();
        fallbackTimer.current = setTimeout(() => {
            isAnimating.current = false;
        }, TRANSITION_DURATION + 300);
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

    // NEW: pause autoplay while the tab is hidden, resume when it's visible
    // again. This stops trackIndex from silently drifting out of bounds
    // while transitions can't run in the background.
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                isAnimating.current = false;
                clearFallbackTimer();
                startAutoPlay();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            clearFallbackTimer();
        };
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