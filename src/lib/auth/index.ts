/**
 * Authentication exports
 *
 * Client-side:
 * - AuthProvider: Wrap your app to provide auth context
 * - useAuth: Hook to access auth state and methods
 * - requireAuthClient: Protect routes client-side (use in beforeLoad)
 *
 * Server-side:
 * - getServerSession: Get session in server functions
 * - getServerUser: Get user in server functions
 * - requireAuth: Protect routes server-side
 */

export { AuthProvider, useAuth } from './context'
export { getServerSession, getServerUser, requireAuth } from './server'
export { requireAuthClient } from './require-auth-client'
