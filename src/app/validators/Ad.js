const { body } = require("express-validator");

module.exports = [
  body("title").isString().exists(),
  body("description").isString().exists(),
  body("prince").isNumeric().exists(),
];
