// src/components/sections/Features.jsx
import { useState, useEffect, useCallback } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { FEATURES } from "../../data/featuresData";
import * as Icons from "../icons";
import { ChevronDownIcon, ChevronUpSolidIcon } from "../icons";

export default function Features() {
  const [activeIndex, setActiveIndexState] = useState(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const { setActiveIndex, onBreakpointTransition } = useBreakpoint();

  // Register the context-lock callback — fires once when the breakpoint
  // is crossed in either direction, carrying over whichever index was
  // last active so the corresponding panel opens on the other layout.
  useEffect(() => {
    onBreakpointTransition((nowMobile, preservedIndex) => {
      setIsMobile(nowMobile);
      if (preservedIndex !== null) {
        setActiveIndexState(preservedIndex);
      }
    });
  }, [onBreakpointTransition]);

  const handleCardActivate = useCallback(
    (idx) => {
      setActiveIndexState(idx);
      setActiveIndex(idx);
    },
    [setActiveIndex],
  );

  const handleAccordionToggle = useCallback(
    (idx) => {
      setActiveIndexState((prev) => (prev === idx ? null : idx));
      setActiveIndex(idx);
    },
    [setActiveIndex],
  );

  return (
    <section aria-label="features" id="features" className="features-section">
      <div className="section-container">
        <h2 className="features-title" data-reveal>
          Built for the Next Era
        </h2>

        {/*
          IMPORTANT: this wrapper's className is a fixed string — it
          never changes between mobile and desktop. data-reveal lives
          here, not on the bento-grid/accordion div, because those two
          have different classNames depending on isMobile. If
          data-reveal sat on a node whose className changes, React
          would overwrite the 'revealed' class that the
          IntersectionObserver added (since the observer mutates the
          DOM directly, outside React's diffing) every time the
          breakpoint flips — which is exactly what was causing the
          section to vanish on resize. Keeping it on a stable wrapper
          means React never touches this element's className attribute,
          so 'revealed' persists across the bento <-> accordion swap.
        */}
        <div className="features-reveal-wrapper" data-reveal>
          {!isMobile ? (
            <div className="bento-grid" role="list">
              {FEATURES.map((feature) => {
                const IconComponent = Icons[feature.icon];
                return (
                  <article
                    key={feature.id}
                    className={`bento-card ${feature.gridClass} ${
                      activeIndex === feature.id ? "active" : ""
                    }`}
                    role="listitem"
                    onMouseEnter={() => handleCardActivate(feature.id)}
                    onFocus={() => handleCardActivate(feature.id)}
                    tabIndex={0}
                    aria-label={feature.title}
                  >
                    <IconComponent
                      size={32}
                      aria-label={feature.title}
                      className="bento-icon"
                    />
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="accordion" role="list">
              {FEATURES.map((feature) => {
                const IconComponent = Icons[feature.icon];
                const isOpen = activeIndex === feature.id;
                return (
                  <div
                    key={feature.id}
                    className={`accordion-item ${isOpen ? "open" : ""}`}
                    role="listitem"
                  >
                    <button
                      className="accordion-trigger"
                      onClick={() => handleAccordionToggle(feature.id)}
                      aria-expanded={isOpen}
                      aria-controls={`feature-body-${feature.id}`}
                    >
                      <span className="trigger-left">
                        <IconComponent
                          size={20}
                          aria-label=""
                          className="trigger-icon"
                        />
                        <span>{feature.title}</span>
                      </span>
                      {isOpen ? (
                        <ChevronUpSolidIcon
                          size={20}
                          aria-label="Collapse section"
                          className="chevron-icon"
                        />
                      ) : (
                        <ChevronDownIcon
                          size={20}
                          aria-label="Expand section"
                          className="chevron-icon"
                        />
                      )}
                    </button>
                    <div
                      id={`feature-body-${feature.id}`}
                      className={`accordion-body ${isOpen ? "open" : ""}`}
                      role="region"
                      aria-label={feature.title}
                    >
                      <p>{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
