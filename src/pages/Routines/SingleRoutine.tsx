import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabase';
import './SingleRoutine.scss';

interface Stretch {
  id: string;
  name: string;
  target: string;
  stretchimages: string;
}

interface Routine {
  id: string;
  name: string;
  notes: string;
  stretches: Stretch[];
}

interface StretchRoutineJoin {
  stretches: Stretch | Stretch[]; // account for possible array
}

const SingleRoutine = () => {
  const { id: routineId } = useParams();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutine = async () => {
      const { data, error } = await supabase
        .from('routines')
        .select('id, name, notes, stretchRoutines(stretches(*))')
        .eq('id', routineId)
        .single();

      if (error) return console.error(error);

      const stretches = (data.stretchRoutines as StretchRoutineJoin[]).flatMap(
        (sr) => (Array.isArray(sr.stretches) ? sr.stretches : [sr.stretches])
      );

      setRoutine({
        id: data.id,
        name: data.name,
        notes: data.notes,
        stretches,
      });
      setLoading(false);
    };

    if (routineId) fetchRoutine();
  }, [routineId]);

  const handleDeleteStretch = async (stretchId: string) => {
    const { error } = await supabase
      .from('stretchRoutines')
      .delete()
      .match({ routineId, stretchId });

    if (error) return console.error(error);
    setRoutine((prev) =>
      prev
        ? {
            ...prev,
            stretches: prev.stretches.filter((s) => s.id !== stretchId),
          }
        : null
    );
  };

  const handleUpdateDetails = async (
    field: 'name' | 'notes',
    value: string
  ) => {
    const { error } = await supabase
      .from('routines')
      .update({ [field]: value })
      .eq('id', routineId);

    if (error) return console.error(error);

    setRoutine((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  if (loading || !routine) return <p>Loading...</p>;

  return (
    <div className="single-routine">
      <input
        type="text"
        value={routine.name}
        onChange={(e) => handleUpdateDetails('name', e.target.value)}
      />
      <textarea
        value={routine.notes}
        onChange={(e) => handleUpdateDetails('notes', e.target.value)}
      />
      <div className="stretch-list">
        {routine.stretches.length > 0 ? (
          routine.stretches.map((stretch) => (
            <div key={stretch.id} className="stretch-preview">
              <Link to={`/stretches/${stretch.id}`}>
                <h2>{stretch.name}</h2>
                <img src={stretch.stretchimages} alt={stretch.name} />
                <h4>{stretch.target}</h4>
              </Link>
              <button onClick={() => handleDeleteStretch(stretch.id)}>
                Remove Stretch
              </button>
            </div>
          ))
        ) : (
          <p>No stretches in this routine. Add some!</p>
        )}
      </div>
      <div className="routine-actions">
        <button onClick={() => navigate('/stretches')}>
          Add More Stretches
        </button>
        {routine.stretches.length > 0 && (
          <button onClick={() => navigate('/testwindow')}>Start Routine</button>
        )}
      </div>
    </div>
  );
};

export default SingleRoutine;
