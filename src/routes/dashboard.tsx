import { createFileRoute } from '@tanstack/solid-router'
import { useAuth, requireAuth } from '../lib/auth'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    // Protect this route - redirect to /login if not authenticated
    await requireAuth()
  },
  component: DashboardPage,
})

function DashboardPage() {
  const auth = useAuth()

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-lg">
          <h1 class="text-4xl font-bold text-white mb-6">Dashboard</h1>

          <div class="bg-slate-700/50 border border-slate-600 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-white mb-4">Welcome!</h2>
            <p class="text-gray-300 mb-2">
              You are logged in as: <span class="text-cyan-400">{auth.user()?.email}</span>
            </p>
            <p class="text-gray-400 text-sm">
              User ID: {auth.user()?.id}
            </p>
          </div>

          <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-white mb-2">
              Protected Route
            </h3>
            <p class="text-gray-300">
              This page is only accessible to authenticated users. If you weren't
              logged in, you would have been redirected to the login page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
