"use strict";

const crypto = require("crypto");
const { getBlobStore } = require("./utils/blobs");
const { isAuthed } = require("./utils/auth");

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = /^(application\/pdf|image\/[a-zA-Z0-9.+-]+)$/;

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
    }
    if (!isAuthed(event)) {
      return { statusCode: 401, body: JSON.stringify({ error: "Not signed in." }) };
    }

    let payload;
    try {
      payload = JSON.parse(event.body || "{}");
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ error: "Bad JSON body." }) };
    }

    const { dataUrl } = payload;
    if (!dataUrl) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing dataUrl." }) };
    }

    const match = /^data:([a-zA-Z0-9.+/-]+);base64,(.+)$/.exec(dataUrl);
    if (!match || !ALLOWED.test(match[1])) {
      return { statusCode: 400, body: JSON.stringify({ error: "Expected a PDF or image file." }) };
    }

    const contentType = match[1];
    const buffer = Buffer.from(match[2], "base64");
    if (buffer.length > MAX_BYTES) {
      return { statusCode: 413, body: JSON.stringify({ error: "File is larger than 8MB." }) };
    }

    const isPdf = contentType === "application/pdf";
    const ext = isPdf ? "pdf" : contentType.split("/")[1].replace("jpeg", "jpg").replace(/[^a-z0-9]/gi, "");
    const key = `coas/${crypto.randomBytes(6).toString("hex")}.${ext}`;

    try {
      const store = getBlobStore();
      await store.set(key, buffer, { metadata: { contentType } });
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
      body: JSON.stringify({
        ok: true,
        key,
        url: `/api/get-coa-file?key=${encodeURIComponent(key)}`,
        fileType: isPdf ? "pdf" : "image",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unexpected error: " + (err && err.message ? err.message : String(err)) }),
    };
  }
};
