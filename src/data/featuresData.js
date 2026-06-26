// src/data/featuresData.js
// Icon names match exactly the exported names from src/components/icons/index.jsx
// The Features component does: import * as Icons from '../icons'
// Then renders: const IconComponent = Icons[feature.icon]

export const FEATURES = [
  {
    id: 0,
    title: "Performance Analytics",
    description: "Real-time dashboards that surface actionable insights from every workflow run. Spot bottlenecks before they become outages.",
    icon: "ArrowTrendingUpIcon",
    gridClass: "col-span-2",
    accentColor: "var(--accent)",
  },
  {
    id: 1,
    title: "Predictive Analytics",
    description: "ML-powered forecasting that predicts workflow failures 6 hours in advance. Prevent issues, never just react to them.",
    icon: "ChartPieIcon",
    gridClass: "col-span-1",
    accentColor: "var(--accent-warm)",
  },
  {
    id: 2,
    title: "Workflow Config",
    description: "Visual configuration engine. Build complex multi-step automations without writing a single line of YAML.",
    icon: "CogIcon",
    gridClass: "col-span-1",
    accentColor: "var(--accent)",
  },
  {
    id: 3,
    title: "3D Canvas Mode",
    description: "Visualize your entire automation graph in an interactive 3D canvas. See dependencies, data flow, and failure paths spatially.",
    icon: "CubeIcon",
    gridClass: "col-span-1 row-span-2",
    accentColor: "var(--accent-warm)",
  },
  {
    id: 4,
    title: "API Integrations",
    description: "Connect to 500+ services with pre-built connectors. REST, GraphQL, WebSockets — all managed in one place.",
    icon: "LinkIcon",
    gridClass: "col-span-1",
    accentColor: "var(--accent)",
  },
  {
    id: 5,
    title: "Auto-Recovery",
    description: "Self-healing workflows that automatically retry, reroute, and recover from failures without manual intervention.",
    icon: "ArrowPathIcon",
    gridClass: "col-span-2",
    accentColor: "var(--accent-warm)",
  },
];

export const TESTIMONIALS = [
  {
    id: 0,
    quote: "Axon AI cut our manual operations by 94%. What used to take our team 8 hours now happens in minutes.",
    author: "Sarah Chen",
    role: "CTO at StreamFlow",
    avatar: "SC",
  },
  {
    id: 1,
    quote: "The auto-recovery feature alone has saved us over $200K in downtime costs this quarter. Absolute game changer.",
    author: "Marcus Rodriguez",
    role: "Head of DevOps at Nexus",
    avatar: "MR",
  },
  {
    id: 2,
    quote: "We went from 12 manual workflows to 47 fully automated in 3 weeks. The ROI was immediate and substantial.",
    author: "Priya Patel",
    role: "VP Engineering at DataSync",
    avatar: "PP",
  },
];
