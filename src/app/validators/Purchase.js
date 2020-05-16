const { body } = require("express-validator");

module.exports = [
  body("ad").isString().exists(),
  body("content").isString().exists(),
];
