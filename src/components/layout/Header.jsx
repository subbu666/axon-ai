// src/components/layout/Header.jsx
import { useState, useEffect, useRef } from "react";
import {
  SearchIcon,
  XMarkIcon,
  CogIcon,
  LinkSolidIcon,
  CubeIcon,
} from "../icons";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" },
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);

  return (
    <>
      <div
        ref={sentinelRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1px",
          pointerEvents: "none",
        }}
      />

      <header
        role="banner"
        className={`site-header ${scrolled ? "scrolled" : ""}`}
      >
        <div className="header-inner">
          <nav aria-label="Main navigation">
            <a href="#hero" className="brand" aria-label="Axon AI home">
              <CubeIcon size={22} aria-label="Axon AI logo" />
              <span>Axon AI</span>
            </a>

            <ul role="list" className="nav-links">
              <li>
                <a href="#features">
                  <CogIcon size={16} aria-label="" className="nav-icon" />
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#docs">
                  <LinkSolidIcon size={16} aria-label="" className="nav-icon" />
                  Docs
                </a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
            </ul>

            <div className="nav-actions">
              <button aria-label="Search" className="icon-btn">
                <SearchIcon size={20} aria-label="Open search" />
              </button>
              <ThemeToggle />
              <a href="#cta" className="btn-primary header-cta">
                Get Started
              </a>
            </div>

            {/* ── Hamburger ── */}
            <button
              className={`hamburger ${mobileNavOpen ? "open" : ""}`}
              aria-label={
                mobileNavOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={mobileNavOpen}
              onClick={toggleMobileNav}
            >
              {mobileNavOpen ? (
                <XMarkIcon size={24} aria-label="Close menu" />
              ) : (
                <span className="hamburger-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`mobile-nav-overlay ${mobileNavOpen ? "open" : ""}`}
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <div
        className={`mobile-nav ${mobileNavOpen ? "open" : ""}`}
        aria-hidden={!mobileNavOpen}
      >
        <button
          className="mobile-nav-close"
          onClick={() => setMobileNavOpen(false)}
          aria-label="Close navigation"
        >
          <XMarkIcon size={24} aria-label="Close menu" />
        </button>

        <ul className="mobile-nav-links">
          <li>
            <a href="#features" onClick={() => setMobileNavOpen(false)}>
              <CogIcon size={20} aria-label="" />
              Features
            </a>
          </li>
          <li>
            <a href="#pricing" onClick={() => setMobileNavOpen(false)}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#docs" onClick={() => setMobileNavOpen(false)}>
              <LinkSolidIcon size={20} aria-label="" />
              Docs
            </a>
          </li>
          <li>
            <a href="#blog" onClick={() => setMobileNavOpen(false)}>
              Blog
            </a>
          </li>
          <li>
            <a
              href="#cta"
              onClick={() => setMobileNavOpen(false)}
              className="btn-primary"
              style={{ marginTop: "1rem", display: "inline-block" }}
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
