const { body } = require("express-validator");

module.exports = [
  body("name")
    .exists()
    .withMessage("O nome é obrigatório.")
    .isString()
    .withMessage("O nome deve ser uma string."),
  body("email")
    .exists()
    .withMessage("O nome é obrigatório.")
    .isString()
    .withMessage("O nome deve ser uma string.")
    .isEmail()
    .withMessage("Formato de e-mail inválido."),
  body("password")
    .exists()
    .withMessage("A senha é obrigatória.")
    .isString()
    .withMessage("A senha deve ser uma string.")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter no mínimo 6 caracteres."),
];
