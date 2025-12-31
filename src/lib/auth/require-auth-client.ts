import { redirect } from '@tanstack/solid-router'
import { getSupabaseBrowserClient } from '../supabase'

/**
 * Client-side auth check for route protection
 *
 * Use this in route beforeLoad functions to protect client-side routes.
 * Redirects to /login if user is not authenticated.
 *
 * @throws Redirect to /login if not authenticated
 */
export async function requireAuthClient() {
  const supabase = getSupabaseBrowserClient()
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    throw redirect({ to: '/login' })
  }

  return session.user
}
