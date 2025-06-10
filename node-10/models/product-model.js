const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true, min: [0, "Wrong Price"] },
  discountPercentage: Number,
  rating: {
    type: Number,
    min: [0, "Wrong ratings"],
    max: [5, "Exceeded ratings"],
    default:0
  },
  brand: String,
  thumbnail: { type: String, required: true },
});

exports.Product = mongoose.model("Product", productSchema);
