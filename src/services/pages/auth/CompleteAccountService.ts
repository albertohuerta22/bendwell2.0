import supabase from '../../../lib/supabase';

export const getUserProfile = async () => {
  const {
    data: { user: currentUser },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !currentUser) throw userError || new Error('User not found');

  const { data, error, status } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', currentUser.id)
    .single();

  if (error && status !== 406) throw error;

  return { username: data?.username, avatar_url: data?.avatar_url };
};

export const updateUserProfile = async (
  username: string | null,
  avatar_url: string | null
) => {
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
};
