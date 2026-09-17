"use strict";

const { getStore } = require("@netlify/blobs");

// Netlify is supposed to auto-inject Blobs credentials into every function
// invocation with no config needed. On some sites/plans that automatic
// wiring doesn't kick in, and getStore("amino-chain") throws
// "environment has not been configured to use Netlify Blobs". When that
// happens we fall back to explicit credentials: SITE_ID is provided
// automatically by Netlify at runtime, and BLOBS_TOKEN is a personal
// access token you create and set yourself (see README).
function getBlobStore() {
  const siteID = process.env.SITE_ID || process.env.NETLIFY_SITE_ID;
  const token = process.env.BLOBS_TOKEN || process.env.NETLIFY_BLOBS_TOKEN;

  if (siteID && token) {
    return getStore({ name: "amino-chain", siteID, token });
  }

  // Try the automatic/zero-config path in case it works after all.
  return getStore("amino-chain");
}

module.exports = { getBlobStore };
