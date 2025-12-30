# Architecture Overview

This document describes the technical architecture of the Budgeteer application framework.

## Tech Stack

- **Framework**: TanStack Start with Solid
- **Styling**: Tailwind CSS v4 with custom theme tokens
- **UI Components**: Kobalte (accessible primitives)
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Data Access**: Custom repository pattern with dual strategies
- **Type Safety**: TypeScript with generated Supabase types

## Directory Structure

```
budgeteer/
├── src/
│   ├── routes/              # File-based routing
│   │   ├── __root.tsx       # Root layout with AuthProvider
│   │   ├── index.tsx        # Home page
│   │   ├── login.tsx        # Authentication page
│   │   └── dashboard.tsx    # Protected route example
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── button.tsx   # Button with variants
│   │   │   └── index.ts     # Component exports
│   │   └── Header.tsx       # App header
│   ├── lib/
│   │   ├── auth/            # Authentication layer
│   │   │   ├── context.tsx  # Auth context & provider
│   │   │   ├── server.ts    # Server-side auth utils
│   │   │   └── index.ts     # Exports
│   │   ├── data/            # Data access layer
│   │   │   ├── types.ts     # Repository interfaces
│   │   │   ├── strategies/  # Implementation strategies
│   │   │   │   ├── data-api.ts  # PostgREST implementation
│   │   │   │   └── sql.ts       # Direct SQL implementation
│   │   │   ├── factory.ts   # Repository factory
│   │   │   └── index.ts     # Exports
│   │   ├── supabase/        # Supabase clients
│   │   │   ├── client.ts    # Browser client
│   │   │   ├── server.ts    # SSR client
│   │   │   └── index.ts     # Exports
│   │   ├── database.types.ts  # Generated DB types
│   │   └── utils.ts         # Utility functions (cn)
│   ├── styles.css           # Global styles & theme
│   └── env.d.ts             # Environment type declarations
├── docs/                    # Documentation
├── supabase/
│   └── migrations/          # Database migrations
└── public/                  # Static assets
```

## Key Architectural Patterns

### SSR-First Architecture

The application uses server-side rendering for:
- **Performance**: Faster initial page loads
- **SEO**: Search engine friendly
- **Authentication**: Server-side session validation
- **Data Loading**: Fetch data before rendering

### Authentication Flow

1. **Client-side**: `AuthProvider` wraps app, manages session state
2. **Server-side**: `requireAuth()` protects routes at `beforeLoad`
3. **Session Management**: Cookie-based with Supabase SSR
4. **State Sync**: `onAuthStateChange` keeps client/server in sync

### Data Access Abstraction

Two strategies for different use cases:

- **Data API (PostgREST)**: Simple CRUD, automatic RLS
- **SQL**: Complex queries, joins, performance-critical ops

Strategy selected via factory pattern at runtime.

### Component Architecture

- **Kobalte Primitives**: Accessible base components
- **Tailwind Styling**: Utility-first CSS
- **Variant System**: Type-safe variants with CVA
- **Composition**: cn() utility for class merging

## Design Decisions

### Why TanStack Start?

- Full-stack framework for Solid
- Type-safe routing with automatic code-splitting
- Server functions for backend logic
- File-based routing
- Streaming SSR support

### Why Supabase?

- PostgreSQL database
- Built-in authentication
- Row-level security (RLS)
- Real-time subscriptions
- Generated TypeScript types

### Why Repository Pattern?

- Abstraction from data source
- Testable business logic
- Strategy switching at runtime
- Consistent API regardless of implementation

### Why Tailwind v4?

- CSS-first configuration
- Better performance
- Cleaner syntax
- Modern features
