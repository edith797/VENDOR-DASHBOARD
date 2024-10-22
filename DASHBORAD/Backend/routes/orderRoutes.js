const express = require('express');
const Order = require('../models/Orders');
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get summary of orders
router.get('/summary', async (req, res) => {
  try {
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const productsSold = orders.reduce((sum, order) => sum + order.products.length, 0);
    const ordersProcessed = orders.filter(order => order.status !== 'Pending').length;

    // Placeholder for sales growth
    const salesGrowth = 12.3;

    res.json({ totalRevenue, salesGrowth, ordersProcessed, productsSold });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const { orderId, customer, products, total } = req.body;
  const newOrder = new Order({ orderId, customer, products, total });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update order status
router.patch('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
