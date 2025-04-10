import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../config/env';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
