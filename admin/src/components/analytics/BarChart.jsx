import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Star } from 'lucide-react';
import './Analytics.css';

export default function BarChart({ data }) {
  const { t } = useTranslation();
  const [hoveredBar, setHoveredBar] = useState(null);

  // Fill in missing ratings (1 to 5 stars)
  const getFullRatingData = () => {
    const ratingMap = new Map(data.map(item => [item._id, item.count]));
    const result = [];

    for (let r = 5; r >= 1; r--) {
      result.push({
        rating: r,
        count: ratingMap.get(r) || 0
      });
    }
    return result;
  };

  const ratingData = getFullRatingData();
  const maxCount = Math.max(...ratingData.map(d => d.count), 5); // Default max to 5 to avoid flat charts

  // SVG dimensions
  const width = 500;
  const height = 200;
  const padding = 30;

  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const barWidth = 40;
  const barGap = (chartWidth - barWidth * ratingData.length) / (ratingData.length - 1);

  return (
    <div className="analytics-chart-card glass-card">
      <h4 className="chart-title">{t('analytics.feedbackRatings')}</h4>
      <div className="chart-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="analytics-svg">
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-warning)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--accent-warning)" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding + ratio * chartHeight;
            const val = Math.round(maxCount * (1 - ratio));
            return (
              <g key={idx} className="grid-line-group">
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="chart-axis-text"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {ratingData.map((d, idx) => {
            const x = padding + idx * (barWidth + barGap);
            const barHeight = (d.count / maxCount) * chartHeight;
            const y = padding + chartHeight - barHeight;

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredBar(d)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Bar rectangle */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="url(#barGradient)"
                  rx="4"
                  className="chart-bar"
                />
                {/* Invisible taller rect for easier hover */}
                <rect
                  x={x}
                  y={padding}
                  width={barWidth}
                  height={chartHeight}
                  fill="transparent"
                />
              </g>
            );
          })}

          {/* X Axis Labels */}
          {ratingData.map((d, idx) => {
            const x = padding + idx * (barWidth + barGap) + barWidth / 2;
            return (
              <g key={idx} className="bar-label-group">
                <text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  className="chart-axis-text"
                >
                  {d.rating} ★
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredBar && (
          <div
            className="chart-tooltip glass-card"
            style={{
              position: 'absolute',
              left: `${((padding + ratingData.findIndex(d => d.rating === hoveredBar.rating) * (barWidth + barGap) + barWidth / 2 - padding) / chartWidth) * 80 + 10}%`,
              top: `${((padding + chartHeight - (hoveredBar.count / maxCount) * chartHeight - padding) / chartHeight) * 50 + 10}%`,
            }}
          >
            <span className="tooltip-date" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {hoveredBar.rating} <Star size={12} fill="var(--accent-warning)" color="var(--accent-warning)" />
            </span>
            <span className="tooltip-value">
              {hoveredBar.count} {t('feedback.title')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
