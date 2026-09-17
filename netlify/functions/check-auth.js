"use strict";

const { isAuthed } = require("./utils/auth");

exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authed: isAuthed(event) }),
  };
};
