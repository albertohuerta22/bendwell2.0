import supabase from '../../../lib/supabase';

export const fetchStretchById = async (id: string) => {
  const { data, error } = await supabase
    .from('stretches')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};
