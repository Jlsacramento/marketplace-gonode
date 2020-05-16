const express = require("express");
const handle = require("express-async-handler");

const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");

const controllers = require("./app/controllers");
const validators = require("./app/validators");

routes.post(
  "/users",
  validators.User,
  handle(controllers.UserController.store)
);
routes.post(
  "/sessions",
  validators.Session,
  handle(controllers.SessionController.store)
);

routes.use(authMiddleware);

/**
 * Ads
 */
routes.get("/ads", handle(controllers.AdController.index));
routes.get("/ads/:id", handle(controllers.AdController.show));
routes.post(
  "/ads",
  validators.Purchase,
  handle(controllers.AdController.store)
);
routes.put(
  "/ads/:id",
  validators.Purchase,
  handle(controllers.AdController.update)
);
routes.delete("/ads/:id", handle(controllers.AdController.destroy));

/**
 * Purchases
 */
routes.post("/purchases", handle(controllers.PurchaseController.store));

module.exports = routes;
