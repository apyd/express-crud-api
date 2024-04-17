import express from "express";

import * as cartHandler from "../profile/cart/cart.controller";
import * as checkoutHandler from "../profile/cart/checkout/checkout.controller";
import * as productsController from "../products/products.controller";

import { auth } from "../common/middleware/auth";
import { errorHandler } from "../common/middleware/error";

const router = express.Router();

router.use(auth);

router.get("/api/profile/cart", cartHandler.getCart);
router.put("/api/profile/cart", cartHandler.updateCart);
router.delete("/api/profile/cart", cartHandler.deleteCart);
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
