import React, { useState } from 'react';
import { initialLeads } from './data/mockLeads';
import SignupForm from './components/SignupForm';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LeadDetailsModal from './components/LeadDetailsModal';
import SuccessModal from './components/SuccessModal';
import { MessageSquare, Wallet as WalletIcon, FileText, CheckCircle2, UserCheck } from 'lucide-react';
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

  // Chat conversation logs state for Chat Simulation
  const [chatContacts, setChatContacts] = useState([
    { name: 'James John', lastMessage: 'Hi Arthur, ready to talk about the Business Loan!', active: true, unread: true },
    { name: 'James Brown', lastMessage: 'Sent you my profile details.', active: false, unread: false },
    { name: 'Sarah Connor', lastMessage: 'Can we reschedule our call?', active: false, unread: false }
  ]);

  const [activeContact, setActiveContact] = useState('James John');
  const [chatMessages, setChatMessages] = useState({
    'James John': [
      { sender: 'lead', text: 'Hello, I applied for the $5,000,000 Business Loan. Is my application approved?' },
      { sender: 'agent', text: 'Hi James, I am reviewing your 83% Eligibility Score. It looks solid. Let me check the details.' },
      { sender: 'lead', text: 'Great! I am ready to chat and provide any details you need.' }
    ],
    'James Brown': [
      { sender: 'lead', text: 'Hello Arthur, please review my account.' },
      { sender: 'agent', text: 'Will do, James! I see you have an Excellent rating.' }
    ],
    'Sarah Connor': [
      { sender: 'lead', text: 'Hi, is there any update on the debit relief leads?' },
      { sender: 'agent', text: 'Hi Sarah, yes, we are reviewing your application now.' }
    ]
  });

  const [newMessageText, setNewMessageText] = useState('');

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

  const handleChatStart = (lead) => {
    // Add lead contact if it doesn't exist yet
    const contactName = lead.contactName;
    if (!chatMessages[contactName]) {
      setChatContacts(prev => [
        { name: contactName, lastMessage: 'Ready to connect!', active: true, unread: false },
        ...prev.map(c => ({ ...c, active: false }))
      ]);
      setChatMessages(prev => ({
        ...prev,
        [contactName]: [
          { sender: 'lead', text: `Hi, I'm ready to chat about Lead details for ${lead.id}!` }
        ]
      }));
    }
    setActiveContact(contactName);
    setActiveTab('chat');
    setShowSuccessModal(false);
    setSelectedLead(null);
  };

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    setChatMessages(prev => ({
      ...prev,
      [activeContact]: [
        ...prev[activeContact],
        { sender: 'agent', text: newMessageText }
      ]
    }));

    setChatContacts(prev => 
      prev.map(c => c.name === activeContact ? { ...c, lastMessage: newMessageText } : c)
    );

    setNewMessageText('');

    // Simulate auto lead reply after 1.5 seconds
    setTimeout(() => {
      setChatMessages(prev => ({
        ...prev,
        [activeContact]: [
          ...prev[activeContact],
          { sender: 'lead', text: 'Thank you! Let me know what information you need next.' }
        ]
      }));
      setChatContacts(prev => 
        prev.map(c => c.name === activeContact ? { ...c, lastMessage: 'Thank you! Let me know what information you need next.' } : c)
      );
    }, 1500);
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
