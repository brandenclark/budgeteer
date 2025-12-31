import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../database.types'

// Use globalThis to persist client across HMR
const globalForSupabase = globalThis as unknown as {
  supabaseBrowserClient: ReturnType<typeof createBrowserClient<Database>> | undefined
}

/**
 * Get the Supabase browser client (singleton pattern)
 *
 * This client is used for client-side operations and maintains
 * session state in the browser.
 */
export function getSupabaseBrowserClient() {
  if (globalForSupabase.supabaseBrowserClient) {
    return globalForSupabase.supabaseBrowserClient
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
    )
  }

  if (supabaseUrl.includes('your-project') || supabaseAnonKey.includes('your-')) {
    throw new Error(
      'Supabase credentials are still placeholders. Please update .env.local with your actual Supabase project credentials from https://supabase.com/dashboard'
    )
  }

  globalForSupabase.supabaseBrowserClient = createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  )

  return globalForSupabase.supabaseBrowserClient
}
