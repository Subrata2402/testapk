import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import './CustomDropdown.css';

export default function CustomDropdown({ options, value, onChange, placeholder = 'Select option', disabled = false, loading = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || { value, label: value || placeholder };

  const handleTriggerClick = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`custom-dropdown ${disabled || loading ? 'disabled' : ''}`} ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown-trigger ${isOpen ? 'open' : ''} ${disabled || loading ? 'disabled' : ''}`}
        onClick={handleTriggerClick}
        disabled={disabled || loading}
      >
        <div className="trigger-content">
          {selectedOption.flag && <span className="dropdown-item-flag">{selectedOption.flag}</span>}
          <span>{selectedOption.label}</span>
        </div>
        {loading ? (
          <Loader2 size={14} className="dropdown-spinner animate-spin" />
        ) : (
          <ChevronDown size={16} className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
        )}
      </button>

      {isOpen && !disabled && !loading && (
        <div className="dropdown-menu animate-fade-in">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.flag && <span className="dropdown-item-flag">{opt.flag}</span>}
                <span>{opt.label}</span>
                {isSelected && <Check size={14} className="check-icon" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
