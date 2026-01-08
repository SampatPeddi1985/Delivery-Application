import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  time: String,
  offer: String
});

export default mongoose.model("Restaurant", restaurantSchema);

