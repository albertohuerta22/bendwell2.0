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

const AllStretches = () => {
  const [stretches, setStretches] = useState<Stretch[]>([]);

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
        </div>
      ))}
    </div>
  );
};

export default AllStretches;
