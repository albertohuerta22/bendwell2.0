import React from 'react';
import { Category, categories } from './categories';
import './CategoriesBar.scss';

interface CategoriesBarProps {
  selectedCategories: string[];
  onCategoryClick: (category: Category) => void;
  onRemoveCategory: (categoryValue: string) => void;
}

const CategoriesBar: React.FC<CategoriesBarProps> = ({
  selectedCategories,
  onCategoryClick,
  onRemoveCategory,
}) => {
  return (
    <div className="categories-section">
      <nav className="categories-bar">
        <ul className="categories-list">
          {categories.map((cat) => (
            <li key={cat.id} className="category-item">
              <button
                className={`category-button ${
                  selectedCategories.includes(cat.value) ? 'active' : ''
                }`}
                onClick={() => onCategoryClick(cat)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {selectedCategories.length > 0 && (
        <div className="selected-categories">
          <div className="selected-categories-list">
            {selectedCategories.map((categoryValue) => {
              const category = categories.find(
                (c) => c.value === categoryValue
              );
              return category ? (
                <span key={category.id} className="category-tag">
                  {category.name}
                  <button
                    className="remove-category"
                    onClick={() => onRemoveCategory(category.value)}
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
          {selectedCategories.length > 0 && (
            <button
              className="clear-all"
              onClick={() => selectedCategories.forEach(onRemoveCategory)}
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesBar;
