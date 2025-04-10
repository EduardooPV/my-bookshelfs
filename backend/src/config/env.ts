import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const port = process.env.PORT || 3001;

export { supabaseUrl, supabaseKey, port };
