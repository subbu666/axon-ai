// src/components/sections/SocialProof.jsx
import { useState, useCallback } from 'react';
import { TESTIMONIALS } from '../../data/featuresData';
import { ArrowTrendingUpIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  }, []);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  }, []);

  const current = TESTIMONIALS[currentTestimonial];

  return (
    <section aria-label="social proof" id="social-proof" className="social-proof-section">
      <div className="section-container">
        <h2 className="social-proof-title" data-reveal>Trusted by Teams</h2>

        <div className="metrics-row" data-reveal>
          <div className="metric">
            <div className="metric-icon">
              <ArrowTrendingUpIcon size={24} aria-label="Growth metric" />
            </div>
            <span className="stat-number">10M+</span>
            <span className="stat-label">Tasks Automated</span>
          </div>
          <div className="metric">
            <span className="stat-number">99.99%</span>
            <span className="stat-label">Uptime SLA</span>
          </div>
          <div className="metric">
            <span className="stat-number">500ms</span>
            <span className="stat-label">Avg Response</span>
          </div>
        </div>

        <div className="testimonials-carousel" data-reveal>
          <div className="testimonial-card">
            <p className="testimonial-quote">"{current.quote}"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{current.avatar}</div>
              <div className="testimonial-info">
                <div className="testimonial-name">{current.author}</div>
                <div className="testimonial-role">{current.role}</div>
              </div>
            </div>
          </div>

          <div className="carousel-controls" aria-label="Testimonial navigation">
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
