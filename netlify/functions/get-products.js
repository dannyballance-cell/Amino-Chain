"use strict";

const { getStore } = require("@netlify/blobs");
const { DEFAULT_PRODUCTS } = require("./products-data");

exports.handler = async () => {
  try {
    const store = getStore("amino-chain");
    const data = await store.get("products", { type: "json" });
    if (data && Array.isArray(data) && data.length) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    }
  } catch (e) {
    // fall through to defaults below
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(DEFAULT_PRODUCTS),
  };
};
