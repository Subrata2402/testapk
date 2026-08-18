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
  const isApi = cleanLine.includes('[API]');

  if (isRequest || isResponse || isApi) {
    const metaMatch = cleanLine.match(/^\[(.*?)\] \[(.*?)\]:\s*/);
    const metaPrefix = metaMatch ? metaMatch[0] : '';
    const remainingLine = metaPrefix ? cleanLine.substring(metaPrefix.length) : cleanLine;
    
    const headersIndex = remainingLine.indexOf(' - Headers: ');
    const bodyIndex = remainingLine.indexOf(' - Body: ');
    const responseIndex = remainingLine.indexOf(' - Response: ');
    
    let headersStr = '';
    let bodyStr = '';
    let responseStr = '';
    let infoPart = remainingLine;
    
    if (headersIndex !== -1) {
      infoPart = remainingLine.substring(0, headersIndex);
      if (bodyIndex !== -1) {
        headersStr = remainingLine.substring(headersIndex + 12, bodyIndex);
        if (responseIndex !== -1) {
          bodyStr = remainingLine.substring(bodyIndex + 9, responseIndex);
          responseStr = remainingLine.substring(responseIndex + 13);
        } else {
          bodyStr = remainingLine.substring(bodyIndex + 9);
        }
      } else if (responseIndex !== -1) {
        headersStr = remainingLine.substring(headersIndex + 12, responseIndex);
        responseStr = remainingLine.substring(responseIndex + 13);
      } else {
        headersStr = remainingLine.substring(headersIndex + 12);
      }
    } else if (bodyIndex !== -1) {
      infoPart = remainingLine.substring(0, bodyIndex);
      if (responseIndex !== -1) {
        bodyStr = remainingLine.substring(bodyIndex + 9, responseIndex);
        responseStr = remainingLine.substring(responseIndex + 13);
      } else {
        bodyStr = remainingLine.substring(bodyIndex + 9);
      }
    } else if (responseIndex !== -1) {
      infoPart = remainingLine.substring(0, responseIndex);
      responseStr = remainingLine.substring(responseIndex + 13);
    }
    
    let prettyHeaders = '';
    if (headersStr) {
      const parsed = tryParsePartialJSON(headersStr);
      if (parsed) {
        prettyHeaders = JSON.stringify(parsed, null, 2);
      } else {
        prettyHeaders = headersStr;
      }
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

    let prettyResponse = '';
    if (responseStr) {
      const parsed = tryParsePartialJSON(responseStr);
      if (parsed) {
        prettyResponse = JSON.stringify(parsed, null, 2);
        if (responseStr.includes('[TRUNCATED]')) {
          prettyResponse += '\n... [TRUNCATED]';
        }
      } else {
        prettyResponse = responseStr;
      }
    }

    let statusColorClass = 'health-status-success';
    if (isApi || isResponse) {
      const statusMatch = infoPart.match(/\s(\d{3})\s/);
      if (statusMatch) {
        const statusCode = parseInt(statusMatch[1], 10);
        if (statusCode >= 400) {
          statusColorClass = 'health-status-error';
        } else if (statusCode >= 300) {
          statusColorClass = 'health-status-warning';
        }
      }
    }
    
    let badgeText = 'API';
    let badgeClass = 'health-log-api';
    if (isRequest) {
      badgeText = 'REQ';
      badgeClass = 'health-log-req';
    } else if (isResponse) {
      badgeText = 'RES';
      badgeClass = 'health-log-res';
    }
    
    return (
      <div className="health-log-block">
        <div className="health-log-meta">
          {metaPrefix.trim()}
        </div>
        <div 
          className={`health-log-header-line ${badgeClass} ${statusColorClass} health-log-collapsible`}
          onClick={onToggle}
        >
          <span className="health-log-badge">{badgeText}</span>
          <span className="health-log-info">{infoPart.replace(/^\[(Request|Response|API)\]\s*/, '')}</span>
          {(prettyHeaders || prettyBody || prettyResponse) && (
            <span className="health-log-toggle-icon">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
        </div>
        <div className={`health-log-body-wrapper ${isExpanded ? 'expanded' : ''}`}>
          <div className="health-log-body-content">
            {prettyHeaders && (
              <div className="health-log-section">
                <div className="health-log-section-title">Headers</div>
                <pre className="health-log-json">
                  {prettyHeaders}
                </pre>
              </div>
            )}
            {prettyBody && (
              <div className="health-log-section">
                <div className="health-log-section-title">Body</div>
                <pre className="health-log-json">
                  {prettyBody}
                </pre>
              </div>
            )}
            {prettyResponse && (
              <div className="health-log-section">
                <div className="health-log-section-title">Response</div>
                <pre className="health-log-json">
                  {prettyResponse}
                </pre>
              </div>
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
