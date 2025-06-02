import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const links = [
  { name: 'Browse Class', to: '/classes' },
  { name: 'Join Programs', to: '/programs' },
  { name: 'Add Friends', to: '/friends' },
];

export const Sidebar: React.FC = () => (
  <aside className="sidebar">
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
