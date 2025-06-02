import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import WeekTracker from '../../../components/WeekTracker/WeekTracker';
import CategoriesBar from '../../../components/CategoriesBar/CategoriesBar';
import { Category } from '../../../components/CategoriesBar/categories';
import Sidebar from '../../../components/SideBar/SideBar';
import Welcome from '../../../components/Welcome/Welcome';

//services
import {
  fetchAllStretches,
  fetchUserRoutines,
  addStretchToRoutine,
} from '../../../services/pages/stretches/AllStretchesService';

import './AllStretches.scss';

interface Stretch {
  id: string;
  name: string;
  target: string;
  stretchimages: string;
}

interface Routine {
  id: string;
  name: string;
}

const AllStretches = () => {
  const [stretches, setStretches] = useState<Stretch[]>([]);
  const [userRoutines, setUserRoutines] = useState<Routine[]>([]);
  const [selectedRoutineMap, setSelectedRoutineMap] = useState<{
    [stretchId: string]: string;
  }>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStretches = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAllStretches();
        setStretches(data || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch stretches';
        console.error('Failed to fetch stretches', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStretches();
  }, []);

  useEffect(() => {
    const fetchUserAndRoutines = async () => {
      try {
        const routines = await fetchUserRoutines();
        setUserRoutines(routines);
      } catch (err) {
        console.error('Error fetching user routines: ', err);
      }
    };
    fetchUserAndRoutines();
  }, []);

  const handleAddStretch = async (stretchId: string) => {
    const routineId = selectedRoutineMap[stretchId];
    if (!routineId) {
      alert('Please select a routine first.');
      return;
    }

    try {
      await addStretchToRoutine(stretchId, routineId);
      alert('Stretch added!');
      setSelectedRoutineMap((prev) => ({
        ...prev,
        [stretchId]: '', // reset to default
      }));
    } catch (err) {
      console.error('Error adding to routine:', err);
    }
  };

  const handleSelectRoutineChange = (stretchId: string, routineId: string) => {
    setSelectedRoutineMap((prev) => ({
      ...prev,
      [stretchId]: routineId,
    }));
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category.value)) {
        return prev.filter((c) => c !== category.value);
      }
      return [...prev, category.value];
    });
  };

  const handleRemoveCategory = (categoryValue: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== categoryValue));
  };

  const filteredStretches = stretches.filter((stretch) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(stretch.target.toLowerCase());
  });

  return (
    <div className="all-stretches-page">
      <Welcome />
      <div className="week-tracker-container">
        <WeekTracker />
      </div>

      <div className="categories-bar-container">
        <CategoriesBar
          selectedCategories={selectedCategories}
          onCategoryClick={handleCategoryClick}
          onRemoveCategory={handleRemoveCategory}
        />
      </div>
      <div className="main-content-wrapper">
        <div className="stretch-container">
          {isLoading && <div>Loading stretches...</div>}
          {error && <div style={{ color: 'red' }}>Error: {error}</div>}
          {!isLoading && !error && filteredStretches.length === 0 && (
            <div>
              {stretches.length === 0
                ? "No stretches found. Please make sure you're connected to the database."
                : 'No stretches match the selected categories.'}
            </div>
          )}
          {filteredStretches.map((stretch) => (
            <div className="stretch-preview" key={stretch.id}>
              <div className="stretch-content">
                <Link to={`/stretches/${stretch.id}`}>
                  <img src={stretch.stretchimages} alt={`${stretch.name}`} />
                  <div className="stretch-content-text">
                    <h2>{stretch.name}</h2>
                    <h3>{`Target: ${stretch.target}`}</h3>
                  </div>
                </Link>
              </div>
              <div className="add-to-routine">
                <label htmlFor={`select-${stretch.id}`}>Add to routine:</label>
                <select
                  id={`select-${stretch.id}`}
                  value={selectedRoutineMap[stretch.id] || ''}
                  onChange={(e) =>
                    handleSelectRoutineChange(stretch.id, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select routine
                  </option>
                  {userRoutines.map((routine) => (
                    <option key={routine.id} value={routine.id}>
                      {routine.name}
                    </option>
                  ))}
                </select>

                <button onClick={() => handleAddStretch(stretch.id)}>
                  Add Stretch
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="sidebar-container">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default AllStretches;
