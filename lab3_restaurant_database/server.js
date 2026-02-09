require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

/**
 * Debug route: confirm data exists
 * http://localhost:3000/debug/count
 */
app.get("/debug/count", async (req, res) => {
  try {
    const count = await Restaurant.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 4) GET all restaurants (select all columns)
 * http://localhost:3000/restaurants
 *
 * 6) ALSO support:
 * http://localhost:3000/restaurants?sortBy=ASC
 * http://localhost:3000/restaurants?sortBy=DESC
 * - Selected columns must include: id, cuisines, name, city, restaurant_id
 * - Sort by restaurant_id ASC/DESC
 */
app.get("/restaurants", async (req, res) => {
  try {
    const { sortBy } = req.query;

    // Q6 behavior when sortBy is provided
    if (sortBy) {
      const sortDirection = String(sortBy).toUpperCase() === "DESC" ? -1 : 1;

      const results = await Restaurant.find(
        {},
        {
          _id: 1,          // id
          cuisine: 1,      // cuisines (lab wording)
          name: 1,
          city: 1,         // ✅ root city
          restaurant_id: 1,
        }
      ).sort({ restaurant_id: sortDirection });

      const mapped = results.map((r) => ({
        id: r._id,
        cuisines: r.cuisine,
        name: r.name,
        city: r.city ?? null,
        restaurant_id: r.restaurant_id,
      }));

      return res.json(mapped);
    }

    // Q4 behavior: all columns
    const all = await Restaurant.find({});
    return res.json(all);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * 5) GET restaurants by cuisine (select all columns)
 * http://localhost:3000/restaurants/cuisine/Japanese
 * http://localhost:3000/restaurants/cuisine/Bakery
 * http://localhost:3000/restaurants/cuisine/Italian
 */
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const cuisineParam = req.params.cuisine;
    const results = await Restaurant.find({ cuisine: cuisineParam });
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * 7) GET restaurants where:
 * - cuisine == "Delicatessen"
 * - city != "Brooklyn"
 * - select: cuisines, name, city (exclude id)
 * - sort by name ASC
 *
 * http://localhost:3000/restaurants/Delicatessen
 */
app.get("/restaurants/Delicatessen", async (req, res) => {
  try {
    const results = await Restaurant.find(
      {
        cuisine: "Delicatessen",
        city: { $ne: "Brooklyn" }, // ✅ root city
      },
      {
        _id: 0,     // exclude id
        cuisine: 1,
        name: 1,
        city: 1,    // ✅ root city
      }
    ).sort({ name: 1 });

    const mapped = results.map((r) => ({
      cuisines: r.cuisine,
      name: r.name,
      city: r.city ?? null,
    }));

    return res.json(mapped);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Basic health route
app.get("/", (req, res) => res.send("Lab3 Restaurant API running"));

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
