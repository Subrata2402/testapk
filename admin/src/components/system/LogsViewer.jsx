import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Terminal, Search, AlertTriangle, Trash2, Maximize2, Minimize2, X, ChevronsDown, ChevronsUp } from 'lucide-react';
import LogEntry from './LogEntry';

export default function LogsViewer({ logs, onClearLogs, t }) {
  const [logType, setLogType] = useState('all'); // 'all' or 'error'
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [expandedLogs, setExpandedLogs] = useState({});
  
  const terminalEndRef = useRef(null);
  const modalTerminalEndRef = useRef(null);

  const getLogLines = () => {
    if (!logs) return [];
    const rawLogs = logType === 'error' ? logs.error : logs.all;
    
    // Convert to array if it is an object (e.g. {"0": "...", "1": "..."})
    const logsArray = Array.isArray(rawLogs) 
      ? rawLogs 
      : Object.values(rawLogs || {});
      
    // Filter by search query
    if (!searchQuery) return logsArray;
    return logsArray.filter(line => line.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const hasExpandedLogs = Object.values(expandedLogs).some(Boolean);

  const handleToggleAllLogs = () => {
    if (hasExpandedLogs) {
      setExpandedLogs({});
    } else {
      const collapsibleLines = getLogLines().filter(line => {
        const cleanLine = line
          .replace(/\\u001b\[\d+m/g, '')
          .replace(/\u001b\[\d+m/g, '')
          .replace(/\x1B\[\d+m/g, '');
        return (cleanLine.includes('[Request]') || cleanLine.includes('[Response]') || cleanLine.includes('[API]')) && 
          (cleanLine.includes(' - Body: ') || cleanLine.includes(' - Headers: ') || cleanLine.includes(' - Response: '));
      });
      const newExpanded = {};
      collapsibleLines.forEach(line => {
        newExpanded[line] = true;
      });
      setExpandedLogs(newExpanded);
    }
  };

  // Scroll to bottom of terminal when logs, logType, or full screen state changes
  useEffect(() => {
    if (isFullScreen) {
      if (modalTerminalEndRef.current) {
        modalTerminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (terminalEndRef.current) {
        terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [logs, logType, isFullScreen]);

  const renderTerminalContent = (ref) => {
    const lines = getLogLines();
    return lines.length > 0 ? (
      <>
        {lines.map((line, idx) => (
          <LogEntry
            key={idx}
            line={line}
            isExpanded={!!expandedLogs[line]}
            onToggle={() => setExpandedLogs(prev => ({ ...prev, [line]: !prev[line] }))}
          />
        ))}
        <div ref={ref} />
      </>
    ) : (
      <div className="health-terminal-empty">
        <AlertTriangle size={32} className="health-terminal-empty-icon" />
        <span>{t('system.noLogs') || 'No matching log entries found'}</span>
      </div>
    );
  };

  const renderHeader = (isModal) => {
    return (
      <div className="health-logs-header">
        <div className="health-logs-title-group">
          <Terminal size={18} className="text-muted" />
          <h4>{t('system.logsViewer') || 'Logs Viewer'}</h4>
          <div className="health-logs-tabs">
            <button
              onClick={() => setLogType('all')}
              className={`health-logs-tab-btn ${logType === 'all' ? 'health-logs-tab-btn-all' : 'health-logs-tab-btn-inactive'}`}
            >
              {t('system.allLogs') || 'All Logs'}
            </button>
            <button
              onClick={() => setLogType('error')}
              className={`health-logs-tab-btn ${logType === 'error' ? 'health-logs-tab-btn-error' : 'health-logs-tab-btn-inactive'}`}
            >
              {t('system.errorLogs') || 'Error Logs'}
            </button>
          </div>
        </div>

        <div className="health-logs-actions">
          <div className="search-input-wrapper health-logs-search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t('system.searchLogs') || 'Filter logs...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="search-clear-btn"
                type="button"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={handleToggleAllLogs}
            className="btn btn-secondary health-clear-btn"
            title={hasExpandedLogs ? "Collapse All" : "Expand All"}
          >
            {hasExpandedLogs ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
          </button>
          <button
            onClick={onClearLogs}
            className="btn btn-danger health-clear-btn"
            title="Clear Logs"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => setIsFullScreen(!isModal)}
            className="btn btn-secondary health-clear-btn"
            title={isModal ? "Exit Full Screen" : "Full Screen"}
          >
            {isModal ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="glass-card health-logs-card">
        {renderHeader(false)}
        <div className="health-terminal-box">
          {renderTerminalContent(terminalEndRef)}
        </div>
      </div>

      {isFullScreen && createPortal(
        <div className="health-logs-modal-overlay">
          <div className="health-logs-modal-content glass-card">
            {renderHeader(true)}
            <div className="health-terminal-box modal-terminal">
              {renderTerminalContent(modalTerminalEndRef)}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
