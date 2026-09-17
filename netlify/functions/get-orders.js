"use strict";

const { getBlobStore } = require("./utils/blobs");
const { isAuthed } = require("./utils/auth");

exports.handler = async (event) => {
  try {
    if (!isAuthed(event)) {
      return { statusCode: 401, body: JSON.stringify({ error: "Not signed in." }) };
    }

    const store = getBlobStore();
    const data = await store.get("orders", { type: "json" });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Array.isArray(data) ? data : []),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Storage error: " + (err && err.message ? err.message : String(err)) }),
    };
  }
};
