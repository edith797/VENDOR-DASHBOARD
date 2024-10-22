import React, { useEffect, useState } from 'react';
import './Orders.css'; 
import { FaShoppingBag, FaHourglassHalf, FaClipboardCheck, FaRupeeSign } from 'react-icons/fa'; 
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/orders');
      setOrders(response.data);

      const totalOrders = response.data.length;
      const pendingOrders = response.data.filter(order => order.status === 'Processing').length;
      const completedOrders = response.data.filter(order => order.status === 'Delivered').length;
      const totalRevenue = response.data.reduce((sum, order) => sum + order.total, 0);

      setStats({ totalOrders, pendingOrders, completedOrders, totalRevenue });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Processing' ? 'Delivered' : 'Processing';
    try {
      await axios.patch(`http://localhost:5001/api/orders/${id}`, { status: newStatus });
      fetchOrders(); // Refresh orders after updating status
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orders-container">
      <div className="section-title">Orders</div>
      <div className="stats">
        {Object.entries(stats).map(([key, value]) => (
          <div className="stat-card" key={key}>
            <div className="stat-icon">
              {key === 'totalOrders' && <FaShoppingBag />}
              {key === 'pendingOrders' && <FaHourglassHalf />}
              {key === 'completedOrders' && <FaClipboardCheck />}
              {key === 'totalRevenue' && <FaRupeeSign />}
            </div>
            <div className="stat-info">
              <p>{key.replace(/([A-Z])/g, ' $1')}</p>
              <h3>{key === 'totalRevenue' ? `₹${value.toFixed(2)}` : value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="order-list">
        <div className="order-list-header">
          <h3>Order List</h3>
          <input
            type="text"
            className="search-bar"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product(s)</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td><strong>{order.orderId}</strong></td>
                <td>{order.customer}</td>
                <td>{order.products.join(', ')}</td>
                <td>₹{order.total.toFixed(2)}</td>
                <td>
                  <span className={`status-tag status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="edit-btn" 
                    onClick={() => handleStatusChange(order._id, order.status)}
                  >
                    {order.status === 'Processing' ? 'Mark as Delivered' : 'Mark as Processing'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
