const mongoose = require("mongoose");

const cityRegex = /^[A-Za-z ]+$/;                 // alphabets + spaces only
const zipRegex = /^\d{5}-\d{4}$/;                 // DDDDD-DDDD
const phoneRegex = /^\d-\d{3}-\d{3}-\d{4}$/;      // D-DDD-DDD-DDDD
const urlRegex = /^https?:\/\/.+/i;               // http or https

const geoSchema = new mongoose.Schema(
  {
    lat: { type: String, required: [true, "Geo lat is required"] },
    lng: { type: String, required: [true, "Geo lng is required"] },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: [true, "Street is required"] },
    suite: { type: String, required: [true, "Suite is required"] },
    city: {
      type: String,
      required: [true, "City is required"],
      validate: {
        validator: (v) => cityRegex.test(v),
        message: "City must contain only alphabets and spaces",
      },
    },
    zipcode: {
      type: String,
      required: [true, "Zipcode is required"],
      validate: {
        validator: (v) => zipRegex.test(v),
        message: "Zipcode must match format 12345-1234",
      },
    },
    geo: { type: geoSchema, required: [true, "Geo is required"] },
  },
  { _id: false }
);

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Company name is required"] },
    catchPhrase: { type: String, required: [true, "Company catchPhrase is required"] },
    bs: { type: String, required: [true, "Company bs is required"] },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },

    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [4, "Username must be at least 4 characters"],
      maxlength: [100, "Username must be at most 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email must be valid"],
    },

    address: { type: addressSchema, required: [true, "Address is required"] },

    phone: {
      type: String,
      required: [true, "Phone is required"],
      validate: {
        validator: (v) => phoneRegex.test(v),
        message: "Phone must match format 1-123-123-1234",
      },
    },

    website: {
      type: String,
      required: [true, "Website is required"],
      validate: {
        validator: (v) => urlRegex.test(v),
        message: "Website must be a valid URL starting with http or https",
      },
    },

    company: { type: companySchema, required: [true, "Company is required"] },
  },
  { timestamps: true }
);

// Make the unique email error nicer (Mongo duplicate key)
userSchema.post("save", function (error, doc, next) {
  next(error);
});

module.exports = mongoose.model("User", userSchema);
