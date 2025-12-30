# Routing Guide

## File-Based Routing

TanStack Start uses file-based routing. Files in `src/routes/` automatically become routes.

```
src/routes/
├── __root.tsx          → Root layout (wraps all routes)
├── index.tsx           → / (home)
├── login.tsx           → /login
└── dashboard.tsx       → /dashboard
```

## Creating a Route

Create a file in `src/routes/`:

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return <div>About Us</div>
}
```

## Protected Routes

Use `requireAuth()` in `beforeLoad`:

```tsx
import { createFileRoute } from '@tanstack/solid-router'
import { requireAuth } from '~/lib/auth'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    await requireAuth() // Redirects to /login if not authenticated
  },
  component: DashboardPage,
})
```

## Route Parameters

Use `$` prefix for dynamic segments:

```tsx
// src/routes/users/$id.tsx
import { createFileRoute } from '@tanstack/solid-router'
import { useParams } from '@tanstack/solid-router'

export const Route = createFileRoute('/users/$id')({
  component: UserPage,
})

function UserPage() {
  const params = useParams()
  return <div>User ID: {params.id}</div>
}
```

## Data Loading

Load data in `beforeLoad` or `loader`:

```tsx
export const Route = createFileRoute('/posts')({
  loader: async () => {
    const supabase = getSupabaseServerClient()
    const repo = createRepository(supabase, 'posts', 'data-api')
    const { data } = await repo.findMany({ limit: 10 })
    return { posts: data }
  },
  component: PostsPage,
})

function PostsPage() {
  const { posts } = Route.useLoaderData()
  return <div>{/* Render posts */}</div>
}
```

## Navigation

Use `Link` component or `navigate`:

```tsx
import { Link, useNavigate } from '@tanstack/solid-router'

function Nav() {
  const navigate = useNavigate()

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <button onClick={() => navigate({ to: '/about' })}>
        About
      </button>
    </nav>
  )
}
```
