const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    address: {
      building: String,
      street: String,
      zipcode: String,
    },
    city: String,        
    cuisine: String,
    name: String,
    restaurant_id: String,
  },
  { collection: "Restaurant" }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
