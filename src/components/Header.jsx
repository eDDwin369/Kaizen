import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Search, Bell, ChevronDown, LogOut } from 'lucide-react';
import './Header.css';

export default function Header({ user, onLogout, setSidebarOpen }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="header-container">
      {/* Mobile Hamburger menu */}
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <div className="header-right">
        {/* Search button */}
        <button className="header-icon-btn">
          <Search size={20} />
        </button>

        {/* Notifications button */}
        <button className="header-icon-btn notifications-btn">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <div className="header-divider" />

        {/* Profile Dropdown */}
        <div className="profile-wrapper">
          <button 
            className="profile-trigger" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {/* Arthur SVG Avatar representing the character from the screenshot */}
            <div className="avatar-container">
              <svg viewBox="0 0 100 100" className="avatar-svg" xmlns="http://www.w3.org/2000/svg">
                {/* Background */}
                <circle cx="50" cy="50" r="50" fill="#FFE8D6" />
                {/* Hair */}
                <path d="M25,40 C15,35 15,20 30,15 C45,10 55,5 70,15 C85,25 85,35 75,45 C70,40 60,35 50,40 C40,45 30,45 25,40 Z" fill="#4A3728" />
                {/* Face details */}
                <circle cx="40" cy="48" r="4" fill="#2E1A0C" />
                <circle cx="60" cy="48" r="4" fill="#2E1A0C" />
                <path d="M48,58 Q50,62 52,58" stroke="#2E1A0C" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Shirt */}
                <path d="M20,85 C20,70 30,65 50,65 C70,65 80,70 80,85 L80,100 L20,100 Z" fill="#0b57d0" />
                <path d="M50,65 L44,75 L56,75 Z" fill="#FFE8D6" />
              </svg>
            </div>
            <span className="profile-name">{user ? `${user.firstName}` : 'Arthur'}</span>
            <ChevronDown size={16} className={`chevron-icon ${showDropdown ? 'rotate' : ''}`} />
          </button>

          {showDropdown && (
            <div className="profile-dropdown animate-scale-in">
              <div className="dropdown-user-info">
                <p className="user-info-name">{user ? `${user.firstName} ${user.lastName}` : 'Arthur Pendragon'}</p>
                <p className="user-info-email">{user ? user.email : 'arthur@kojo.com'}</p>
              </div>
              <div className="dropdown-divider" />
              <button className="dropdown-item logout-btn" onClick={onLogout}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
  onLogout: PropTypes.func.isRequired,
  setSidebarOpen: PropTypes.func.isRequired
};
