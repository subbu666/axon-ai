// src/components/sections/Pricing.jsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { PRICING_MATRIX, computePrice } from '../../data/pricingMatrix';
import { ChartPieIcon, ChevronRightIcon } from '../icons';

const TIER_KEYS = Object.keys(PRICING_MATRIX.tiers);

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');
  const [currency, setCurrency] = useState('USD');

  // One ref per tier price display — direct DOM mutation, zero reconciler involvement
  const priceRefs   = useRef({});
  const savingsRefs = useRef({});
  const symbolRefs  = useRef({});

  const updatePriceNodes = useCallback((newBilling, newCurrency) => {
    TIER_KEYS.forEach(key => {
      const result = computePrice(key, newBilling, newCurrency);
      if (priceRefs.current[key])   priceRefs.current[key].textContent   = result.amount;
      if (symbolRefs.current[key])  symbolRefs.current[key].textContent  = result.symbol;
      if (savingsRefs.current[key]) {
        savingsRefs.current[key].textContent = result.savings > 0
          ? `Save ${result.symbol}${result.savings}/yr`
          : '';
      }
    });
  }, []);

  useEffect(() => { updatePriceNodes(billing, currency); }, [billing, currency, updatePriceNodes]);

  const handleBillingChange = useCallback((newBilling) => {
    setBilling(newBilling);
    updatePriceNodes(newBilling, currency);
  }, [currency, updatePriceNodes]);

  const handleCurrencyChange = useCallback((e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    updatePriceNodes(billing, newCurrency);
  }, [billing, updatePriceNodes]);

  return (
    <section aria-label="pricing" id="pricing" className="pricing-section">
      <div className="pricing-header-decoration" aria-hidden="true">
        <ChartPieIcon size={48} className="pricing-pie-icon" />
      </div>

      <div className="section-container">
        <h2 className="pricing-title" data-reveal>Simple Pricing</h2>
        <p className="pricing-subtitle" data-reveal>
          Start free, upgrade when you're ready. No hidden fees, no surprises.
        </p>

        <div className="billing-toggle" role="group" aria-label="Billing cycle">
          <button
            className={`toggle-option ${billing === 'monthly' ? 'active' : ''}`}
            onClick={() => handleBillingChange('monthly')}
            aria-pressed={billing === 'monthly'}
          >
            Monthly
          </button>
          <button
            className={`toggle-option ${billing === 'annual' ? 'active' : ''}`}
            onClick={() => handleBillingChange('annual')}
            aria-pressed={billing === 'annual'}
          >
            Annual <span className="save-badge">-20%</span>
          </button>
        </div>

        <select
          className="currency-select"
          value={currency}
          onChange={handleCurrencyChange}
          aria-label="Select currency"
        >
          <option value="USD">$ USD</option>
          <option value="INR">₹ INR</option>
          <option value="EUR">€ EUR</option>
        </select>

        <div className="pricing-grid" data-reveal>
          {TIER_KEYS.map(key => {
            const tier    = PRICING_MATRIX.tiers[key];
            const initial = computePrice(key, 'monthly', 'USD');
            return (
              <article
                key={key}
                className={`pricing-card ${tier.highlighted ? 'highlighted' : ''}`}
                aria-label={`${tier.name} plan`}
              >
                {tier.badge && <span className="popular-badge">{tier.badge}</span>}
                <h3>{tier.name}</h3>
                <p className="tier-desc">{tier.description}</p>
                <div className="price-display" aria-live="polite" aria-label="Price">
                  <span ref={el => symbolRefs.current[key] = el} className="price-symbol">
                    {initial.symbol}
                  </span>
                  <span ref={el => priceRefs.current[key] = el} className="price-amount">
                    {initial.amount}
                  </span>
                  <span className="price-period">/mo</span>
                </div>
                <span
                  ref={el => savingsRefs.current[key] = el}
                  className="savings-label"
                  aria-live="polite"
                />
                <ul className="features-list" role="list">
                  {tier.features.map((f, i) => (
                    <li key={i}>
                      <ChevronRightIcon size={16} aria-label="" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`tier-cta ${tier.highlighted ? 'cta-primary' : 'cta-secondary'}`}>
                  {tier.ctaLabel}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
