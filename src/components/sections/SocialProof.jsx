// src/components/sections/SocialProof.jsx
import { useState, useCallback, useRef, useEffect } from "react";
import { TESTIMONIALS } from "../../data/featuresData";
import {
  ArrowTrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../icons";

// phase: 'idle' | 'exiting' | 'entering'
const TRANSITION_MS = 480;

export default function SocialProof() {
  const [index, setIndex] = useState(0);
  const [next, setNext] = useState(null); // index of incoming card
  const [phase, setPhase] = useState("idle"); // animation phase
  const [direction, setDir] = useState(1); // 1 = forward, -1 = backward
  const lockRef = useRef(false);
  const dotInterval = useRef(null);

  const navigate = useCallback(
    (dir) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setDir(dir);

      const nextIdx =
        dir === 1
          ? (index + 1) % TESTIMONIALS.length
          : (index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;

      setNext(nextIdx);
      setPhase("exiting");

      setTimeout(() => {
        setPhase("entering");
        setIndex(nextIdx);
        setNext(null);

        // One rAF to ensure the entering class paints before settling
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase("idle");
            lockRef.current = false;
          });
        });
      }, TRANSITION_MS);
    },
    [index],
  );

  // Auto-advance every 5 s
  useEffect(() => {
    dotInterval.current = setInterval(() => navigate(1), 5000);
    return () => clearInterval(dotInterval.current);
  }, [navigate]);

  const resetTimer = useCallback(
    (dir) => {
      clearInterval(dotInterval.current);
      navigate(dir);
      dotInterval.current = setInterval(() => navigate(1), 5000);
    },
    [navigate],
  );

  const current = TESTIMONIALS[index];

  // Derive class names
  const cardClass = [
    "testimonial-card",
    "testimonial-cinematic",
    phase === "exiting"
      ? direction === 1
        ? "tc-exit-left"
        : "tc-exit-right"
      : "",
    phase === "entering"
      ? direction === 1
        ? "tc-enter-right"
        : "tc-enter-left"
      : "",
    phase === "idle" ? "tc-settled" : "",
  ]
    .filter(Boolean)
    .join(" ");

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

        {/* Carousel */}
        <div className="testimonials-carousel tc-viewport" data-reveal="scale">
          {/* Glow backdrop */}
          <div className="tc-glow" aria-hidden="true" />

          <div className={cardClass} aria-live="polite">
            {/* Quote mark decoration */}
            <span className="tc-quote-mark" aria-hidden="true">
              "
            </span>

            <p className="testimonial-quote">"{current.quote}"</p>

            <div className="testimonial-author">
              <div className="testimonial-avatar tc-avatar">
                {current.avatar}
              </div>
              <div className="testimonial-info">
                <div className="testimonial-name">{current.author}</div>
                <div className="testimonial-role">{current.role}</div>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="tc-dots" role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}`}
                className={`tc-dot ${i === index ? "tc-dot--active" : ""}`}
                onClick={() => resetTimer(i > index ? 1 : -1)}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div
            className="carousel-controls"
            aria-label="Testimonial navigation"
          >
            <button
              aria-label="Previous testimonial"
              onClick={() => resetTimer(-1)}
              className="tc-nav-btn"
            >
              <ChevronLeftIcon size={20} aria-label="Previous" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => resetTimer(1)}
              className="tc-nav-btn"
            >
              <ChevronRightIcon size={20} aria-label="Next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
