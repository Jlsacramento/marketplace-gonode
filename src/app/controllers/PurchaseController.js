const Ad = require("../models/Ad");
const User = require("../models/User");
const PurchaseMail = require("../jobs/PurchaseMail");
const Queue = require("../services/Queue");
const { validationResult } = require("express-validator");

class PurchaseController {
  async store(req, res) {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors) {
      return res.status(422).json({ errors });
    }

    const { ad, content } = req.body;

    const purchaseAd = await Ad.findById(ad).populate("author");
    const user = await User.findById(req.userId);

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    return res.send();
  }
}

module.exports = new PurchaseController();
