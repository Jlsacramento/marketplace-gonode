const Ad = require("../models/Ad");
const Purchase = require("../models/Purchase");
const { validationResult } = require("express-validator");

class AdController {
  async index(req, res) {
    const filters = {};

    if (req.query.price_min || req.query.price_max) {
      filters.price = {};

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min;
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max;
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i");
    }

    filters.purchasedBy = null;

    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ["author"],
      sort: "-createdAt",
    });

    return res.json(ads);
  }

  async show(req, res) {
    const ad = await Ad.findOne({ _id: req.params.id, purchasedBy: null });

    if (!ad) {
      return res.json("O anúncio não foi encontrado ou já foi vendido.");
    }

    return res.json(ad);
  }

  async store(req, res) {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length) {
      return res.status(422).json({ errors });
    }

    const ad = await Ad.create({ ...req.body, author: req.userId });

    return res.json(ad);
  }

  async update(req, res) {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors) {
      return res.status(422).json({ errors });
    }

    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(ad);
  }

  async destroy(req, res) {
    await Ad.findByIdAndDelete(req.params.id);

    return res.send();
  }

  async sold(req, res) {
    const purchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      { sold: true },
      {
        new: true,
      }
    );

    await Ad.findByIdAndUpdate(
      purchase.adId,
      { purchasedBy: purchase._id },
      {
        new: true,
      }
    );

    res.json("O produto foi vendido.");
  }
}

module.exports = new AdController();
