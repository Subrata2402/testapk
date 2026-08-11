import React from 'react';
import { Loader2 } from 'lucide-react';
import './Switch.css';

export default function Switch({ checked, onChange, disabled = false, loading = false }) {
  const handleToggle = () => {
    if (!disabled && !loading) {
      onChange(!checked);
    }
  };

  return (
    <div className={`switch-container ${disabled || loading ? 'disabled' : ''}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`switch-track ${checked ? 'checked' : ''}`}
        onClick={handleToggle}
        disabled={disabled || loading}
      >
        <span className={`switch-thumb ${checked ? 'checked' : ''}`}>
          {loading && <Loader2 size={10} className="switch-spinner animate-spin" />}
        </span>
      </button>
    </div>
  );
}
