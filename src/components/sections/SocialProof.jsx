// src/components/sections/SocialProof.jsx
import { useState, useCallback, useRef } from "react";
import { TESTIMONIALS } from "../../data/featuresData";
import {
  ArrowTrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../icons";

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [slideDir, setSlideDir] = useState(null); // 'exit-left' | 'exit-right' | 'enter-right' | 'enter-left' | 'settled'
  const cardRef = useRef(null);

  const navigate = useCallback((dir) => {
    // 1. Slide current card out
    setSlideDir(dir === 1 ? "exit-left" : "exit-right");

    setTimeout(() => {
      // 2. Swap content + position card on the opposite side (invisible)
      setCurrentTestimonial((prev) =>
        dir === 1
          ? prev === TESTIMONIALS.length - 1
            ? 0
            : prev + 1
          : prev === 0
            ? TESTIMONIALS.length - 1
            : prev - 1,
      );
      setSlideDir(dir === 1 ? "enter-right" : "enter-left");

      // 3. Next frame — slide into settled position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSlideDir("settled"));
      });
    }, 220);
  }, []);

  const prevTestimonial = useCallback(() => navigate(-1), [navigate]);
  const nextTestimonial = useCallback(() => navigate(1), [navigate]);

  const current = TESTIMONIALS[currentTestimonial];

  return (
    <section
      aria-label="social proof"
      id="social-proof"
      className="social-proof-section"
    >
      <div className="section-container">
        <h2 className="social-proof-title" data-reveal>
          <span className="section-title-line">Trusted by Teams</span>
        </h2>

        {/* Metrics — data-count drives the scroll-triggered counter animation */}
        <div className="metrics-row" data-reveal-stagger>
          <div className="metric">
            <div className="metric-icon">
              <ArrowTrendingUpIcon size={24} aria-label="Growth metric" />
            </div>
            <span className="stat-number" data-count="10" data-suffix="M+">
              10M+
            </span>
            <span className="stat-label">Tasks Automated</span>
          </div>

          <div className="metric">
            <span className="stat-number" data-count="99.99" data-suffix="%">
              99.99%
            </span>
            <span className="stat-label">Uptime SLA</span>
          </div>

          <div className="metric">
            <span className="stat-number" data-count="500" data-suffix="ms">
              500ms
            </span>
            <span className="stat-label">Avg Response</span>
          </div>
        </div>

        {/* Testimonial carousel with slide transition */}
        <div className="testimonials-carousel" data-reveal="scale">
          <div
            ref={cardRef}
            className={`testimonial-card testimonial-slide testimonial-slide--${slideDir || "settled"}`}
          >
            <p className="testimonial-quote">"{current.quote}"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{current.avatar}</div>
              <div className="testimonial-info">
                <div className="testimonial-name">{current.author}</div>
                <div className="testimonial-role">{current.role}</div>
              </div>
            </div>
          </div>

          <div
            className="carousel-controls"
            aria-label="Testimonial navigation"
          >
            <button aria-label="Previous testimonial" onClick={prevTestimonial}>
              <ChevronLeftIcon size={20} aria-label="Previous" />
            </button>
            <button aria-label="Next testimonial" onClick={nextTestimonial}>
              <ChevronRightIcon size={20} aria-label="Next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
