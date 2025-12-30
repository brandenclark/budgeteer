# Budgeteer

A modern budgeting application built with TanStack Start, Solid, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) with [Solid](https://www.solidjs.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Kobalte](https://kobalte.dev/) (accessible primitives)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Type Safety**: TypeScript with generated database types

## Features

- ✅ Server-side rendering (SSR)
- ✅ Authentication with Supabase
- ✅ Protected routes
- ✅ Repository pattern for data access
- ✅ Accessible UI components
- ✅ Type-safe data fetching
- ✅ Dark/light theme support
- ✅ Responsive design

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm
- Supabase account

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run migrations (requires Supabase CLI)
supabase link --project-ref your-project-ref
supabase db push

# Start development server
pnpm dev
```

Visit http://localhost:3000

### Build for Production

```bash
pnpm build
```

## Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md) - Tech stack and design decisions
- [Routing Guide](./docs/ROUTING.md) - File-based routing patterns
- [Data Fetching](./docs/DATA-FETCHING.md) - Repository pattern usage
- [Authentication](./docs/AUTHENTICATION.md) - Auth implementation
- [Components](./docs/COMPONENTS.md) - UI component system
- [Deployment](./docs/DEPLOYMENT.md) - Production deployment

## Project Structure

```
src/
├── routes/           # File-based routing
├── components/       # Reusable components
│   └── ui/          # UI primitives (Button, etc.)
├── lib/
│   ├── auth/        # Authentication layer
│   ├── data/        # Data access layer
│   ├── supabase/    # Supabase clients
│   └── utils.ts     # Utility functions
└── styles.css       # Global styles & theme
```

## Key Patterns

### Authentication

```tsx
import { useAuth } from '~/lib/auth'

function Profile() {
  const auth = useAuth()
  return <div>Welcome, {auth.user()?.email}</div>
}
```

### Protected Routes

```tsx
import { requireAuth } from '~/lib/auth'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => await requireAuth(),
  component: DashboardPage,
})
```

### Data Fetching

```tsx
import { createRepository } from '~/lib/data'

const repo = createRepository(supabase, 'users', 'data-api')
const { data } = await repo.findMany({ limit: 10 })
```

### UI Components

```tsx
import { Button } from '~/components/ui'

<Button variant="destructive">Delete</Button>
```

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Run production build
pnpm typecheck    # Run TypeScript checks
```

## Environment Variables

Required in `.env.local`:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Contributing

This project uses:
- [Beads](https://github.com/beads-data-structure/beads) for issue tracking
- Conventional commits
- TypeScript strict mode

## License

MIT
