import { Link } from '@tanstack/solid-router'
import { Show } from 'solid-js'
import { LogOut } from 'lucide-solid'
import { useAuth } from '../lib/auth'

export default function Header() {
  const auth = useAuth()

  return (
    <header class="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard" class="text-2xl font-bold text-white">
          Budgeteer
        </Link>

        <Show when={auth.user()}>
          <div class="flex items-center gap-4">
            <span class="text-gray-400 text-sm">{auth.user()?.email}</span>
            <button
              onClick={() => auth.signOut()}
              class="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <LogOut class="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </Show>
      </div>
    </header>
  )
}
