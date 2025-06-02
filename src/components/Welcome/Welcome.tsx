import React, { useEffect, useState } from 'react';
import './Welcome.scss';
import supabase from '../../lib/supabase';

const Welcome: React.FC = () => {
  const [userName, setUserName] = useState<string>('there');

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }
    };
    getUser();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="welcome-container">
      <h1 className="greeting">
        {getGreeting()}, {userName}!
      </h1>
      <p className="welcome-message">Ready to improve your well-being today?</p>
    </div>
  );
};

export default Welcome;
