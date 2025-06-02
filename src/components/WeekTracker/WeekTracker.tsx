import React from 'react';
import './WeekTracker.scss';

const days = ['M', 'T', 'W', 'TH', 'F', 'S', 'SU'];

interface WeekTrackerProps {
  // Optional: an object mapping day index (0-6) to boolean active
  activeDays?: Record<number, boolean>;
}

const WeekTracker: React.FC<WeekTrackerProps> = ({ activeDays = {} }) => {
  return (
    <div className="week-tracker">
      {days.map((day, idx) => (
        <div
          key={day}
          className={`day-circle ${activeDays[idx] ? 'active' : ''}`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekTracker;
