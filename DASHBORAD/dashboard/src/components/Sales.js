import React, { useEffect, useState } from "react";
import './sales.css';
import { FaFilter } from 'react-icons/fa';

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    salesGrowth: 0,
    ordersProcessed: 0,
    productsSold: 0,
  });

  const [showAllOrders, setShowAllOrders] = useState(true);

  const fetchOrdersAndSummary = async () => {
    try {
      const ordersResponse = await fetch('http://localhost:5001/api/orders');
      const ordersData = await ordersResponse.json();
      setOrders(ordersData);

      const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
      const productsSold = ordersData.reduce((sum, order) => sum + order.products.length, 0);
      const ordersProcessed = ordersData.filter(order => order.status !== 'Pending').length;

      // **Sales Growth Calculation** 
      const previousRevenue = 8000; // Placeholder for previous period revenue.
      const salesGrowth = ((totalRevenue - previousRevenue) / previousRevenue) * 100;

      setSummary({ totalRevenue, salesGrowth, ordersProcessed, productsSold });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchOrdersAndSummary();
    const interval = setInterval(fetchOrdersAndSummary, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const handleFilter = () => setShowAllOrders(!showAllOrders);

  const filteredOrders = showAllOrders
    ? orders
    : orders.filter(order => order.status === 'Processing');

  return (
    <div className="sales-container">
      <div className="section-title">Sales Overview</div>

      <div className="stats">
        <div className="stat-card">
          <p>Total Revenue</p>
          <h3>₹{summary.totalRevenue.toLocaleString()}</h3>
        </div>
        <div className="stat-card">
          <p>Sales Growth</p>
          <h3>{summary.salesGrowth.toFixed(1)}%</h3>
        </div>
        <div className="stat-card">
          <p>Orders Processed</p>
          <h3>{summary.ordersProcessed}</h3>
        </div>
        <div className="stat-card">
          <p>Products Sold</p>
          <h3>{summary.productsSold}</h3>
        </div>
      </div>

      <div className="order-list">
        <div className="order-list-header">
          <div className="section-title">Recent Orders</div>
          <button className="filter-btn" onClick={handleFilter}>
            <FaFilter /> {showAllOrders ? "Show Processing" : "Show All"}
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Product(s)</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.orderId}>
                <td>#{order.orderId}</td>
                <td>{order.customer}</td>
                <td>{order.products.join(", ")}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>₹{order.total.toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
