import { createFileRoute, Link } from '@tanstack/solid-router'
import { For, Show } from 'solid-js'
import {
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
  LogOut,
} from 'lucide-solid'
import { useAuth } from '../lib/auth'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const auth = useAuth()
  const features = [
    {
      icon: <Zap class="w-12 h-12 text-cyan-400" />,
      title: 'Powerful Server Functions',
      description:
        'Write server-side code that seamlessly integrates with your client components. Type-safe, secure, and simple.',
    },
    {
      icon: <Server class="w-12 h-12 text-cyan-400" />,
      title: 'Flexible Server Side Rendering',
      description:
        'Full-document SSR, streaming, and progressive enhancement out of the box. Control exactly what renders where.',
    },
    {
      icon: <RouteIcon class="w-12 h-12 text-cyan-400" />,
      title: 'API Routes',
      description:
        'Build type-safe API endpoints alongside your application. No separate backend needed.',
    },
    {
      icon: <Shield class="w-12 h-12 text-cyan-400" />,
      title: 'Strongly Typed Everything',
      description:
        'End-to-end type safety from server to client. Catch errors before they reach production.',
    },
    {
      icon: <Waves class="w-12 h-12 text-cyan-400" />,
      title: 'Full Streaming Support',
      description:
        'Stream data from server to client progressively. Perfect for AI applications and real-time updates.',
    },
    {
      icon: <Sparkles class="w-12 h-12 text-cyan-400" />,
      title: 'Next Generation Ready',
      description:
        'Built from the ground up for modern web applications. Deploy anywhere JavaScript runs.',
    },
  ]

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section class="relative py-20 px-6 text-center overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div class="relative max-w-5xl mx-auto">
          <div class="flex items-center justify-center gap-6 mb-6">
            <img
              src="/tanstack-circle-logo.png"
              alt="TanStack Logo"
              class="w-24 h-24 md:w-32 md:h-32"
            />
            <h1 class="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
              <span class="text-gray-300">TANSTACK</span>{' '}
              <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                START
              </span>
            </h1>
          </div>
          <p class="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            The framework for next generation AI applications
          </p>
          <p class="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Full-stack framework powered by TanStack Router for React and Solid.
            Build modern applications with server functions, streaming, and type
            safety.
          </p>
          <div class="flex flex-col items-center gap-4">
            <Show
              when={auth.user()}
              fallback={
                <div class="flex gap-4">
                  <Link
                    to="/login"
                    class="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/dashboard"
                    class="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors border border-slate-600"
                  >
                    Dashboard
                  </Link>
                </div>
              }
            >
              <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg px-6 py-4">
                <p class="text-gray-300 mb-3">
                  Signed in as:{' '}
                  <span class="text-cyan-400 font-semibold">{auth.user()?.email}</span>
                </p>
                <div class="flex gap-3">
                  <Link
                    to="/dashboard"
                    class="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => auth.signOut()}
                    class="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <LogOut class="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </Show>

            <a
              href="https://tanstack.com/start"
              target="_blank"
              rel="noopener noreferrer"
              class="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>
      </section>

      <section class="py-16 px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={features}>
            {(feature) => (
              <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                <div class="mb-4">{feature.icon}</div>
                <h3 class="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p class="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )}
          </For>
        </div>
      </section>
    </div>
  )
}
