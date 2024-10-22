import React from 'react';
import { FaUser, FaBell, FaLock } from 'react-icons/fa';
import './Settings.css'; // Assuming you will style the component in a separate CSS file.

const Settings = () => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Profile Section */}
      <div className="settings-section profile-section">
        <div className="section-header">
          <FaUser className="icon" />
          <h3>Profile</h3>
        </div>
        <div className="profile-details">
          <img src="https://via.placeholder.com/100" alt="Profile" className="profile-img" />
          <div className="profile-info">
            <h4>AAKASH</h4>
            <p>edith@gmail.com</p>
          </div>
          <button className="btn-edit">Edit Profile</button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="settings-section notifications-section">
        <div className="section-header">
          <FaBell className="icon" />
          <h3>Notifications</h3>
        </div>
        <div className="notifications-options">
          <div className="option">
            <span>Push Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="option">
            <span>Email Notifications</span>
            <input type="checkbox" />
          </div>
          <div className="option">
            <span>SMS Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="settings-section security-section">
        <div className="section-header">
          <FaLock className="icon" />
          <h3>Security</h3>
        </div>
        <div className="security-options">
          <div className="option">
            <span>Two-Factor Authentication</span>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
