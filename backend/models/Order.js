import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        quantity: Number
      }
    ],
    totalAmount: Number,
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

