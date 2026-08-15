import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import './CustomDropdown.css';

export default function CustomDropdown({ options, value, onChange, placeholder = 'Select option', disabled = false, loading = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedInsideTrigger = dropdownRef.current && dropdownRef.current.contains(event.target);
      const clickedInsideMenu = menuRef.current && menuRef.current.contains(event.target);
      if (!clickedInsideTrigger && !clickedInsideMenu) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on scroll or resize
  useEffect(() => {
    if (isOpen) {
      const handleScrollOrResize = () => setIsOpen(false);
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);
      return () => {
        window.removeEventListener('scroll', handleScrollOrResize, true);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    }
  }, [isOpen]);

  // Calculate menu position when opened
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const upward = spaceBelow < 250;
      setOpenUpward(upward);

      setMenuStyle({
        position: 'absolute',
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        top: upward 
          ? `${rect.top + window.scrollY - 6}px` 
          : `${rect.bottom + window.scrollY + 6}px`,
        transform: upward ? 'translateY(-100%)' : 'none',
        zIndex: 9999,
      });
    }
  }, [isOpen]);

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

      {isOpen && !disabled && !loading && createPortal(
        <div 
          ref={menuRef}
          className={`dropdown-menu animate-fade-in ${openUpward ? 'upward' : ''}`}
          style={menuStyle}
        >
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
        </div>,
        document.body
      )}
    </div>
  );
}
