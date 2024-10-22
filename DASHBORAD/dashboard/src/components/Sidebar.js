import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faBox, faShoppingCart, faDollarSign, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="title">Vendor Dashboard</h1>
      <ul>
        <li>
          <Link to="/overview">
            <FontAwesomeIcon icon={faChartBar} />
            <span>Overview</span>
          </Link>
        </li>
        <li>
          <Link to="/products">
            <FontAwesomeIcon icon={faBox} />
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link to="/sales">
            <FontAwesomeIcon icon={faDollarSign} />
            <span>Sales</span>
          </Link>
        </li>
        <li>
          <Link to="/settings">
          <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </Link>
        </li>
       
       
      </ul>
    </div>
  );
};

export default Sidebar;
