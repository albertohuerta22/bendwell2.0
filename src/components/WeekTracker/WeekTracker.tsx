import React from 'react';
import './WeekTracker.scss';

const days = [
  { key: 'mon', label: 'M' },
  { key: 'tue', label: 'T' },
  { key: 'wed', label: 'W' },
  { key: 'thu', label: 'TH' },
  { key: 'fri', label: 'F' },
  { key: 'sat', label: 'S' },
  { key: 'sun', label: 'SU' },
];

interface WeekTrackerProps {
  // Optional: an object mapping day index (0-6) to boolean active
  activeDays?: Record<number, boolean>;
}

const WeekTracker: React.FC<WeekTrackerProps> = ({ activeDays = {} }) => {
  return (
    <div className="week-tracker">
      {days.map((day, idx) => (
        <div
          key={day.key}
          className={`day-circle ${activeDays[idx] ? 'active' : ''}`}
        >
          {day.label}
        </div>
      ))}
    </div>
  );
};

export default WeekTracker;
