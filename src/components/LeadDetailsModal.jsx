import React from 'react';
import PropTypes from 'prop-types';
import { X, User, Wallet, Check, ShoppingCart } from 'lucide-react';
import Gauge from './Gauge';
import { formatCurrency } from '../utils/formatters';
import './LeadDetailsModal.css';

export default function LeadDetailsModal({ lead, onClose, onPurchase, walletBalance }) {
  if (!lead) return null;

  const percentage = lead.eligibilityScore;

  const isPurchased = lead.status === 'Purchased';
  const canAfford = walletBalance >= lead.price;

  // Typo match from user screenshot "Leadl#123"
  const displayId = lead.id.replace('Lead#', 'Leadl#');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card animate-scale-in" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-container">
            <h3>{displayId}</h3>
            <p className="modal-subtitle">Lead ID</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <hr className="modal-divider-line" />

        {/* Modal Body */}
        <div className="modal-body">
          {/* Modular React Gauge Component */}
          <Gauge percentage={percentage} date="Mar 2026" />

          {/* Cards Section */}
          <div className="details-cards-section">
            {/* Price Card */}
            <div className="details-card-row full-width">
              <div className="icon-wrapper lead-purple-bg">
                <User size={20} className="lead-purple-text" />
              </div>
              <div className="details-card-info">
                <h4>{formatCurrency(lead.price)}</h4>
                <p>Lead Price</p>
              </div>
            </div>

            {/* Sub cards */}
            <div className="sub-cards-row">
              {/* Applied Amount */}
              <div className="details-card-row">
                <div className="icon-wrapper lead-blue-bg">
                  <Wallet size={20} className="lead-blue-text" />
                </div>
                <div className="details-card-info">
                  <p className="sub-label">Applied Amount</p>
                  <h4>{formatCurrency(lead.appliedAmount)}</h4>
                </div>
              </div>

              {/* Readiness (Green badge on top, label below) */}
              <div className="details-card-row">
                <div className="icon-wrapper lead-green-bg">
                  <Check size={20} className="lead-green-text" />
                </div>
                <div className="details-card-info">
                  <span className="readiness-badge-text">
                    <span className="green-dot" /> Yes
                  </span>
                  <p className="sub-label" style={{ marginTop: '2px' }}>Readiness</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="modal-divider-line" />

        {/* Modal Footer */}
        <div className="modal-footer">
          {isPurchased ? (
            <button className="purchase-cta-btn purchased" disabled>
              Purchased Successfully
            </button>
          ) : (
            <button 
              className={`purchase-cta-btn ${!canAfford ? 'disabled' : ''}`}
              onClick={() => canAfford && onPurchase(lead)}
              disabled={!canAfford}
            >
              <span>Purchase Lead</span>
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

LeadDetailsModal.propTypes = {
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
  onPurchase: PropTypes.func.isRequired,
  walletBalance: PropTypes.number.isRequired
};
