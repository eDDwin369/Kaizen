import React from 'react';
import PropTypes from 'prop-types';
import './Gauge.css';

export default function Gauge({ percentage, date = "Mar 2026" }) {
  const score = Math.max(0, Math.min(100, percentage));
  
  // Center coordinates & radius for the SVG arc
  const cx = 150;
  const cy = 132;
  const r = 110;
  const rDots = 92;
  const strokeWidth = 11;

  // Polar to Cartesian conversion
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY - radius * Math.sin(angleInRadians)
    };
  };

  // Helper to describe SVG path for a clockwise arc (sweep-flag = 1)
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, startAngle);
    const end = polarToCartesian(x, y, radius, endAngle);
    const largeArcFlag = startAngle - endAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  // Gap offset in degrees to separate segments nicely with rounded caps
  const gapOffset = 4.8;
  const startRetract = 2.5;
  const endRetract = 2.5;

  // Segment angles corresponding to bounds: 0 -> 50 -> 75 -> 88 -> 100
  // Red (0-50%): 180deg to 90deg
  const redPath = describeArc(cx, cy, r, 180 - startRetract, 90 + gapOffset);
  // Yellow (50-75%): 90deg to 45deg
  const yellowPath = describeArc(cx, cy, r, 90 - gapOffset, 45 + gapOffset);
  // Orange (75-88%): 45deg to 21.6deg
  const orangePath = describeArc(cx, cy, r, 45 - gapOffset, 21.6 + gapOffset);
  // Green (88-100%): 21.6deg to 0deg
  const greenPath = describeArc(cx, cy, r, 21.6 - gapOffset, 0 + endRetract);

  // Inner dotted track path: continuous semi-circle from 178 to 2 degrees
  const dottedPath = describeArc(cx, cy, rDots, 178, 2);

  // Pointer position calculation along the center of the arc
  const pointerAngle = 180 - (score * 1.8);
  const pt = polarToCartesian(cx, cy, r, pointerAngle);

  // Determine pointer color dynamically based on score segment
  const getSegmentColor = (val) => {
    if (val < 50) return '#ea4335'; // Red
    if (val < 75) return '#fbbc05'; // Yellow
    if (val < 88) return '#e67c0b'; // Orange
    return '#0f9d58'; // Green
  };
  const knobColor = getSegmentColor(score);

  // Get score status details: label, colors and badge background
  const getScoreInfo = (val) => {
    if (val >= 88) {
      return { label: 'Excellent', color: '#166534', bg: '#f0fdf4', border: '#bbf7d0' };
    }
    if (val >= 75) {
      // Light blue theme for "Fair" as shown in mockup
      return { label: 'Fair', color: '#0284c7', bg: '#e0f2fe', border: '#bae6fd' };
    }
    if (val >= 50) {
      return { label: 'Good', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe' };
    }
    return { label: 'Needs Work', color: '#b91c1c', bg: '#fef2f2', border: '#fecaca' };
  };

  const info = getScoreInfo(score);

  return (
    <div className="gauge-component-container">
      <div className="gauge-section">
        {/* Custom SVG Arc Gauge */}
        <svg 
          viewBox="0 0 300 150" 
          className="gauge-svg"
          style={{ width: '100%', maxWidth: '260px', height: 'auto', display: 'block' }}
        >
          {/* Inner Dotted Concentric Circle Track */}
          <path 
            d={dottedPath} 
            fill="none" 
            stroke="#b1b5c0" 
            strokeWidth="2" 
            strokeDasharray="0, 7.5" 
            strokeLinecap="round" 
          />

          {/* Outer Gauge Color Segments */}
          <path 
            d={redPath} 
            fill="none" 
            stroke="#ea4335" 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path 
            d={yellowPath} 
            fill="none" 
            stroke="#fbbc05" 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path 
            d={orangePath} 
            fill="none" 
            stroke="#e67c0b" 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path 
            d={greenPath} 
            fill="none" 
            stroke="#0f9d58" 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />

          {/* Pointer Outer Glow and Knob */}
          <circle 
            cx={pt.x} 
            cy={pt.y} 
            r="15" 
            fill={knobColor} 
            opacity="0.22" 
            style={{ filter: 'blur(2px)' }} 
          />
          <circle 
            cx={pt.x} 
            cy={pt.y} 
            r="10.5" 
            fill={knobColor} 
            stroke="#ffffff"
            strokeWidth="0.5"
          />
          <circle 
            cx={pt.x} 
            cy={pt.y} 
            r="3.5" 
            fill="#ffffff" 
          />

          {/* Center Text Labels */}
          <text 
            x="150" 
            y="76" 
            textAnchor="middle" 
            style={{ 
              fontSize: '34px', 
              fontWeight: '800', 
              fill: '#1f2937',
              fontFamily: "'Outfit', 'Inter', sans-serif" 
            }}
          >
            {score}%
          </text>
          
          <text 
            x="150" 
            y="100" 
            textAnchor="middle" 
            style={{ 
              fontSize: '13px', 
              fontWeight: '600', 
              fill: '#1f2937',
              fontFamily: "'Outfit', 'Inter', sans-serif" 
            }}
          >
            Eligibility Score
          </text>

          <text 
            x="150" 
            y="117" 
            textAnchor="middle" 
            style={{ 
              fontSize: '11px', 
              fontWeight: '400', 
              fill: '#9ca3af',
              fontFamily: "'Outfit', 'Inter', sans-serif" 
            }}
          >
            {date}
          </text>
        </svg>

        {/* Dynamic Category Badge below the baseline */}
        <div 
          className="gauge-score-badge"
          style={{
            backgroundColor: info.bg,
            color: info.color,
            borderColor: info.border,
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: 'none',
            fontSize: '0.78rem',
            fontWeight: '600',
            padding: '3px 20px',
            borderRadius: '100px',
            marginTop: '-5px',
            display: 'inline-block',
            textAlign: 'center',
            fontFamily: "'Outfit', 'Inter', sans-serif"
          }}
        >
          {info.label}
        </div>
      </div>
    </div>
  );
}

Gauge.propTypes = {
  percentage: PropTypes.number.isRequired,
  date: PropTypes.string
};
