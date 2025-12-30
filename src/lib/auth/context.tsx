import { createContext, useContext, onMount, createSignal, JSX } from 'solid-js'
import type { User, Session, AuthError } from '@supabase/supabase-js'
import { getSupabaseBrowserClient } from '../supabase'

interface AuthContextValue {
  user: () => User | null
  session: () => Session | null
  loading: () => boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>()

/**
 * AuthProvider component that manages authentication state
 *
 * Provides user, session, and auth methods to the component tree.
 * Handles session persistence and auth state changes.
 */
export function AuthProvider(props: { children: JSX.Element }) {
  const supabase = getSupabaseBrowserClient()
  const [user, setUser] = createSignal<User | null>(null)
  const [session, setSession] = createSignal<Session | null>(null)
  const [loading, setLoading] = createSignal(true)

  onMount(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe()
  })

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value: AuthContextValue = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

/**
 * Hook to access auth context
 *
 * @throws Error if used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
