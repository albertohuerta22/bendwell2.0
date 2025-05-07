import supabase from '../../../lib/supabase';

export const fetchRoutineById = async (routineId: string) => {
  const { data, error } = await supabase
    .from('routines')
    .select('id, name, notes, stretchRoutines(stretches(*))')
    .eq('id', routineId)
    .single();

  if (error) throw error;
  return data;
};

export const deleteStretchFromRoutine = async (
  routineId: string,
  stretchId: string
) => {
  const { error } = await supabase
    .from('stretchRoutines')
    .delete()
    .match({ routineId, stretchId });

  if (error) throw error;
};

export const updateRoutineField = async (
  routineId: string,
  field: 'name' | 'notes',
  value: string
) => {
  const { error } = await supabase
    .from('routines')
    .update({ [field]: value })
    .eq('id', routineId);

  if (error) throw error;
};
