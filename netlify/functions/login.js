"use strict";

const { makeSessionCookie } = require("./utils/auth");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Bad request" }) };
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Admin password isn't configured yet. Set ADMIN_PASSWORD in Netlify's environment variables." }),
    };
  }

  if (body.password !== expected) {
    return { statusCode: 401, body: JSON.stringify({ error: "Incorrect password." }) };
  }

  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": makeSessionCookie(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ok: true }),
  };
};
