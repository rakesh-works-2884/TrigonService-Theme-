export type PricingPlan = {
  slug: string;
  name: string;
  startingPrice: string;
  billingNote: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    slug: "starter",
    name: "Starter",
    startingPrice: "₹1,499*",
    billingNote: "one-time, per filing",
    features: [
      "Single registration or filing (e.g. GST, MSME, Trademark search)",
      "Document collection & preparation",
      "Application filing & tracking",
      "Email & WhatsApp support",
    ],
  },
  {
    slug: "growth",
    name: "Growth",
    startingPrice: "₹7,999*",
    billingNote: "per month, billed quarterly",
    features: [
      "Everything in Starter",
      "Monthly GST & tax return filing",
      "Payroll & labour law compliance",
      "Dedicated compliance manager",
      "Priority turnaround",
    ],
    highlighted: true,
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    startingPrice: "Custom",
    billingNote: "tailored to scope",
    features: [
      "Everything in Growth",
      "Multi-state / multi-entity compliance",
      "Corporate governance & ROC management",
      "International business & FEMA compliance",
      "Quarterly compliance audit & reporting",
    ],
  },
];
