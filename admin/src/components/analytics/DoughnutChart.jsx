import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import './Analytics.css';

export default function DoughnutChart({ data }) {
  const { t } = useTranslation();
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Format data
  const formattedData = [
    {
      label: t('support.new'),
      count: data.find(d => d._id === 'pending')?.count || 0,
      color: 'var(--accent-warning)'
    },
    {
      label: t('support.closed'),
      count: data.find(d => d._id === 'resolved')?.count || 0,
      color: 'var(--accent-success)'
    }
  ];

  const totalCount = formattedData.reduce((sum, d) => sum + d.count, 0);

  // SVG dimensions
  const size = 200;
  const center = size / 2;
  const radius = 70;
  const strokeWidth = 20;

  // Calculate arcs
  let accumulatedAngle = -Math.PI / 2; // Start from top

  const segments = formattedData.map((d) => {
    const percentage = totalCount > 0 ? d.count / totalCount : 0.5; // Equal segments if total is 0
    const angle = percentage * Math.PI * 2;

    // Calculate path coordinates
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    accumulatedAngle = endAngle;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = angle > Math.PI ? 1 : 0;

    // SVG path for arc
    const pathData = totalCount > 0
      ? `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
      : '';

    return {
      ...d,
      pathData,
      percentage
    };
  });

  return (
    <div className="analytics-chart-card glass-card">
      <h4 className="chart-title">{t('analytics.supportStatus')}</h4>
      <div className="chart-container doughnut-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ position: 'relative', width: size, height: size }}>
          <svg viewBox={`0 0 ${size} ${size}`} className="analytics-svg">
            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={strokeWidth}
            />

            {/* Segments */}
            {totalCount > 0 && segments.map((seg, idx) => (
              <path
                key={idx}
                d={seg.pathData}
                fill="none"
                stroke={seg.color}
                strokeWidth={hoveredSegment?.label === seg.label ? strokeWidth + 4 : strokeWidth}
                className="doughnut-segment"
                style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
                onMouseEnter={() => setHoveredSegment(seg)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            ))}
          </svg>

          {/* Center text */}
          <div className="doughnut-center-text flex-center">
            <span className="doughnut-total-num">{totalCount}</span>
            <span className="doughnut-total-label">{t('support.requests')}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="chart-legend" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {segments.map((seg, idx) => (
            <div
              key={idx}
              className="legend-item"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredSegment(seg)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <span className="legend-color-dot" style={{ width: '12px', height: '12px', borderRadius: '50%', background: seg.color }}></span>
              <span className="legend-label" style={{ fontSize: '0.9rem', fontWeight: hoveredSegment?.label === seg.label ? '600' : '400' }}>
                {seg.label}: <strong>{seg.count}</strong> ({Math.round(seg.percentage * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
