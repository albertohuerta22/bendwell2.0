import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import supabase from '../../../lib/supabase';

import './SingleStretch.scss';

interface Stretch {
  id: string;
  name: string;
  target: string;
  gif?: string;
  one?: string;
  stepTwo?: string;
  stepThree?: string;
  stepFour?: string;
  stepFive?: string;
}

const SingleStretch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stretch, setStretch] = useState<Stretch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStretch = async () => {
      const { data, error } = await supabase
        .from('stretches')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching stretch:', error.message);
      } else {
        setStretch(data);
      }
      setLoading(false);
    };

    if (id) fetchStretch();
  }, [id]);

  const handleClick = () => {
    navigate('/stretchwindow');
  };

  if (loading || !stretch) return <p>Loading...</p>;

  return (
    <div className="single-stretch-container">
      <div className="single-stretch-card">
        <h2>{stretch.name}</h2>
        <h3>{`Target: ${stretch.target}`}</h3>
        <button className="start-stretch-button" onClick={handleClick}>
          Start Stretch
        </button>
      </div>

      <div className="secondhalf">
        {stretch.gif && (
          <div className="stretch-gif">
            <img
              src={stretch.gif}
              alt="stretch demo"
              height="370"
              width="350"
            />
          </div>
        )}
        <div className="steps">
          <h2>Steps</h2>
          {stretch.one && <p>(1) {stretch.one}</p>}
          {stretch.stepTwo && <p>(2) {stretch.stepTwo}</p>}
          {stretch.stepThree && <p>(3) {stretch.stepThree}</p>}
          {stretch.stepFour && <p>(4) {stretch.stepFour}</p>}
          {stretch.stepFive && <p>(5) {stretch.stepFive}</p>}
        </div>
      </div>

      <div className="discover">
        <img
          src="https://static.thenounproject.com/png/4236378-200.png"
          alt="brave-icon"
          className="brave-icon"
        />
        <h2>
          Discover More <span style={{ color: '#23b54d' }}>Stretches</span>
        </h2>
        <Link to="/stretches">
          <button className="view-stretches">View Stretches</button>
        </Link>
        <button
          onClick={() =>
            navigate('/trainingwindow', {
              state: { stretchName: stretch.name },
            })
          }
          className="admin-train-button"
        >
          Train Pose Stretch
        </button>
      </div>
    </div>
  );
};

export default SingleStretch;
