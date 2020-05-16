const { body } = require("express-validator");

module.exports = [
  body("ad")
    .exists()
    .withMessage("O anúncio é obrigatório.")
    .isString()
    .withMessage("O anúncio deve ser uma string."),
  body("content")
    .exists()
    .withMessage("O conteúdo é obrigatório.")
    .isString()
    .withMessage("O conteúdo deve ser uma string."),
];
