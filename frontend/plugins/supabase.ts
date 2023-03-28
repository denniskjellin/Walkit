import { createClient, SupabaseClient } from '@supabase/supabase-js'
// Get the Supabase URL and key from the environment variables
const supabaseUrl: string | undefined = process.env.SUPABASE_URL
const supabaseKey: string | undefined = process.env.SUPABASE_KEY

// Throw an error if the key is not found
if (!supabaseKey) { 
  throw new Error('Supabase API key not found.')
}

// Throw an error if the URL is not found
if (!supabaseUrl) { 
    throw new Error('Supabase URL not found.')
  }
// Create a new Supabase client
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

// Inject the client into the context as $supabase
export default (_context: any, inject: any) => {
  inject('supabase', supabase)
}
