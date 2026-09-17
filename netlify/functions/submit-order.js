"use strict";

const crypto = require("crypto");
const { getBlobStore } = require("./utils/blobs");

// Public endpoint — any visitor can submit a cart, so this only ever
// appends one well-formed order rather than trusting a full overwrite.
const MAX_ITEMS = 50;
const MAX_ORDERS_KEPT = 500;

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
    }

    let payload;
    try {
      payload = JSON.parse(event.body || "{}");
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ error: "Bad JSON body." }) };
    }

    const items = payload.items;
    if (!Array.isArray(items) || items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Cart is empty." }) };
    }
    if (items.length > MAX_ITEMS) {
      return { statusCode: 400, body: JSON.stringify({ error: "Too many items in one order." }) };
    }

    const cleanItems = items
      .map(function (item) {
        return {
          slug: String((item && item.slug) || "").slice(0, 100),
          name: String((item && item.name) || "").slice(0, 200),
          dose: String((item && item.dose) || "").slice(0, 100),
          qty: Math.max(1, Math.min(99, Math.round(Number(item && item.qty) || 1))),
        };
      })
      .filter(function (item) {
        return item.name;
      });

    if (cleanItems.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Cart is empty." }) };
    }

    const order = {
      id: Date.now().toString(36) + crypto.randomBytes(4).toString("hex"),
      items: cleanItems,
      submittedAt: Date.now(),
    };

    try {
      const store = getBlobStore();
      const existing = await store.get("orders", { type: "json" });
      let orders = Array.isArray(existing) ? existing : [];
      orders.push(order);
      if (orders.length > MAX_ORDERS_KEPT) {
        orders = orders.slice(orders.length - MAX_ORDERS_KEPT);
      }
      await store.setJSON("orders", orders);
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
