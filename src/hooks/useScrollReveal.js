// src/hooks/useScrollReveal.js
import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    // ── 1. Main reveal: [data-reveal] and [data-reveal-stagger] ──
    const revealIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );

    document
      .querySelectorAll(
        '[data-reveal], [data-reveal="left"], [data-reveal="scale"], [data-reveal-stagger]',
      )
      .forEach((el) => revealIo.observe(el));

    // ── 2. Section title underline: .section-title-line ──
    const titleIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            titleIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    document
      .querySelectorAll(".section-title-line")
      .forEach((el) => titleIo.observe(el));

    // ── 3. Animated counters: [data-count] ──
    const counterIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || "";
          const prefix = el.dataset.prefix || "";
          const duration = 1600;
          const startTime = performance.now();
          const isFloat = String(target).includes(".");
          const decimals = isFloat
            ? (String(target).split(".")[1] || "").length
            : 0;

          el.classList.add("counting");

          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent =
              prefix +
              (isFloat ? current.toFixed(decimals) : Math.floor(current)) +
              suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          counterIo.unobserve(el);
        });
      },
      { threshold: 0.4 },
    );

    document
      .querySelectorAll("[data-count]")
      .forEach((el) => counterIo.observe(el));

    // ── 4. Metric icon reveal: .metric ──
    const metricIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            metricIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    document.querySelectorAll(".metric").forEach((el) => metricIo.observe(el));

    return () => {
      revealIo.disconnect();
      titleIo.disconnect();
      counterIo.disconnect();
      metricIo.disconnect();
    };
  }, []);
}
