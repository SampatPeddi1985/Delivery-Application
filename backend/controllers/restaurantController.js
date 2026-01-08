import Restaurant from "../models/Restaurant.js";

export const getRestaurants = async (req, res) => {
  const data = await Restaurant.find();
  res.json(data);
};

