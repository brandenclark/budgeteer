# Authentication Guide

## Overview

Authentication is handled by Supabase with SSR support for server-side session validation.

## Client-Side Usage

### useAuth Hook

```tsx
import { useAuth } from '~/lib/auth'

function Profile() {
  const auth = useAuth()

  return (
    <div>
      {auth.loading() ? (
        <p>Loading...</p>
      ) : auth.user() ? (
        <div>
          <p>Welcome, {auth.user()?.email}</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}
```

### Sign In

```tsx
const auth = useAuth()

async function handleSignIn(email: string, password: string) {
  const { error } = await auth.signIn(email, password)
  if (error) {
    console.error('Sign in failed:', error.message)
  }
}
```

### Sign Up

```tsx
async function handleSignUp(email: string, password: string) {
  const { error } = await auth.signUp(email, password)
  if (error) {
    console.error('Sign up failed:', error.message)
  }
}
```

### Sign Out

```tsx
await auth.signOut()
```

## Server-Side Usage

### Get Session

```tsx
import { getServerSession } from '~/lib/auth'

const session = await getServerSession()
if (session) {
  console.log('User ID:', session.user.id)
}
```

### Get User

```tsx
import { getServerUser } from '~/lib/auth'

const user = await getServerUser()
if (user) {
  console.log('Email:', user.email)
}
```

### Protected Routes

```tsx
import { createFileRoute } from '@tanstack/solid-router'
import { requireAuth } from '~/lib/auth'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    // Redirects to /login if not authenticated
    await requireAuth()
  },
  component: DashboardPage,
})
```

## Row-Level Security (RLS)

Supabase enforces RLS policies automatically. Example policy:

```sql
-- Users can only see their own data
CREATE POLICY "Users can view own data"
  ON transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own data
CREATE POLICY "Users can insert own data"
  ON transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## Auth Flow

1. User visits protected route → `requireAuth()` checks session
2. No session → Redirect to `/login`
3. User signs in → Session created
4. Redirect to original destination
5. `AuthProvider` syncs session across tabs via `onAuthStateChange`

## Environment Variables

Set in `.env.local`:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
