import React, { useState } from 'react';
import { initialLeads } from './data/mockLeads';
import SignupForm from './components/SignupForm';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LeadDetailsModal from './components/LeadDetailsModal';
import SuccessModal from './components/SuccessModal';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState(initialLeads);
  const [walletBalance, setWalletBalance] = useState(4250.00);
  const [activeTab, setActiveTab] = useState('business-loan');
  
  // Modal states
  const [selectedLead, setSelectedLead] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignup = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
    setLeads(initialLeads);
    setWalletBalance(4250.00);
    setActiveTab('business-loan');
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
  };

  const handlePurchaseLead = (lead) => {
    if (walletBalance >= lead.price) {
      // Deduct balance
      setWalletBalance(prev => prev - lead.price);
      // Update lead status in state
      setLeads(prevLeads => 
        prevLeads.map(l => l.id === lead.id ? { ...l, status: 'Purchased' } : l)
      );
      // Trigger success modal
      setShowSuccessModal(true);
    }
  };

  const handleChatStart = () => {
    setActiveTab('chat');
    setShowSuccessModal(false);
    setSelectedLead(null);
  };

  // Switch views depending on the activeTab state
  const renderTabContent = () => {
    switch (activeTab) {
      case 'business-loan':
        return (
          <Dashboard 
            leads={leads} 
            onViewLead={handleViewLead} 
          />
        );
      case 'dashboard':
        return (
          <div className="tab-placeholder animate-fade-in">
            <div className="coming-soon-banner">
              <span className="coming-soon-bold">Coming Soon</span>
              <span className="coming-soon-text">This section is under construction.</span>
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="tab-placeholder animate-fade-in">
            <div className="coming-soon-banner">
              <span className="coming-soon-bold">Coming Soon</span>
              <span className="coming-soon-text">This section is under construction.</span>
            </div>
          </div>
        );
      case 'marketplace':
        return (
          <div className="tab-placeholder animate-fade-in">
            <div className="coming-soon-banner">
              <span className="coming-soon-bold">Coming Soon</span>
              <span className="coming-soon-text">This section is under construction.</span>
            </div>
          </div>
        );
      case 'debit-relief':
        return (
          <div className="tab-placeholder animate-fade-in">
            <div className="coming-soon-banner">
              <span className="coming-soon-bold">Coming Soon</span>
              <span className="coming-soon-text">This section is under construction.</span>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="tab-placeholder animate-fade-in">
            <div className="coming-soon-banner">
              <span className="coming-soon-bold">Coming Soon</span>
              <span className="coming-soon-text">This section is under construction.</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="tab-placeholder animate-fade-in">
            <div className="coming-soon-banner">
              <span className="coming-soon-bold">Coming Soon</span>
              <span className="coming-soon-text">This section is under construction.</span>
            </div>
          </div>
        );
    }
  };

  // If not logged in, render registration/login page
  if (!user) {
    return <SignupForm onSignup={handleSignup} />;
  }

  // Active view container
  return (
    <div className="app-portal-layout">
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Panel */}
      <div className="portal-main-panel">
        <Header 
          user={user} 
          onLogout={handleLogout} 
          setSidebarOpen={setSidebarOpen}
        />

        {/* Tab view */}
        {renderTabContent()}
      </div>

      {/* Leads details modal */}
      {selectedLead && !showSuccessModal && (
        <LeadDetailsModal
          lead={selectedLead}
          walletBalance={walletBalance}
          onClose={handleCloseDetails}
          onPurchase={handlePurchaseLead}
        />
      )}

      {/* Purchase success modal */}
      {showSuccessModal && (
        <SuccessModal
          lead={selectedLead}
          walletBalance={walletBalance}
          onClose={handleCloseSuccess}
          onChatStart={handleChatStart}
        />
      )}
    </div>
  );

  // Helper close handlers
  function handleCloseDetails() {
    setSelectedLead(null);
  }

  function handleCloseSuccess() {
    setShowSuccessModal(false);
    setSelectedLead(null);
  }
}
