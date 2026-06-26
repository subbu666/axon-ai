// src/App.jsx
import { useScrollReveal } from './hooks/useScrollReveal';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Pricing from './components/sections/Pricing';
import SocialProof from './components/sections/SocialProof';
import CTA from './components/sections/CTA';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
