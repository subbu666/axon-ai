// src/components/sections/Hero.jsx
import { CubeIcon, ArrowPathIcon, ChevronRightIcon } from '../icons';

export default function Hero() {
  return (
    <section aria-label="hero" id="hero" className="hero-section">
      <div className="hero-bg" aria-hidden="true">
        <CubeIcon size={180} className="bg-cube" aria-label="" />
        <ArrowPathIcon size={120} className="bg-arrow" aria-label="" />
      </div>

      <div className="hero-content" data-reveal>
        <span className="eyebrow">Next-Gen AI Platform</span>
        <h1 className="hero-title">
          {["Automate", "Everything.", "Ship", "Faster."].map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <p className="hero-sub">
          Axon AI orchestrates your workflows with intelligent agents.
          Cut manual operations by 90% from day one.
        </p>
        <div className="hero-ctas">
          <a href="#cta" className="btn-primary">
            Start for free
            <ChevronRightIcon size={18} aria-label="" />
          </a>
          <a href="#features" className="btn-ghost">See how it works</a>
        </div>
      </div>
    </section>
  );
}
