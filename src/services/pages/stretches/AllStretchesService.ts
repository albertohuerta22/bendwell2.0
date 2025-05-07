import supabase from '../../../lib/supabase';

export const fetchAllStretches = async () => {
  const { data, error } = await supabase.from('stretches').select('*');
  if (error) throw new Error(error.message);
  return data || [];
};

export const fetchUserRoutines = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('User not authenticated.');

  const { data, error } = await supabase
    .from('routines')
    .select('*')
    .eq('userId', user.id);

  if (error) throw new Error(error.message);
  return data || [];
};

export const addStretchToRoutine = async (
  stretchId: string,
  routineId: string
) => {
  const { error } = await supabase.from('stretchRoutines').insert({
    stretchId,
    routineId,
  });

  if (error) throw new Error(error.message);
};
