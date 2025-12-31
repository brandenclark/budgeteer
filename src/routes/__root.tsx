import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'

import { HydrationScript } from 'solid-js/web'
import { Suspense } from 'solid-js'

import Header from '../components/Header'
import { AuthProvider } from '../lib/auth'

import styleCss from '../styles.css?url'

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [{ rel: 'stylesheet', href: styleCss }],
  }),
  shellComponent: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <Suspense>
          <AuthProvider>
            <Header />

            <Outlet />
            <TanStackRouterDevtools />
          </AuthProvider>
        </Suspense>
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div class="text-center">
        <h1 class="text-9xl font-black text-cyan-400 mb-4">404</h1>
        <h2 class="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p class="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          class="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
