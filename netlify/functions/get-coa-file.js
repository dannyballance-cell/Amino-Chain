"use strict";

const { getBlobStore } = require("./utils/blobs");

exports.handler = async (event) => {
  try {
    const key = event.queryStringParameters && event.queryStringParameters.key;
    if (!key || !key.startsWith("coas/")) {
      return { statusCode: 400, body: "Bad key" };
    }

    const store = getBlobStore();
    const blob = await store.get(key, { type: "arrayBuffer" });
    if (!blob) {
      return { statusCode: 404, body: "Not found" };
    }

    let contentType = "application/octet-stream";
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
  } catch (err) {
    return {
      statusCode: 500,
      body: "Storage error: " + (err && err.message ? err.message : String(err)),
    };
  }
};
