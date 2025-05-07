import supabase from '../../../lib/supabase';

export const getUserRoutines = async (userId: string) => {
  const { data, error } = await supabase
    .from('routines')
    .select('*, stretchRoutines(stretches(*))')
    .eq('userId', userId);

  if (error) throw error;
  return data;
};

export const addRoutine = async (userId: string) => {
  const { data, error } = await supabase
    .from('routines')
    .insert({ userId, name: 'New Routine', notes: '' })
    .select();

  if (error) throw error;
  return data;
};

export const renameRoutine = async (routineId: string, newName: string) => {
  const { error } = await supabase
    .from('routines')
    .update({ name: newName })
    .eq('id', routineId);

  if (error) throw error;
};

export const deleteRoutine = async (routineId: string) => {
  const { error } = await supabase
    .from('routines')
    .delete()
    .eq('id', routineId);

  if (error) throw error;
};
