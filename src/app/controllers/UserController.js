const User = require("../models/User");
const { validationResult } = require("express-validator");

class UserController {
  async store(req, res) {
    const errors = validationResult(req).array({ onlyFirstError: true });
    console.log(errors);

    if (errors.length) {
      return res.status(422).json({ errors });
    }

    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Este usuário já existe!" });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

module.exports = new UserController();
