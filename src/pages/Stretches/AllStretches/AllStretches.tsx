import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../../lib/supabase';

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

  useEffect(() => {
    const fetchStretches = async () => {
      const { data, error } = await supabase.from('stretches').select('*');
      if (error) {
        console.error('Error fetching stretches:', error.message);
      } else {
        setStretches(data || []);
      }
    };

    fetchStretches();
  }, []);

  useEffect(() => {
    const fetchUserAndRoutines = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('routines')
          .select('*')
          .eq('userId', user.id);
        if (!error && data) setUserRoutines(data as Routine[]);
      }
    };
    fetchUserAndRoutines();
  }, []);

  return (
    <div className="stretch-container">
      {stretches.map((stretch) => (
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
                setSelectedRoutineMap((prev) => ({
                  ...prev,
                  [stretch.id]: e.target.value,
                }))
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

            <button
              onClick={async () => {
                const routineId = selectedRoutineMap[stretch.id];
                if (!routineId) {
                  alert('Please select a routine first.');
                  return;
                }

                const { error } = await supabase
                  .from('stretchRoutines')
                  .insert({
                    stretchId: stretch.id,
                    routineId,
                  });

                if (error) console.error('Error adding to routine:', error);
                else {
                  alert('Stretch added!');
                  setSelectedRoutineMap((prev) => ({
                    ...prev,
                    [stretch.id]: '', // reset to default
                  }));
                }
              }}
            >
              Add Stretch
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllStretches;
