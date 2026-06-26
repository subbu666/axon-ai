// src/components/sections/Features.jsx
import { useState, useEffect, useCallback } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { FEATURES } from '../../data/featuresData';
import * as Icons from '../icons';
import { ChevronDownIcon, ChevronUpIcon, ChevronUpSolidIcon } from '../icons';

export default function Features() {
  const [activeIndex, setActiveIndexState] = useState(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const { setActiveIndex, onBreakpointTransition } = useBreakpoint();

  useEffect(() => {
    onBreakpointTransition((nowMobile, preservedIndex) => {
      setIsMobile(nowMobile);
      if (preservedIndex !== null) {
        setActiveIndexState(preservedIndex);
      }
    });
  }, [onBreakpointTransition]);

  const handleCardActivate = useCallback((idx) => {
    setActiveIndexState(idx);
    setActiveIndex(idx);
  }, [setActiveIndex]);

  const handleAccordionToggle = useCallback((idx) => {
    setActiveIndexState(prev => prev === idx ? null : idx);
    setActiveIndex(idx);
  }, [setActiveIndex]);

  if (!isMobile) {
    // DESKTOP: Bento Grid
    return (
      <section aria-label="features" id="features" className="features-section">
        <div className="section-container">
          <h2 className="features-title" data-reveal>Built for the Next Era</h2>
          <div className="bento-grid" role="list" data-reveal>
            {FEATURES.map((feature) => {
              const IconComponent = Icons[feature.icon];
              return (
                <article
                  key={feature.id}
                  className={`bento-card ${feature.gridClass} ${activeIndex === feature.id ? 'active' : ''}`}
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
        </div>
      </section>
    );
  }

  // MOBILE: Accordion — same data, same active index, different layout
  return (
    <section aria-label="features" id="features" className="features-section">
      <div className="section-container">
        <h2 className="features-title" data-reveal>Built for the Next Era</h2>
        <div className="accordion" role="list" data-reveal>
          {FEATURES.map((feature) => {
            const IconComponent = Icons[feature.icon];
            const isOpen = activeIndex === feature.id;
            return (
              <div key={feature.id} className={`accordion-item ${isOpen ? 'open' : ''}`} role="listitem">
                <button
                  className="accordion-trigger"
                  onClick={() => handleAccordionToggle(feature.id)}
                  aria-expanded={isOpen}
                  aria-controls={`feature-body-${feature.id}`}
                >
                  <span className="trigger-left">
                    <IconComponent size={20} aria-label="" className="trigger-icon" />
                    <span>{feature.title}</span>
                  </span>
                  {isOpen
                    ? <ChevronUpSolidIcon size={20} aria-label="Collapse section" className="chevron-icon" />
                    : <ChevronDownIcon size={20} aria-label="Expand section" className="chevron-icon" />
                  }
                </button>
                <div
                  id={`feature-body-${feature.id}`}
                  className={`accordion-body ${isOpen ? 'open' : ''}`}
                  role="region"
                  aria-label={feature.title}
                >
                  <p>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
