import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Users, CheckCircle, Clock, Star } from 'lucide-react';
import './StatsCard.css';

function StatsCard({ type, count, label }) {
  const getCardDetails = () => {
    switch (type) {
      case 'total':
        return {
          icon: Users,
          iconClass: 'total-icon',
          bgClass: 'total-bg'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          iconClass: 'approved-icon',
          bgClass: 'approved-bg'
        };
      case 'pending':
        return {
          icon: Clock,
          iconClass: 'pending-icon',
          bgClass: 'pending-bg'
        };
      case 'new':
        return {
          icon: Star,
          iconClass: 'new-icon',
          bgClass: 'new-bg'
        };
      default:
        return {
          icon: Users,
          iconClass: 'total-icon',
          bgClass: 'total-bg'
        };
    }
  };

  const details = getCardDetails();
  const Icon = details.icon;

  return (
    <div className="stats-card animate-scale-in">
      <div className={`stats-icon-container ${details.bgClass}`}>
        <Icon size={24} className={details.iconClass} />
      </div>
      <div className="stats-info">
        <h3 className="stats-count">{count}</h3>
        <p className="stats-label">{label}</p>
      </div>
    </div>
  );
}

StatsCard.propTypes = {
  type: PropTypes.oneOf(['total', 'approved', 'pending', 'new']).isRequired,
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
};

export default memo(StatsCard);
