const { body } = require("express-validator");

module.exports = [
  body("email").isString().isEmail().exists(),
  body("password").isString().exists(),
];
