'use server'

import { redirect } from '@tanstack/react-router'
import { getSupabaseServerClient } from '../supabase'

/**
 * Get the current session from the server
 *
 * @returns Session object or null if not authenticated
 */
export async function getServerSession() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session:', error)
    return null
  }

  return data.session
}

/**
 * Get the current user from the server
 *
 * @returns User object or null if not authenticated
 */
export async function getServerUser() {
  const session = await getServerSession()
  return session?.user ?? null
}

/**
 * Require authentication for a route
 *
 * Throws a redirect to /login if user is not authenticated.
 * Use this in route beforeLoad functions for protected routes.
 *
 * @throws Redirect to /login if not authenticated
 * @returns User object if authenticated
 */
export async function requireAuth() {
  const user = await getServerUser()

  if (!user) {
    throw redirect({
      to: '/login',
      search: {
        redirect: typeof window !== 'undefined' ? window.location.pathname : '/',
      },
    })
  }

  return user
}
