const Ad = require("../models/Ad");
const User = require("../models/User");
const Purchase = require("../models/Purchase");
const PurchaseMail = require("../jobs/PurchaseMail");
const Queue = require("../services/Queue");
const { validationResult } = require("express-validator");

class PurchaseController {
  async index(req, res) {
    const purchases = await Purchase.find({});

    res.json(purchases);
  }

  async store(req, res) {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length) {
      return res.status(422).json({ errors });
    }

    const { ad, content } = req.body;

    const purchaseAd = await Ad.findOne({
      _id: ad,
      purchasedBy: null,
    }).populate("author");

    if (!purchaseAd) {
      return res.json("O anúncio já foi vendido.");
    }

    const user = await User.findById(req.userId);
    const purchase = await Purchase.create({ adId: ad, buyerId: req.userId });

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    return res.status(201).json(purchase);
  }
}

module.exports = new PurchaseController();
