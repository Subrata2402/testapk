import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import './Analytics.css';

export default function TrendChart({ data }) {
  const { t, language } = useTranslation();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Fill in missing days for the last 7 days
  const getFullTrendData = () => {
    const trendMap = new Map(data.map(item => [item._id, item.count]));
    const result = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      result.push({
        date: dateStr,
        count: trendMap.get(dateStr) || 0,
        label: d.toLocaleDateString(language, { month: 'short', day: 'numeric' })
      });
    }
    return result;
  };

  const trendData = getFullTrendData();
  const maxCount = Math.max(...trendData.map(d => d.count), 5); // Default max to 5 to avoid flat charts

  // SVG dimensions
  const width = 500;
  const height = 200;
  const padding = 30;

  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Calculate coordinates
  const points = trendData.map((d, index) => {
    const x = padding + (index / (trendData.length - 1)) * chartWidth;
    const y = padding + chartHeight - (d.count / maxCount) * chartHeight;
    return { x, y, ...d };
  });

  // Generate SVG path for line
  const linePath = points.reduce((path, p, index) => {
    return path + `${index === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }, '');

  // Generate SVG path for area fill
  const areaPath = linePath
    ? `${linePath} L ${points[points.length - 1].x} ${padding + chartHeight} L ${points[0].x} ${padding + chartHeight} Z`
    : '';

  return (
    <div className="analytics-chart-card glass-card">
      <h4 className="chart-title">{t('analytics.userTrend')}</h4>
      <div className="chart-container">
        <svg viewBox={`0 0 ${width} ${height}`} className="analytics-svg">
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
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

          {/* Area under the line */}
          {areaPath && <path d={areaPath} fill="url(#trendGradient)" />}

          {/* Line path */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Interactive points */}
          {points.map((p, idx) => (
            <g
              key={idx}
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Invisible larger circle for easier hovering */}
              <circle cx={p.x} cy={p.y} r="10" fill="transparent" />
              {/* Visible circle */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredPoint?.date === p.date ? '6' : '4'}
                fill="var(--accent-primary)"
                stroke="#fff"
                strokeWidth="2"
                className="chart-point"
              />
            </g>
          ))}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={height - 8}
              textAnchor="middle"
              className="chart-axis-text"
            >
              {p.label}
            </text>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="chart-tooltip glass-card"
            style={{
              position: 'absolute',
              left: `${((hoveredPoint.x - padding) / chartWidth) * 80 + 10}%`,
              top: `${((hoveredPoint.y - padding) / chartHeight) * 50 + 10}%`,
            }}
          >
            <span className="tooltip-date">{hoveredPoint.label}</span>
            <span className="tooltip-value">
              {hoveredPoint.count} {t('users.title')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
