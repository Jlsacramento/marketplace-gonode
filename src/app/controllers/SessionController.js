const User = require("../models/User");
const { validationResult } = require("express-validator");

class SessionControler {
  async store(req, res) {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length) {
      return res.status(422).json({ errors });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado!" });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: "Senha incorreta!" });
    }

    return res.json({ user, token: User.generateToken(user) });
  }
}

module.exports = new SessionControler();
