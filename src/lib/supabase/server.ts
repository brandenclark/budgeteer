'use server'

import { createServerClient } from '@supabase/ssr'
import { getRequestEvent } from 'solid-js/web'
import type { Database } from '../database.types'

/**
 * Get the Supabase server client for SSR operations
 *
 * This client handles cookie-based session management for server-side
 * rendering and API routes.
 *
 * Note: Cookie handling is implemented with a basic approach.
 * For production use, enhance the getAll() method to properly parse
 * cookies from the request headers.
 *
 * @returns Supabase client configured for server-side use
 */
export function getSupabaseServerClient() {
  const event = getRequestEvent()

  return createServerClient<Database>(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Get cookies from request headers
          if (!event) return []

          const cookieHeader = event.request.headers.get('Cookie')
          if (!cookieHeader) return []

          return cookieHeader.split('; ').map((cookie) => {
            const [name, ...rest] = cookie.split('=')
            return { name, value: rest.join('=') }
          })
        },
        setAll(cookiesToSet) {
          // Set cookies - implementation will be completed when auth is implemented
          // For now, this is a placeholder that satisfies the Supabase SSR client requirements
          if (!event) return

          // TODO: Implement proper cookie setting when auth routes are added
          // cookiesToSet contains the cookies that need to be set in the response
          cookiesToSet.forEach(({ name, value, options }) => {
            serializeCookie(name, value, options)
            // Cookie will be set via response headers in auth implementation
          })
        },
      },
    }
  )
}

/**
 * Serialize a cookie for the Set-Cookie header
 */
function serializeCookie(
  name: string,
  value: string,
  options?: {
    path?: string
    domain?: string
    maxAge?: number
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'lax' | 'strict' | 'none' | boolean
  }
): string {
  let cookie = `${name}=${value}`

  if (options?.path) cookie += `; Path=${options.path}`
  if (options?.domain) cookie += `; Domain=${options.domain}`
  if (options?.maxAge !== undefined) cookie += `; Max-Age=${options.maxAge}`
  if (options?.httpOnly) cookie += '; HttpOnly'
  if (options?.secure) cookie += '; Secure'
  if (options?.sameSite && typeof options.sameSite === 'string') {
    cookie += `; SameSite=${options.sameSite}`
  }

  return cookie
}
