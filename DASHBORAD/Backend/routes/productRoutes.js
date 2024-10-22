const express = require('express');
const Product = require('../models/Product');  // Adjust the path based on your folder structure

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();  // Fetch all products
    res.json(products);  // Return the products in JSON format
  } catch (err) {
    res.status(500).json({ message: err.message });  // Handle errors with a 500 status code
  }
});

// POST a new product
router.post('/', async (req, res) => {
  const { name, category, price, stock, sales } = req.body;  // Destructure the incoming data from req.body

  // Validate the required fields (you can customize this further if needed)
  if (!name || !category || !price || !stock || !sales) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a new Product instance with the provided data
  const product = new Product({
    name,
    category,
    price,
    stock,
    sales,
  });

  try {
    const newProduct = await product.save();  // Save the new product to the database
    res.status(201).json(newProduct);  // Return the saved product with a 201 status code (created)
  } catch (err) {
    res.status(400).json({ message: err.message });  // Handle errors related to saving
  }
});

// PUT to update an existing product
router.put('/:id', async (req, res) => {
  try {
    const { name, category, price, stock, sales } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      name,
      category,
      price,
      stock,
      sales,
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
