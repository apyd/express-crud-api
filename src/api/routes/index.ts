import express from "express";

import * as authHandler from "../controllers/user.controller";
import * as cartHandler from "../controllers/cart.controller";
import * as checkoutHandler from "../controllers/checkout.controller";
import * as productsController from "../controllers/products.controller";

import { authenticate } from "../middleware/authenticate";
import { authorizeAsAdmin } from "../middleware/authorize";
import { errorHandler } from "../middleware/error";
import { sequelize } from "../db";

const router = express.Router();

// Authentication not required for healthcheck therefore before authentication middleware
router.get("api/healthcheck", async (_, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.post("/api/auth/register", authHandler.registerUser);
router.post("/api/auth/login", authHandler.loginUser);

router.use(authenticate);

router.get("/api/profile/cart", cartHandler.getCart);
router.put("/api/profile/cart", cartHandler.updateCart);
router.delete("/api/profile/cart", authorizeAsAdmin, cartHandler.deleteCart);
router.post("/api/profile/cart/checkout", checkoutHandler.createOrder);

router.get("/api/products", productsController.getAllProducts);
router.get("/api/products/:productId", productsController.getProductById);

router.use((_, res) => {
  res.status(404).json({
    message: "Route or method not supported. Check API documentation.",
  });
});

router.use(errorHandler);

export default router;
