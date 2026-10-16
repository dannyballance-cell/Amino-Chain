"use strict";

const { getBlobStore } = require("./utils/blobs");
const { isAuthed } = require("./utils/auth");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
    }
    if (!isAuthed(event)) {
      return { statusCode: 401, body: JSON.stringify({ error: "Not signed in." }) };
    }

    let content;
    try {
      content = JSON.parse(event.body || "{}");
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ error: "Bad JSON body." }) };
    }
    if (!content || typeof content !== "object" || Array.isArray(content)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Expected a content object." }) };
    }

    try {
      const store = getBlobStore();
      await store.setJSON("content", content);
    } catch (err) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Storage error: " + (err && err.message ? err.message : String(err)) }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unexpected error: " + (err && err.message ? err.message : String(err)) }),
    };
  }
};
