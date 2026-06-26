// src/components/sections/CTA.jsx
import { useState } from 'react';
import { LinkSolidIcon, ChevronRightIcon } from '../icons';

export default function CTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      alert(`Thanks for signing up with ${email}! This is a demo.`);
      setEmail('');
    }
  };

  return (
    <section aria-label="cta" id="cta" className="cta-section">
      <div className="cta-bg-decoration" aria-hidden="true">
        <LinkSolidIcon size={140} className="cta-bg-icon" aria-label="" />
      </div>

      <div className="section-container">
        <h2 data-reveal>Start automating in 5 minutes</h2>
        <p data-reveal>No credit card. No configuration hell. Just results.</p>

        <div className="cta-form-wrapper" data-reveal>
          <input
            type="email"
            placeholder="you@company.com"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-primary" onClick={handleSubmit}>
            Get early access
            <ChevronRightIcon size={18} aria-label="" />
          </button>
        </div>
      </div>
    </section>
  );
}
