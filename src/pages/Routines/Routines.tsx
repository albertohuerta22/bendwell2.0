import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabase';

//services
import {
  getUserRoutines,
  addRoutine,
  renameRoutine,
  deleteRoutine,
} from '../../services/pages/routines/RoutineSerivce';

//global modal, find on index.html
import RoutineEditorModal from '../../components/Modals/RoutineEditorModal/RoutineEditorModal';

import './Routines.scss';

interface Stretch {
  id: string;
  name: string;
  stretchimages: string;
  target: string;
}

interface Routine {
  id: string;
  name: string;
  notes: string;
  stretches: Stretch[];
}

interface RawRoutine {
  id: string;
  name: string;
  notes: string;
  user_id: string;
  stretchRoutines: {
    stretches: Stretch;
  }[];
}

const Routines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [routineNames, setRoutineNames] = useState<{ [key: string]: string }>(
    {}
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [routineToDelete, setRoutineToDelete] = useState<Routine | null>(null);

  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndRoutines = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        try {
          const data = await getUserRoutines(user.id);
          const formatted = (data as RawRoutine[]).map((r) => ({
            ...r,
            stretches: r.stretchRoutines.map((sr) => sr.stretches),
          }));
          setRoutines(formatted);
          const nameMap: { [key: string]: string } = {};
          formatted.forEach((r) => (nameMap[r.id] = r.name));
          setRoutineNames(nameMap);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchUserAndRoutines();
  }, []);

  const handleAddRoutine = async () => {
    if (!userId) return;

    try {
      const data = await addRoutine(userId);
      setRoutines((prev) => [...prev, ...(data as Routine[])]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRename = async (routineId: string, newName: string) => {
    try {
      await renameRoutine(routineId, newName);
      setRoutines((prev) =>
        prev.map((r) => (r.id === routineId ? { ...r, name: newName } : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRoutine = async (routineId: string) => {
    try {
      await deleteRoutine(routineId);
      setRoutines((prev) => prev.filter((r) => r.id !== routineId));
      setRoutineToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="routines">
      <div className="routines__topbar">
        <h1>Routines</h1>
        <p>
          {routines.length} Routine{routines.length === 1 ? '' : 's'}
        </p>
        <button onClick={handleAddRoutine}>Add Routine</button>
      </div>

      <div className="routines__list">
        {routines.map((routine) => (
          <div key={routine.id} className="routine__row">
            <div className="routine__column routine__name">
              {editingId === routine.id ? (
                <input
                  type="text"
                  value={routineNames[routine.id] || ''}
                  onChange={(e) =>
                    setRoutineNames((prev) => ({
                      ...prev,
                      [routine.id]: e.target.value,
                    }))
                  }
                  onBlur={() => {
                    handleRename(routine.id, routineNames[routine.id]);
                    setEditingId(null);
                  }}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRename(routine.id, routineNames[routine.id]);
                      setEditingId(null);
                    }
                  }}
                />
              ) : (
                <h2>{routine.name}</h2>
              )}
            </div>

            <div className="routine__column routine__carousel">
              {Array.isArray(routine.stretches) &&
              routine.stretches.length > 0 ? (
                <div className="routine__carousel-wrapper">
                  {routine.stretches.map((stretch, index) => (
                    <div
                      key={`${routine.id}-${stretch.id}-${index}`}
                      className="routine__carousel-item"
                    >
                      <img src={stretch.stretchimages} alt={stretch.name} />
                      <p>{stretch.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No stretches in this routine.</p>
              )}
            </div>

            <div className="routine__column routine__actions">
              <button onClick={() => setEditingId(routine.id)}>
                Edit Name
              </button>
              <button
                onClick={() => {
                  if (!routine.stretches || routine.stretches.length === 0) {
                    alert(
                      `Please add stretches to your "${routine.name}" routine first.`
                    );
                    return;
                  }
                  setEditingRoutine(routine);
                }}
              >
                Edit Routine
              </button>

              <button onClick={() => setRoutineToDelete(routine)}>
                Delete Routine
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingRoutine && (
        <RoutineEditorModal
          stretches={editingRoutine.stretches}
          onClose={() => setEditingRoutine(null)}
          onSave={(updatedStretches) => {
            setRoutines((prev) =>
              prev.map((r) =>
                r.id === editingRoutine.id
                  ? { ...r, stretches: updatedStretches }
                  : r
              )
            );
            setEditingRoutine(null);
          }}
          onAddStretch={() => {
            navigate('/stretches');
          }}
        />
      )}

      {routineToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Routine?</h3>
            <p>Are you sure you want to delete “{routineToDelete.name}”?</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  if (routineToDelete) handleDeleteRoutine(routineToDelete.id);
                }}
              >
                Yes, Delete
              </button>
              <button onClick={() => setRoutineToDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routines;
