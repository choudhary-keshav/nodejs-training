const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    type: Number,
    default: 18,
  },
  balance: {
    type: Number,
    default: 0,
  },
  city: {
    type: String,
    default: "Hyderabad",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
