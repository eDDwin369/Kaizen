import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import './LeadCard.css';

function LeadCard({ lead, onViewLead }) {
  // Helper to map status to the corresponding index.css badge classes
  const getBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'badge-new';
      case 'In Discussion': return 'badge-indiscussion';
      case 'Purchased': return 'badge-purchased';
      case 'Ready to close': return 'badge-readytoclose';
      case 'No response': return 'badge-noresponse';
      case 'Re-engaging': return 'badge-reengaging';
      case 'Accepted': return 'badge-accepted';
      case 'Disbursed': return 'badge-disbursed';
      case 'Settled': return 'badge-settled';
      default: return 'badge-new';
    }
  };

  return (
    <div className="lead-card animate-fade-in">
      <div className="lead-card-header">
        <h4 className="lead-id-title">{lead.id}</h4>
      </div>
      
      <div className="lead-card-body">
        <div className="lead-info-row">
          <span className="lead-info-label">Applied Amount</span>
          <span className="lead-info-value">{formatCurrency(lead.appliedAmount)}</span>
        </div>
        
        <div className="lead-info-row">
          <span className="lead-info-label">Status</span>
          <span className={`badge ${getBadgeClass(lead.status)}`}>
            • {lead.status}
          </span>
        </div>
      </div>
      
      <div className="lead-card-divider" />
      
      <button 
        className="lead-view-btn"
        onClick={() => onViewLead(lead)}
      >
        <span>View Lead</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

LeadCard.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.string.isRequired,
    appliedAmount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired,
  onViewLead: PropTypes.func.isRequired
};

export default memo(LeadCard);
