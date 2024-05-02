import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String },
});

module.exports = mongoose.model("Person", personSchema);
