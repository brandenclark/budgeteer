import { createFileRoute } from '@tanstack/solid-router'
import { requireAuthClient } from '../lib/auth'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    await requireAuthClient()
  },
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-6">Dashboard</h1>

        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          <p class="text-gray-400 text-center">Welcome to your dashboard</p>
        </div>
      </div>
    </div>
  )
}
