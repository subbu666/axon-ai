// src/components/layout/Footer.jsx
import { LinkIcon, LinkSolidIcon, ChevronUpIcon } from "../icons";

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="brand">Axon AI</span>
          <p>Intelligent workflow automation for the next era.</p>
        </div>
        <nav aria-label="Product links">
          <h4>Product</h4>
          <ul role="list">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a
                href="https://github.com/subbu666/axon-ai/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs <LinkIcon size={14} aria-label="Opens in new tab" />
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Company links">
          <h4>Company</h4>
          <ul role="list">
            <li>
              <a
                href="https://github.com/subbu666/axon-ai/blob/main/README.md"
                target="_blank"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://github.com/subbu666/axon-ai/blob/main/README.md"
                target="_blank"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="https://github.com/subbu666/axon-ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <LinkIcon size={14} aria-label="Opens in new tab" />
              </a>
            </li>
          </ul>
        </nav>
        <div className="footer-social">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#twitter" aria-label="Twitter">
              <LinkSolidIcon size={18} aria-label="Twitter profile" />
            </a>
            <a
              href="https://www.linkedin.com/in/saladi-subrahmanyam/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <LinkSolidIcon size={18} aria-label="LinkedIn profile" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Axon AI. All rights reserved.</p>
        <nav aria-label="Legal">
          <a
            href="https://github.com/subbu666/axon-ai/blob/main/README.md"
            target="_blank"
          >
            Privacy
          </a>
          <a
            href="https://github.com/subbu666/axon-ai/blob/main/README.md"
            target="_blank"
          >
            Terms
          </a>
        </nav>
        <button
          className="scroll-top-btn"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUpIcon size={20} aria-label="Back to top" />
        </button>
      </div>
    </footer>
  );
}
