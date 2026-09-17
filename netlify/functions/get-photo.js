"use strict";

const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const key = event.queryStringParameters && event.queryStringParameters.key;
  if (!key || !key.startsWith("photos/")) {
    return { statusCode: 400, body: "Bad key" };
  }

  const store = getStore("amino-chain");
  const blob = await store.get(key, { type: "arrayBuffer" });
  if (!blob) {
    return { statusCode: 404, body: "Not found" };
  }

  let contentType = "image/jpeg";
  try {
    const meta = await store.getMetadata(key);
    if (meta && meta.metadata && meta.metadata.contentType) {
      contentType = meta.metadata.contentType;
    }
  } catch (e) {
    // use default contentType
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
    body: Buffer.from(blob).toString("base64"),
    isBase64Encoded: true,
  };
};
