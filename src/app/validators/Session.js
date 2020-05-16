const { body } = require("express-validator");

module.exports = [
  body("email")
    .exists()
    .withMessage("O e-mail é obrigatório.")
    .isString()
    .withMessage("O e-mail deve ser uma string.")
    .isEmail()
    .withMessage("E-mail inválido."),
  body("password")
    .exists()
    .withMessage("O password é obrigatório.")
    .isString()
    .withMessage("O password deve ser uma string."),
];
