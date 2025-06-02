import React from 'react';
import { Link } from 'react-router-dom';
import './CategoriesBar.scss';

interface Category {
  id: string;
  name: string;
  route: string;
}

const categories: Category[] = [
  { id: '1', name: 'Neck', route: '/stretches/category/neck' },
  { id: '2', name: 'Back', route: '/stretches/category/back' },
  { id: '3', name: 'Abs', route: '/stretches/category/abs' },
  { id: '4', name: 'Legs', route: '/stretches/category/legs' },
  { id: '5', name: 'Arms', route: '/stretches/category/arms' },
  { id: '6', name: 'Shoulders', route: '/stretches/category/shoulders' },
  // add more categories as needed
];

const CategoriesBar: React.FC = () => (
  <nav className="categories-bar">
    <ul className="categories-list">
      {categories.map((cat) => (
        <li key={cat.id} className="category-item">
          <Link to={cat.route}>{cat.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default CategoriesBar;
