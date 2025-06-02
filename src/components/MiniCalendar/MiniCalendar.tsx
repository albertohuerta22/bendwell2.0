import React, { useState } from 'react';
import './MiniCalendar.scss';

interface MiniCalendarProps {
  activeDates?: string[]; // Array of active dates in 'YYYY-MM-DD' format
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ activeDates = [] }) => {
  const [currentDate] = useState(new Date());
  const [currentMonth] = useState(currentDate.getMonth());
  const [currentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Get last few days of previous month to fill the first week
  const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Calendar header
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const isDateActive = (year: number, month: number, day: number) => {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;
    return activeDates.includes(date);
  };

  const renderCalendarDays = () => {
    const days = [];

    // Previous month days
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const prevMonth = currentMonth - 1;
      const year = prevMonth < 0 ? currentYear - 1 : currentYear;
      const month = prevMonth < 0 ? 11 : prevMonth;

      days.push(
        <div key={`prev-${day}`} className="calendar-day prev-month">
          {day}
          {isDateActive(year, month, day) && <span className="activity-dot" />}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === currentDate.getDate() &&
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear();

      days.push(
        <div
          key={`current-${day}`}
          className={`calendar-day ${isToday ? 'today' : ''}`}
        >
          {day}
          {isDateActive(currentYear, currentMonth, day) && (
            <span className="activity-dot" />
          )}
        </div>
      );
    }

    // Next month days
    const totalDays = days.length;
    const remainingDays = 42 - totalDays; // 6 rows * 7 days = 42

    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = currentMonth + 1;
      const year = nextMonth > 11 ? currentYear + 1 : currentYear;
      const month = nextMonth > 11 ? 0 : nextMonth;

      days.push(
        <div key={`next-${day}`} className="calendar-day next-month">
          {day}
          {isDateActive(year, month, day) && <span className="activity-dot" />}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="mini-calendar">
      <div className="calendar-header">
        <div className="month-year">
          {months[currentMonth]} {currentYear}
        </div>
      </div>
      <div className="weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">{renderCalendarDays()}</div>
    </div>
  );
};

export default MiniCalendar;
