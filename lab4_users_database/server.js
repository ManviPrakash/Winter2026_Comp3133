require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8081;

// Connect DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Health check
app.get("/", (req, res) => res.json({ status: "ok" }));

/**
 * POST http://localhost:8081/users
 * Insert a single user + run validations
 */
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({
      message: "User inserted successfully",
      data: user,
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    // Duplicate email error (MongoDB unique index)
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Validation failed",
        errors: ["Email must be unique"],
      });
    }

    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
