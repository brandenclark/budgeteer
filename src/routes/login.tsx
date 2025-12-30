import { createSignal, Show } from 'solid-js'
import { useNavigate, createFileRoute } from '@tanstack/solid-router'
import { useAuth } from '../lib/auth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const auth = useAuth()

  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal<string | null>(null)
  const [loading, setLoading] = createSignal(false)
  const [isSignUp, setIsSignUp] = createSignal(false)

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const emailValue = email()
    const passwordValue = password()

    try {
      const { error: authError } = isSignUp()
        ? await auth.signUp(emailValue, passwordValue)
        : await auth.signIn(emailValue, passwordValue)

      if (authError) {
        setError(authError.message)
      } else {
        // Redirect to dashboard or home on success
        navigate({ to: '/dashboard' })
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div class="w-full max-w-md">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-lg">
          <h1 class="text-3xl font-bold text-white mb-6 text-center">
            {isSignUp() ? 'Sign Up' : 'Sign In'}
          </h1>

          <form onSubmit={handleSubmit} class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
                class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                required
                class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <Show when={error()}>
              <div class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error()}
              </div>
            </Show>

            <button
              type="submit"
              disabled={loading()}
              class="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50 disabled:shadow-none"
            >
              {loading() ? 'Loading...' : isSignUp() ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div class="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp())
                setError(null)
              }}
              class="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
            >
              {isSignUp()
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
