import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
});

module.exports = mongoose.model("Order", orderSchema);
