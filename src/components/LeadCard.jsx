import React from 'react';
import { ArrowRight } from 'lucide-react';
import './LeadCard.css';

export default function LeadCard({ lead, onViewLead }) {
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

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
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
