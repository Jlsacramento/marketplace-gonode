const { body } = require("express-validator");

module.exports = [
  body("title")
    .exists()
    .withMessage("O título é obrigatório.")
    .isString()
    .withMessage("O título deve ser uma string."),
  body("description")
    .exists()
    .withMessage("A descrição é obrigatória.")
    .isString()
    .withMessage("A descrição deve ser uma string."),
  body("prince")
    .isNumeric()
    .withMessage("O preço deve ser um numeral.")
    .exists()
    .withMessage("O preço é obrigatório."),
];
