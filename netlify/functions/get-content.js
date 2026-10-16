"use strict";

const { getBlobStore } = require("./utils/blobs");
const { DEFAULT_CONTENT } = require("./content-data");

exports.handler = async () => {
  try {
    const store = getBlobStore();
    const data = await store.get("content", { type: "json" });
    if (data && typeof data === "object") {
      // Merge over the defaults so any new text blocks added to the site
      // later (new DEFAULT_CONTENT keys) still show up even if an older
      // save in Blobs doesn't have them yet.
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.assign({}, DEFAULT_CONTENT, data)),
      };
    }
  } catch (e) {
    // fall through to defaults below
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(DEFAULT_CONTENT),
  };
};
