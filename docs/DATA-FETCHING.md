# Data Fetching Guide

## Repository Pattern

The application uses a repository pattern with two strategies:

- **Data API**: Supabase PostgREST (simple CRUD)
- **SQL**: Direct SQL queries (complex operations)

## Creating a Repository

```tsx
import { createRepository } from '~/lib/data'
import { getSupabaseServerClient } from '~/lib/supabase'

const supabase = getSupabaseServerClient()
const repo = createRepository(supabase, 'table_name', 'data-api')
```

## Basic Operations

### Find All

```tsx
const { data, error } = await repo.findMany()
```

### Find with Filters

```tsx
const { data, error } = await repo.findMany({
  filters: [
    { column: 'status', operator: 'eq', value: 'active' },
    { column: 'age', operator: 'gte', value: 18 }
  ],
  orderBy: { column: 'created_at', ascending: false },
  limit: 10,
  offset: 0
})
```

### Find By ID

```tsx
const { data, error } = await repo.findById(123)
```

### Create

```tsx
const { data, error } = await repo.create({
  name: 'John Doe',
  email: 'john@example.com'
})
```

### Update

```tsx
const { data, error } = await repo.update(123, {
  name: 'Jane Doe'
})
```

### Delete

```tsx
const { error } = await repo.delete(123)
```

## Strategy Selection

### Data API (Recommended for most cases)

```tsx
const repo = createRepository(supabase, 'users', 'data-api')
```

**Use when:**
- Simple CRUD operations
- Need automatic RLS enforcement
- Working with single tables
- Want built-in caching

### SQL (For advanced use cases)

```tsx
const repo = createRepository(supabase, 'users', 'sql')
```

**Use when:**
- Complex joins needed
- Performance-critical queries
- Custom aggregations
- Advanced SQL features

**Note**: Requires SQL functions migration (see `supabase/migrations/`)

## Type Safety

Repositories are fully type-safe with generated Supabase types:

```tsx
import type { Database } from '~/lib/database.types'

// TypeScript knows the shape of your data
const { data } = await usersRepo.create({
  name: 'John',  // ✓ Type-checked
  age: 25        // ✓ Type-checked
  // invalid: 'field'  // ✗ Type error
})
```

## Filter Operators

- `eq`: Equal
- `neq`: Not equal
- `gt`: Greater than
- `gte`: Greater than or equal
- `lt`: Less than
- `lte`: Less than or equal
- `like`: Pattern matching
- `in`: Value in array
