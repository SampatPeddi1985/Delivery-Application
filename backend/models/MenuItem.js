import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  name: String,
  price: Number,
  description: String
});

export default mongoose.model("MenuItem", menuItemSchema);

