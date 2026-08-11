import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './CustomDatePicker.css';

export default function CustomDatePicker({ startDate, endDate, onChange, placeholder = 'Select Date Range' }) {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
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

  // Localized month names
  const getMonthNames = () => {
    const formatter = new Intl.DateTimeFormat(language, { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2026, i, 1)));
  };

  // Localized day names
  const getDayNames = () => {
    const formatter = new Intl.DateTimeFormat(language, { weekday: 'narrow' });
    return Array.from({ length: 7 }, (_, i) => formatter.format(new Date(2026, 0, 4 + i))); // Jan 4, 2026 is Sunday
  };

  const monthNames = getMonthNames();
  const dayNames = getDayNames();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Get first day of month (0 = Sunday, 6 = Saturday)
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(year, month, day);
    clickedDate.setHours(0, 0, 0, 0);

    if (!startDate || (startDate && endDate)) {
      // Start new range selection
      onChange(clickedDate, null);
    } else {
      // Select end date
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      if (clickedDate < start) {
        // If clicked date is before start date, make it the new start date
        onChange(clickedDate, null);
      } else {
        onChange(start, clickedDate);
        setIsOpen(false); // Close dropdown after range selection is complete
      }
    }
  };

  const isSelected = (day) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      if (date.getTime() === start.getTime()) return true;
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);
      if (date.getTime() === end.getTime()) return true;
    }

    return false;
  };

  const isInRange = (day) => {
    if (!startDate || !endDate) return false;
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    return date > start && date < end;
  };

  const formatDateDisplay = () => {
    if (!startDate) return placeholder;
    const startStr = new Date(startDate).toLocaleDateString(language, { month: 'short', day: 'numeric', year: 'numeric' });
    if (!endDate) return `${startStr} - ...`;
    const endStr = new Date(endDate).toLocaleDateString(language, { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startStr} - ${endStr}`;
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null, null);
  };

  // Generate calendar grid
  const calendarCells = [];
  // Empty cells before first day of month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
  }
  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const selected = isSelected(d);
    const inRange = isInRange(d);
    calendarCells.push(
      <button
        key={`day-${d}`}
        type="button"
        onClick={() => handleDayClick(d)}
        className={`calendar-cell day-cell ${selected ? 'selected' : ''} ${inRange ? 'in-range' : ''}`}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="custom-date-picker" ref={dropdownRef}>
      <button
        type="button"
        className={`date-picker-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon size={16} className="calendar-icon" />
        <span className="trigger-text">{formatDateDisplay()}</span>
        {startDate && (
          <button type="button" className="clear-date-btn" onClick={handleClear}>
            <X size={14} />
          </button>
        )}
      </button>

      {isOpen && (
        <div className="date-picker-dropdown animate-fade-in">
          <div className="calendar-header">
            <button type="button" onClick={handlePrevMonth} className="month-nav-btn">
              <ChevronLeft size={16} />
            </button>
            <span className="month-year-label">
              {monthNames[month]} {year}
            </span>
            <button type="button" onClick={handleNextMonth} className="month-nav-btn">
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="day-names-grid">
            {dayNames.map((name, idx) => (
              <div key={`dayname-${idx}`} className="day-name-cell">
                {name}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarCells}
          </div>
        </div>
      )}
    </div>
  );
}
