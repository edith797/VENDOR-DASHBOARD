import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Orders from './components/Orders';
import Sales from './components/Sales';
import Analytics from './components/Analytics';
import Sidebar from './components/Sidebar';
import './App.css'; 


function App() {
  return (
    <Router>
      <div className="app-container">
     
        <Sidebar />

        <div className="main-content">
          <Routes>
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/settings" element={<Analytics />} />
          

     
            <Route
              path="/"
              element={
                <div className="welcome-message">
                  <h1 className="welcome-text">Welcome to the Vendor Dashboard!</h1>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
