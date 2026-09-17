"use strict";

const { getBlobStore } = require("./utils/blobs");

exports.handler = async () => {
  try {
    const store = getBlobStore();
    const data = await store.get("coas", { type: "json" });
    if (data && Array.isArray(data)) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    }
  } catch (e) {
    // fall through to empty list below
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([]),
  };
};
