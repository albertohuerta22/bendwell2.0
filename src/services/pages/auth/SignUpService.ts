// src/services/pages/auth/SignUpService.ts
import supabase from '../../../lib/supabase';

/**
 * Signs up a user with email and password, and creates a stub profile row.
 */
export async function signUpUser(
  email: string,
  password: string
): Promise<void> {
  const { data, error } = await supabase.auth.signUp({ email, password });

  const userId = data.user?.id;

  // Insert stub profile row
  const { error: insertError } = await supabase.from('profiles').upsert({
    id: userId,
    username: null,
    avatar_url: null,
    updated_at: new Date(),
  });
}
