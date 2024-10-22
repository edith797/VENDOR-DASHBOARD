const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sales: { type: Number, required: true },
});

// Create the Product model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
