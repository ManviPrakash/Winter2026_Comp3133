require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const User = require("../models/User");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected for seeding");

    const dataPath = path.join(__dirname, "..", "UsersData.json");
    const users = require(dataPath);

    // Optional: clear existing users before insert (helps re-running)
    await User.deleteMany({});
    console.log("🗑️ Cleared users collection");

    const inserted = await User.insertMany(users, { ordered: false });
    console.log(`✅ Inserted ${inserted.length} users`);

    process.exit(0);
  } catch (err) {
    // If some records fail validation, ordered:false still inserts others
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();
