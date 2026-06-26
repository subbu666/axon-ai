// src/components/sections/Hero.jsx
import { useEffect, useRef } from "react";
import { CubeIcon, ArrowPathIcon, ChevronRightIcon } from "../icons";

/* ── Particle canvas ── */
function useParticleCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W, H;

    const isDark = () =>
      document.documentElement.getAttribute("data-theme") !== "light";

    // Dots
    const COUNT = window.innerWidth < 640 ? 40 : 80;
    const dots = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.5 + 0.5,
    }));

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const dark = isDark();
      const dotColor = dark ? "rgba(255,200,1,0.55)" : "rgba(255,153,50,0.5)";
      const lineColor = dark ? "rgba(255,200,1," : "rgba(255,153,50,";

      // Move
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = 1;
        if (d.x > 1) d.x = 0;
        if (d.y < 0) d.y = 1;
        if (d.y > 1) d.y = 0;
      });

      // Lines between close dots
      const LINK = 0.18;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK) {
            const alpha = (1 - dist / LINK) * 0.18;
            ctx.beginPath();
            ctx.moveTo(dots[i].x * W, dots[i].y * H);
            ctx.lineTo(dots[j].x * W, dots[j].y * H);
            ctx.strokeStyle = lineColor + alpha + ")";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Dots
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
}

/* ── Cursor orb ── */
function useCursorOrb(orbRef) {
  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      orb.style.display = "none";
      return;
    }
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx,
      ty = cy;
    let raf;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    function tick() {
      // Smooth lerp
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      orb.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export default function Hero() {
  const canvasRef = useRef(null);
  const orbRef = useRef(null);
  useParticleCanvas(canvasRef);
  useCursorOrb(orbRef);

  return (
    <>
      {/* Cursor orb — fixed, outside section so it works globally */}
      <div ref={orbRef} className="cursor-orb" aria-hidden="true" />

      <section aria-label="hero" id="hero" className="hero-section">
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="hero-canvas"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* Ambient floating icons */}
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
                style={{ animationDelay: `${i * 90}ms` }}
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          <p className="hero-sub">
            Axon AI orchestrates your workflows with intelligent agents. Cut
            manual operations by 90% from day one.
          </p>

          <div className="hero-ctas">
            <a href="#cta" className="btn-primary">
              Start for free
              <ChevronRightIcon size={18} aria-label="" />
            </a>
            <a href="#features" className="btn-ghost">
              See how it works
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
