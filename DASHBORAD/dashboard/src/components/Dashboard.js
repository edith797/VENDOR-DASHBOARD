import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import '../chartConfig'; // Ensure correct path

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalProducts: 0,
    ordersProcessed: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const [ordersResponse, productsResponse] = await Promise.all([
        fetch('http://localhost:5001/api/orders/summary'),
        fetch('http://localhost:5001/api/products'),
      ]);

      const ordersSummary = await ordersResponse.json();
      const products = await productsResponse.json();

      setSummary({
        totalRevenue: ordersSummary.totalRevenue,
        ordersProcessed: ordersSummary.ordersProcessed,
        totalProducts: products.length,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales Overview',
      data: [4000, 5000, 6000, 7000, 8000, 9000],
      borderColor: '#6c5ce7',
      backgroundColor: 'rgba(108, 92, 231, 0.1)',
      fill: true,
    }],
  };

  return (
    <div className="dashboard">
      <div className="cards">
        <div className="card">Total Sales: ₹{summary.totalRevenue}</div>
        <div className="card">Orders Processed: {summary.ordersProcessed}</div>
        <div className="card">Total Products: {summary.totalProducts}</div>
      </div>
      <div className="charts">
        <div className="chart">
          <h3>Sales Overview</h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
