import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../config/env';

const supabase = createClient(supabaseUrl, supabaseKey);

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};
