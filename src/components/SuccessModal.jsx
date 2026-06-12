import React from 'react';
import PropTypes from 'prop-types';
import { X, Check, FileText, Wallet, MessageSquare, ArrowRight } from 'lucide-react';
import { formatCurrency, formatBalance } from '../utils/formatters';
import './SuccessModal.css';

export default function SuccessModal({ lead, onClose, walletBalance, onChatStart }) {
  if (!lead) return null;

  const price = lead.price;
  const newBalance = walletBalance;
  const oldBalance = walletBalance + price;

  // Generate a mock transaction ID based on lead ID
  const txnId = `TXN-2026-${lead.id.replace(/\D/g, '').padStart(4, '0')}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card success-modal-card animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="modal-close-btn success-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Green Checkmark Circle Banner */}
        <div className="success-banner">
          <div className="success-check-circle">
            <Check size={36} className="check-icon-white" />
          </div>
          <h3>Lead Purchased Successfully</h3>
          <p className="success-subtitle">
            You now have access to {lead.id.replace('Lead#', 'Lead #')}. <br />
            Start a conversation to move them forward.
          </p>
        </div>

        {/* Modal Body */}
        <div className="modal-body success-modal-body">
          {/* Section 1: Transaction Receipt */}
          <div className="success-section">
            <h4 className="section-title-row">
              <FileText size={16} className="section-title-icon" />
              <span>Transaction Receipt</span>
            </h4>
            <div className="receipt-box">
              <div className="receipt-row">
                <span className="receipt-key">Transaction ID</span>
                <span className="receipt-value val-bold">{txnId}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-key">Lead ID</span>
                <span className="receipt-value">{lead.leadCode}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-key">Lead Type</span>
                <span className="receipt-value">{lead.leadType}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-key">Payment Method</span>
                <span className="receipt-value">Autopay</span>
              </div>
              <div className="receipt-divider" />
              <div className="receipt-row">
                <span className="receipt-key font-medium">Amount Charged</span>
                <span className="receipt-value charged-amount">-${price}.00</span>
              </div>
            </div>
          </div>

          {/* Section 2: Wallet Update Preview */}
          <div className="success-section">
            <h4 className="section-title-row">
              <Wallet size={16} className="section-title-icon" />
              <span>Wallet Update Preview</span>
            </h4>
            <div className="wallet-preview-row">
              {/* Old Balance */}
              <div className="wallet-pill">
                <div className="pill-icon-circle blue-bg">
                  <Wallet size={16} className="blue-text" />
                </div>
                <div className="pill-info">
                  <p className="pill-label">Current Balance</p>
                  <p className="pill-value">{formatBalance(oldBalance)}</p>
                </div>
              </div>
              {/* New Balance */}
              <div className="wallet-pill">
                <div className="pill-icon-circle green-bg">
                  <Wallet size={16} className="green-text" />
                </div>
                <div className="pill-info">
                  <p className="pill-label">New Balance</p>
                  <p className="pill-value">{formatBalance(newBalance)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: James John Chat Notification Alert */}
          <div className="chat-notification-alert">
            <div className="alert-chat-icon-container">
              <MessageSquare size={20} className="alert-chat-icon" />
            </div>
            <div className="alert-text-container">
              <h5 className="alert-title">{lead.contactName} is ready to chat!</h5>
              <p className="alert-desc">Start a conversation now to move this lead forward.</p>
            </div>
          </div>
        </div>

        {/* Modal Footer Buttons */}
        <div className="modal-footer success-modal-footer">
          <button className="success-btn-secondary" onClick={onClose}>
            <span>Go to Lead Details</span>
            <ArrowRight size={16} />
          </button>
          
          <button className="success-btn-primary" onClick={() => onChatStart(lead)}>
            <MessageSquare size={16} />
            <span>Start Chat with {lead.contactName}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

SuccessModal.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.string.isRequired,
    leadCode: PropTypes.string.isRequired,
    contactName: PropTypes.string.isRequired,
    appliedAmount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    eligibilityScore: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    readiness: PropTypes.string.isRequired,
    leadType: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  }),
  onClose: PropTypes.func.isRequired,
  walletBalance: PropTypes.number.isRequired,
  onChatStart: PropTypes.func.isRequired
};
