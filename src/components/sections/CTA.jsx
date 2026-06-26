// src/components/sections/CTA.jsx
import { useState, useCallback } from "react";
import { LinkSolidIcon, ChevronRightIcon } from "../icons";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const trimmed = email.trim();

      if (!trimmed) {
        setStatus("error");
        setErrorMsg("Please enter your email address.");
        return;
      }
      if (!EMAIL_REGEX.test(trimmed)) {
        setStatus("error");
        setErrorMsg("That email doesn't look right — double-check it.");
        return;
      }

      setStatus("success");
      setErrorMsg("");
    },
    [email],
  );

  const handleChange = useCallback(
    (e) => {
      setEmail(e.target.value);
      if (status !== "idle") {
        setStatus("idle");
        setErrorMsg("");
      }
    },
    [status],
  );

  return (
    <section aria-label="cta" id="cta" className="cta-section">
      <div className="cta-bg-decoration" aria-hidden="true">
        <LinkSolidIcon size={140} className="cta-bg-icon" aria-label="" />
      </div>

      <div className="section-container cta-content" data-reveal>
        <h2>Start automating in 5 minutes</h2>
        <p>No credit card. No configuration hell. Just results.</p>

        {status === "success" ? (
          <div className="cta-success" role="status" aria-live="polite">
            <span className="cta-success-text">
              Thanks for signing up <strong>{email}</strong>! This is a demo —
              no email was actually sent.
            </span>
          </div>
        ) : (
          <form className="cta-form-wrapper" onSubmit={handleSubmit} noValidate>
            {/* Wraps the whole input+button+error block */}
            <div className="cta-field-block">
              <div className="cta-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  aria-label="Email address"
                  aria-invalid={status === "error"}
                  aria-describedby={
                    status === "error" ? "cta-error" : undefined
                  }
                  required
                />
                <button type="submit" className="btn-primary">
                  Get early access
                  <ChevronRightIcon size={18} aria-label="" />
                </button>
              </div>
              {/* Error sits BELOW the row, always full-width, never pushes siblings */}
              {status === "error" && (
                <p id="cta-error" className="cta-error-text" role="alert">
                  {errorMsg}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
