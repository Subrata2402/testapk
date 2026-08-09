import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './CustomDropdown.css';

export default function CustomDropdown({ options, value, onChange, placeholder = 'Select option' }) {
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

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="trigger-content">
          {selectedOption.flag && <span className="dropdown-item-flag">{selectedOption.flag}</span>}
          <span>{selectedOption.label}</span>
        </div>
        <ChevronDown size={16} className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
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
