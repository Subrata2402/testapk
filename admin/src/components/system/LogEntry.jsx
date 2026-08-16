import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const tryParsePartialJSON = (str) => {
  let cleanStr = str.replace(/\.\.\.\s*\[TRUNCATED\]$/, '').trim();
  try {
    return JSON.parse(cleanStr);
  } catch (e) {
    let temp = cleanStr;
    const openBrackets = [];
    for (let i = 0; i < temp.length; i++) {
      const char = temp[i];
      if (char === '{' || char === '[') {
        openBrackets.push(char);
      } else if (char === '}' || char === ']') {
        const last = openBrackets[openBrackets.length - 1];
        if ((char === '}' && last === '{') || (char === ']' && last === '[')) {
          openBrackets.pop();
        }
      }
    }
    while (openBrackets.length > 0) {
      const last = openBrackets.pop();
      temp += last === '{' ? '}' : ']';
    }
    try {
      return JSON.parse(temp);
    } catch (err) {
      return null;
    }
  }
};

export default function LogEntry({ line, isExpanded, onToggle }) {
  // Strip ANSI color codes robustly (handles both escape characters and literal representations)
  const cleanLine = line
    .replace(/\\u001b\[\d+m/g, '')
    .replace(/\u001b\[\d+m/g, '')
    .replace(/\x1B\[\d+m/g, '');
  
  let color = '#ffffff';
  if (cleanLine.includes('[error]') || cleanLine.includes('[ERROR]')) {
    color = '#ff4d4f';
  } else if (cleanLine.includes('[warn]') || cleanLine.includes('[WARN]')) {
    color = '#faad14';
  } else if (cleanLine.includes('[info]') || cleanLine.includes('[INFO]')) {
    color = '#52c41a';
  } else if (cleanLine.includes('[debug]') || cleanLine.includes('[DEBUG]')) {
    color = '#1890ff';
  }

  const isRequest = cleanLine.includes('[Request]');
  const isResponse = cleanLine.includes('[Response]');

  if (isRequest || isResponse) {
    const metaMatch = cleanLine.match(/^\[(.*?)\] \[(.*?)\]:\s*/);
    const metaPrefix = metaMatch ? metaMatch[0] : '';
    const remainingLine = metaPrefix ? cleanLine.substring(metaPrefix.length) : cleanLine;
    
    const bodyIndex = remainingLine.indexOf(' - Body: ');
    let bodyStr = '';
    let infoPart = remainingLine;
    if (bodyIndex !== -1) {
      infoPart = remainingLine.substring(0, bodyIndex);
      bodyStr = remainingLine.substring(bodyIndex + 9);
    }
    
    let prettyBody = '';
    if (bodyStr) {
      const parsed = tryParsePartialJSON(bodyStr);
      if (parsed) {
        prettyBody = JSON.stringify(parsed, null, 2);
        if (bodyStr.includes('[TRUNCATED]')) {
          prettyBody += '\n... [TRUNCATED]';
        }
      } else {
        prettyBody = bodyStr;
      }
    }

    let statusColorClass = 'health-status-success';
    if (isResponse) {
      const statusMatch = infoPart.match(/\s(\d{3})\s-\s/);
      if (statusMatch) {
        const statusCode = parseInt(statusMatch[1], 10);
        if (statusCode >= 400) {
          statusColorClass = 'health-status-error';
        } else if (statusCode >= 300) {
          statusColorClass = 'health-status-warning';
        }
      }
    }
    
    return (
      <div className="health-log-block">
        <div className="health-log-meta">
          {metaPrefix.trim()}
        </div>
        <div 
          className={`health-log-header-line ${isRequest ? 'health-log-req' : `health-log-res ${statusColorClass}`} health-log-collapsible`}
          onClick={onToggle}
        >
          <span className="health-log-badge">{isRequest ? 'REQ' : 'RES'}</span>
          <span className="health-log-info">{infoPart.replace(/^\[(Request|Response)\]\s*/, '')}</span>
          {prettyBody && (
            <span className="health-log-toggle-icon">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
        </div>
        <div className={`health-log-body-wrapper ${isExpanded ? 'expanded' : ''}`}>
          <div className="health-log-body-content">
            {prettyBody && (
              <pre className="health-log-json">
                {prettyBody}
              </pre>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ color }} className="font-monospace text-sm mb-1">
      {cleanLine}
    </div>
  );
}
