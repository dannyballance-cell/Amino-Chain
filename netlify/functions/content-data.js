"use strict";

// Default site copy — every bit of editable text on the page (headings,
// paragraphs, button labels, footer text, FAQ, etc.), keyed by a short
// dotted name. Used to seed the site the first time it runs, before any
// admin save has written real data to Netlify Blobs. The admin panel lets
// you click into any of this text directly on the live page and edit it —
// the keys below just need to match the `data-ck` attributes in index.html.
const DEFAULT_CONTENT = {
  "brand.name": "AMINO CHAIN",
  "link.catalog": "Catalog",
  "link.faq": "FAQ",
  "nav.ctaText": "See Products",

  "hero.titleMain": "Amino Chain",
  "hero.titleAccent": "Performance",
  "hero.subtitle": "Rebuild · Restore · Outperform",
  "hero.ctaText": "See the Products",

  "pillars.rebuild.heading": "Rebuild",
  "pillars.rebuild.text": "Amino acid formulas built to support muscle repair after the sessions that actually break you down.",
  "pillars.restore.heading": "Restore",
  "pillars.restore.text": "Recovery support aimed at the cellular level, replenishing what a hard training block quietly drains.",
  "pillars.outperform.heading": "Outperform",
  "pillars.outperform.text": "Engineered so recovery stops being the bottleneck between today's session and tomorrow's best.",

  "catalog.heading": "What we're launching with.",
  "catalog.intro": "Every active going into the Performance, Recovery & Restore, and Skincare lines, organized by category. Doses shown are standard starting formulations — final label values are confirmed during testing.",
  "catalog.productsLabel": "Products",

  "coas.eyebrow": "Lab Results",
  "coas.heading": "Certificates of Analysis",
  "coas.intro": "Independent third-party testing for every lot, published here as soon as it's available.",
  "coas.emptyText": "No certificates published yet — check back once testing is complete.",

  "results.heading": "Real feedback, coming soon.",
  "results.intro": "We'll feature genuine tester quotes here once Vibrant Heat ships. The cards below are placeholders — swap them for real testimonials when you have them.",
  "results.card1.flag": "Placeholder",
  "results.card1.quote": "Add a real customer quote here once early testers have tried the product.",
  "results.card1.name": "[Name], [Role]",
  "results.card2.flag": "Placeholder",
  "results.card2.quote": "Add a real customer quote here once early testers have tried the product.",
  "results.card2.name": "[Name], [Role]",
  "results.card3.flag": "Placeholder",
  "results.card3.quote": "Add a real customer quote here once early testers have tried the product.",
  "results.card3.name": "[Name], [Role]",

  "faq.heading": "Questions, answered",
  "faq.q1": "What makes the Vibrant Heat Series different?",
  "faq.a1": "Every formula is built around complete amino acid chains and a heat-activated delivery system, with full-transparency labels and no proprietary blends across Performance, Recovery & Restore, and Skincare.",
  "faq.q2": "Will you publish lab results?",
  "faq.a2": "Yes — every lot, across every line, will ship with a public certificate of analysis from an independent third-party lab.",
  "faq.q3": "When does the Vibrant Heat Series launch?",
  "faq.a3": "We're finalizing formulation and testing now — check back here for updates as products come online.",

  "footer.tagline": "Rebuild. Restore. Outperform. Chain-verified amino formulas for performance, recovery, and skincare.",
  "footer.productsHeading": "Products",
  "footer.companyHeading": "Company",
  "footer.supportHeading": "Support",
  "footer.coasLink": "Certificates of Analysis",
  "footer.contactLink": "Contact",
  "footer.copyright": "© 2026 Amino Chain Performance. All rights reserved.",
  "footer.seriesTag": "Vibrant Heat Series",
  "footer.disclaimer": "These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.",
};

module.exports = { DEFAULT_CONTENT };
