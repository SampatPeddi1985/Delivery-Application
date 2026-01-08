import express from "express";
import Order from "../models/Order.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { items, totalAmount } = req.body;

  const order = await Order.create({
    user: req.user.id,
    items,
    totalAmount
  });

  res.json(order);
});

router.get("/my", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("items.menuItem");
  res.json(orders);
});

export default router;

