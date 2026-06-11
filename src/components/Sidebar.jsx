import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ShoppingBag, 
  FileText, 
  Percent, 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  Headphones,
  ChevronRight,
  X
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'main' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, category: 'main' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, category: 'main' },
    { id: 'business-loan', label: 'Business Loan', icon: FileText, category: 'main', hasArrow: true },
    { id: 'debit-relief', label: 'Debit Relief', icon: Percent, category: 'main', hasArrow: true },
    { id: 'insights', label: 'Insights', icon: TrendingUp, category: 'other-main' },
    { id: 'chat', label: 'Chat', icon: MessageSquare, category: 'other-main' },
    { id: 'settings', label: 'Settings', icon: Settings, category: 'others' },
    { id: 'support', label: 'Support', icon: Headphones, category: 'others' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false); // Close sidebar on mobile after clicking
  };

  const renderItems = (category) => {
    return menuItems
      .filter(item => item.category === category)
      .map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-item-left">
              <Icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </span>
            {item.hasArrow && <ChevronRight size={16} className="nav-arrow" />}
          </button>
        );
      });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
      
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-area">
            <div className="logo-circle" style={{ backgroundColor: '#0e52b8' }}>
              {/* Custom Company Slanted Blocks Logo */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(-28 12 12)">
                  <rect x="4.5" y="6.8" width="11" height="5.0" rx="1.6" fill="white" />
                  <rect x="8.5" y="12.2" width="11" height="5.0" rx="1.6" fill="white" />
                </g>
              </svg>
            </div>
            <span className="logo-text">Partner Portal</span>
          </div>
          <button className="sidebar-close-btn" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="nav-section">
            <span className="section-label">MAIN</span>
            <div className="section-items">
              {renderItems('main')}
            </div>
          </div>

          <div className="nav-section-divider" />

          <div className="nav-section">
            <div className="section-items">
              {renderItems('other-main')}
            </div>
          </div>

          <div className="nav-section-divider" />

          <div className="nav-section">
            <span className="section-label">OTHERS</span>
            <div className="section-items">
              {renderItems('others')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
