"use strict";

const crypto = require("crypto");
const { getStore } = require("@netlify/blobs");
const { isAuthed } = require("./utils/auth");

const MAX_BYTES = 5 * 1024 * 1024;

exports.handler = async (event) => {
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

  const { dataUrl, slug } = payload;
  if (!dataUrl || !slug) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing dataUrl or slug." }) };
  }

  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
  if (!match) {
    return { statusCode: 400, body: JSON.stringify({ error: "Expected a base64 image data URL." }) };
  }

  const contentType = match[1];
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > MAX_BYTES) {
    return { statusCode: 413, body: JSON.stringify({ error: "Image is larger than 5MB." }) };
  }

  const ext = contentType.split("/")[1].replace("jpeg", "jpg").replace(/[^a-z0-9]/gi, "");
  const safeSlug = String(slug).replace(/[^a-z0-9-]/gi, "");
  const key = `photos/${safeSlug}-${crypto.randomBytes(4).toString("hex")}.${ext}`;

  const store = getStore("amino-chain");
  await store.set(key, buffer, { metadata: { contentType } });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true, key, url: `/api/get-photo?key=${encodeURIComponent(key)}` }),
  };
};
