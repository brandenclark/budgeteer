/**
 * Authentication exports
 *
 * Client-side:
 * - AuthProvider: Wrap your app to provide auth context
 * - useAuth: Hook to access auth state and methods
 *
 * Server-side:
 * - getServerSession: Get session in server functions
 * - getServerUser: Get user in server functions
 * - requireAuth: Protect routes (use in beforeLoad)
 */

export { AuthProvider, useAuth } from './context'
export { getServerSession, getServerUser, requireAuth } from './server'
