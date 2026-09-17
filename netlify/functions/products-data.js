"use strict";

// Shared default catalog — used to seed the site the first time it runs
// (before any admin save has written real data to Netlify Blobs).
const DEFAULT_PRODUCTS = [
  { slug: "vitamin-d3", name: "Vitamin D3", benefit: "Supports bone health, immune function, and calcium absorption.", dose: "2000 IU · softgel", category: "vitamins", status: "in-stock", photo: null, removed: false },
  { slug: "vitamin-c", name: "Vitamin C", benefit: "An antioxidant that supports immune function and collagen production.", dose: "500 mg · capsule", category: "vitamins", status: "in-stock", photo: null, removed: false },
  { slug: "vitamin-b12", name: "Vitamin B12", benefit: "Supports energy metabolism and nervous system function.", dose: "1000 mcg · capsule", category: "vitamins", status: "in-stock", photo: null, removed: false },
  { slug: "vitamin-b6", name: "Vitamin B6", benefit: "Supports protein metabolism and red blood cell formation.", dose: "25 mg · capsule", category: "vitamins", status: "in-stock", photo: null, removed: false },
  { slug: "folate-b9", name: "Folate (B9)", benefit: "Supports cell division and red blood cell formation.", dose: "400 mcg DFE · capsule", category: "vitamins", status: "in-stock", photo: null, removed: false },
  { slug: "vitamin-e", name: "Vitamin E", benefit: "An antioxidant that helps protect cells from oxidative stress.", dose: "268 mg · softgel", category: "vitamins", status: "coming-soon", photo: null, removed: false },
  { slug: "vitamin-k2", name: "Vitamin K2", benefit: "Supports calcium regulation and bone health, pairs with D3.", dose: "100 mcg · capsule", category: "vitamins", status: "coming-soon", photo: null, removed: false },
  { slug: "magnesium", name: "Magnesium", benefit: "Supports muscle function, energy production, and healthy sleep.", dose: "200 mg · capsule", category: "minerals", status: "coming-soon", photo: null, removed: false },
  { slug: "zinc", name: "Zinc", benefit: "Supports immune function and protein synthesis.", dose: "15 mg · capsule", category: "minerals", status: "coming-soon", photo: null, removed: false },
  { slug: "calcium", name: "Calcium", benefit: "Supports bone density and muscle contraction.", dose: "500 mg · capsule", category: "minerals", status: "coming-soon", photo: null, removed: false },
  { slug: "iron", name: "Iron", benefit: "Supports oxygen transport and red blood cell production.", dose: "18 mg · capsule", category: "minerals", status: "coming-soon", photo: null, removed: false },
  { slug: "selenium", name: "Selenium", benefit: "An antioxidant mineral that supports thyroid function.", dose: "55 mcg · capsule", category: "minerals", status: "coming-soon", photo: null, removed: false },
  { slug: "iodine", name: "Iodine", benefit: "Supports healthy thyroid hormone production.", dose: "150 mcg · capsule", category: "minerals", status: "in-stock", photo: null, removed: false },
  { slug: "creatine-monohydrate", name: "Creatine Monohydrate", benefit: "Supports strength, power output, and training recovery.", dose: "5 g · powder", category: "performance-aminos", status: "coming-soon", photo: null, removed: false },
  { slug: "coenzyme-q10", name: "Coenzyme Q10", benefit: "Supports cellular energy production and heart health.", dose: "100 mg · softgel", category: "performance-aminos", status: "coming-soon", photo: null, removed: false },
  { slug: "l-carnitine", name: "L-Carnitine", benefit: "Supports fatty acid metabolism and exercise recovery.", dose: "1000 mg · capsule", category: "performance-aminos", status: "coming-soon", photo: null, removed: false },
  { slug: "l-glutamine", name: "L-Glutamine", benefit: "Supports muscle recovery and gut lining integrity.", dose: "5 g · powder", category: "performance-aminos", status: "coming-soon", photo: null, removed: false },
  { slug: "l-arginine", name: "L-Arginine", benefit: "Supports healthy blood flow and nitric oxide production.", dose: "1000 mg · capsule", category: "performance-aminos", status: "coming-soon", photo: null, removed: false },
  { slug: "glycine", name: "Glycine", benefit: "Supports collagen synthesis and restful sleep.", dose: "3 g · powder", category: "performance-aminos", status: "coming-soon", photo: null, removed: false },
  { slug: "nac", name: "N-Acetyl-L-Cysteine", benefit: "Supports glutathione production and antioxidant defense.", dose: "600 mg · capsule", category: "performance-aminos", status: "coming-soon", photo: null, removed: false },
  { slug: "omega-3-fish-oil", name: "Omega-3 Fish Oil", benefit: "Supports heart, brain, and joint health.", dose: "1000 mg · softgel", category: "botanicals", status: "coming-soon", photo: null, removed: false },
  { slug: "curcumin", name: "Curcumin", benefit: "Supports a healthy inflammatory response.", dose: "500 mg · capsule", category: "botanicals", status: "coming-soon", photo: null, removed: false },
  { slug: "ashwagandha", name: "Ashwagandha", benefit: "Supports stress resilience and healthy cortisol balance.", dose: "600 mg · capsule", category: "botanicals", status: "coming-soon", photo: null, removed: false },
  { slug: "ginger-extract", name: "Ginger Extract", benefit: "Supports digestive comfort.", dose: "250 mg · capsule", category: "botanicals", status: "coming-soon", photo: null, removed: false },
  { slug: "probiotic", name: "Probiotic", benefit: "Supports gut microbiome balance and digestive health.", dose: "10B CFU · capsule", category: "botanicals", status: "coming-soon", photo: null, removed: false },
];

module.exports = { DEFAULT_PRODUCTS };
