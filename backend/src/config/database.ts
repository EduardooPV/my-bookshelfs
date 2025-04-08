import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../config/env';

export const supabase = createClient(supabaseUrl, supabaseKey);
