// src/data/pricingMatrix.js
// NEVER import this at App level. Only import inside Pricing.jsx.

export const PRICING_MATRIX = {
  tiers: {
    starter: {
      name: "Starter",
      description: "For solo builders and indie hackers",
      baseMonthlyUSD: 29,
      features: [
        "5 AI agents",
        "10,000 API calls/mo",
        "Basic analytics",
        "Email support",
        "Community access",
      ],
      highlighted: false,
      ctaLabel: "Start free trial",
    },
    pro: {
      name: "Pro",
      description: "For growing teams shipping fast",
      baseMonthlyUSD: 79,
      features: [
        "25 AI agents",
        "100,000 API calls/mo",
        "Advanced analytics",
        "Priority support",
        "Custom workflows",
        "Team collaboration",
      ],
      highlighted: true,      // Forsythia gradient border
      badge: "Most Popular",
      ctaLabel: "Start free trial",
    },
    enterprise: {
      name: "Enterprise",
      description: "For organizations at scale",
      baseMonthlyUSD: 199,
      features: [
        "Unlimited agents",
        "Unlimited API calls",
        "Enterprise analytics",
        "Dedicated support",
        "SSO & RBAC",
        "SLA guarantee",
        "Custom contracts",
      ],
      highlighted: false,
      ctaLabel: "Talk to sales",
    },
  },
  billingMultipliers: {
    monthly: 1.0,
    annual:  0.8,    // Exactly 20% discount — required by spec
  },
  currencyConfig: {
    USD: { symbol: "$",  rate: 1.0,   locale: "en-US" },
    INR: { symbol: "\u20B9",  rate: 83.5,  locale: "en-IN" },
    EUR: { symbol: "\u20AC",  rate: 0.92,  locale: "de-DE" },
  },
};

// Pure function — no side effects, no React imports
export function computePrice(tierKey, billing, currency) {
  const tier    = PRICING_MATRIX.tiers[tierKey];
  const bMult   = PRICING_MATRIX.billingMultipliers[billing];
  const curr    = PRICING_MATRIX.currencyConfig[currency];
  const monthly = Math.round(tier.baseMonthlyUSD * bMult * curr.rate);
  const savings = billing === "annual"
    ? Math.round(tier.baseMonthlyUSD * 0.2 * 12 * curr.rate)
    : 0;
  return { amount: monthly, symbol: curr.symbol, savings };
}
