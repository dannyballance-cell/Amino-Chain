"use strict";

const crypto = require("crypto");

const SESSION_HOURS = 12;

function getSecret() {
  // Falls back to ADMIN_PASSWORD if SESSION_SECRET isn't set, so this works
  // even with only one env var configured — but setting SESSION_SECRET
  // separately is stronger and recommended.
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "amino-chain-fallback-secret";
}

function sign(value) {
  const hmac = crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
  return `${value}.${hmac}`;
}

function verify(token) {
  if (!token) return false;
  const idx = token.lastIndexOf(".");
  if (idx === -1) return false;
  const value = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
  const sigBuf = Buffer.from(sig, "hex");
  const expectedBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  const parts = value.split(":");
  const expiry = parseInt(parts[1], 10);
  if (!expiry || Date.now() > expiry) return false;
  return true;
}

function makeSessionCookie() {
  const expiry = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const token = sign(`session:${expiry}`);
  return `ac_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 60 * 60}`;
}

function clearSessionCookie() {
  return "ac_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
}

function parseCookies(header) {
  const out = {};
  (header || "").split(";").forEach((pair) => {
    const idx = pair.indexOf("=");
    if (idx === -1) return;
    const k = pair.slice(0, idx).trim();
    const v = pair.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  });
  return out;
}

function isAuthed(event) {
  const cookies = parseCookies(event.headers && (event.headers.cookie || event.headers.Cookie));
  return verify(cookies.ac_admin);
}

module.exports = { sign, verify, makeSessionCookie, clearSessionCookie, parseCookies, isAuthed };
