import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import Avatar from '../../components/Avatar';
// import './completeaccount.scss';

interface CompleteAccountProps {
  session: Session | null;
}

const CompleteAccount = ({ session }: CompleteAccountProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.getUser();
      const {
        data: { user: currentUser },
        error: userError,
      } = await user;

      if (userError || !currentUser)
        throw userError || new Error('User not found');

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', currentUser.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) throw error || new Error('User not found');

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      const { error: insertError } = await supabase
        .from('profiles')
        .upsert(updates);

      if (insertError) throw insertError;

      navigate('/home');
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="background"></div>
      <div className="full-view-container">
        <div className="account-container">
          <div aria-live="polite">
            <h2>Finish setting up your profile:</h2>
            {loading ? (
              'Saving ...'
            ) : (
              <form onSubmit={updateProfile} className="form-widget">
                <Avatar
                  className="image-container"
                  url={avatar_url}
                  size={200}
                  onUpload={(url: string) => {
                    setAvatarUrl(url);
                    updateProfile(
                      new Event('submit') as unknown as React.FormEvent
                    );
                  }}
                />
                <div className="info-container">
                  <h3 className="email-container">
                    <div className="email-text">Email: </div>
                    {session?.user?.email}
                  </h3>
                  <h3 className="name-text">
                    Name:
                    <input
                      id="username"
                      type="text"
                      value={username || ''}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </h3>
                </div>
                <div className="create-account">
                  <button className="edit-profile-button" disabled={loading}>
                    Create Account
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteAccount;
