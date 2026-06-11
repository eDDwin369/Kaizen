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
            <div className="placeholder-card">
              <UserCheck size={48} className="placeholder-icon" />
              <h3>Dashboard Summary</h3>
              <p>Welcome to the Kojo Partner Portal overview. Access stats and settings instantly.</p>
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="tab-placeholder animate-fade-in">
            <div className="placeholder-card">
              <WalletIcon size={48} className="placeholder-icon" />
              <h3>My Wallet</h3>
              <p>Current Balance: <strong style={{ color: 'var(--primary)' }}>${walletBalance.toFixed(2)}</strong></p>
              <p className="placeholder-desc">Add deposits, review transactions, and adjust automatic purchase limits.</p>
              <button className="deposit-btn" onClick={() => setWalletBalance(prev => prev + 1000)}>
                Deposit $1,000.00
              </button>
            </div>
          </div>
        );
      case 'marketplace':
        return (
          <div className="tab-placeholder animate-fade-in">
            <div className="placeholder-card">
              <FileText size={48} className="placeholder-icon" />
              <h3>Leads Marketplace</h3>
              <p>Discover real-time high-quality applications. Filter by loan type, credit tier, and geo-location.</p>
            </div>
          </div>
        );
      case 'debit-relief':
        return (
          <div className="tab-placeholder animate-fade-in">
            <div className="placeholder-card">
              <CheckCircle2 size={48} className="placeholder-icon" />
              <h3>Debit Relief Hub</h3>
              <p>Evaluate consumer debit reduction leads. Real-time screening and background profiles included.</p>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="chat-layout animate-fade-in">
            {/* Contacts Sidebar */}
            <div className="chat-sidebar">
              <h3>Conversations</h3>
              <div className="contact-list">
                {chatContacts.map(contact => (
                  <button 
                    key={contact.name}
                    className={`contact-item ${activeContact === contact.name ? 'active' : ''}`}
                    onClick={() => setActiveContact(contact.name)}
                  >
                    <div className="contact-avatar">
                      {contact.name.charAt(0)}
                    </div>
                    <div className="contact-info">
                      <div className="contact-header">
                        <span className="contact-name">{contact.name}</span>
                        {contact.unread && <span className="unread-dot" />}
                      </div>
                      <p className="contact-last-msg">{contact.lastMessage}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Messages Thread */}
            <div className="chat-thread-container">
              <div className="chat-thread-header">
                <h4>{activeContact}</h4>
                <p>Status: Online</p>
              </div>
              <div className="chat-messages-box">
                {chatMessages[activeContact]?.map((msg, idx) => (
                  <div key={idx} className={`message-bubble-wrapper ${msg.sender}`}>
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form className="chat-input-bar" onSubmit={sendChatMessage}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        );
      default:
        return (
          <div className="tab-placeholder">
            <h3>Coming Soon</h3>
            <p>This section is under construction.</p>
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
