import React from 'react';
import { Link } from 'react-router-dom';
import MiniCalendar from '../MiniCalendar/MiniCalendar';
import './Sidebar.scss';

const links = [
  { name: 'Browse Class', to: '/classes' },
  { name: 'Join Programs', to: '/programs' },
  { name: 'Add Friends', to: '/friends' },
];

// TODO: Replace with real activity data from your backend
const sampleActiveDates = [
  '2024-05-01',
  '2024-05-03',
  '2024-05-07',
  '2024-05-10',
  '2024-05-15',
];

export const Sidebar: React.FC = () => (
  <aside className="sidebar">
    <MiniCalendar activeDates={sampleActiveDates} />
    <ul className="sidebar-links">
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className="sidebar-button">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
