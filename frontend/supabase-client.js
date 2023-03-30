import { createClient } from '@supabase/supabase-js'
import { Database } from 'lib/database.types'

// Create a single supabase client for interacting with the database
export const supabase = createClient<Database>(
  process.env.SUPABASE_URL, // Supabase URL from .env
  process.env.SUPABASE_ANON_KEY //Supabase anon key from .env
)