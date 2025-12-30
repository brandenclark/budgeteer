# Deployment Guide

## Build Process

Build the application for production:

```bash
pnpm build
```

This creates optimized bundles in `.output/`.

## Environment Variables

Required environment variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Deployment Options

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Cloudflare Pages

1. Connect GitHub repository
2. Build command: `pnpm build`
3. Output directory: `.output/public`
4. Set environment variables

### Node.js Server

Run with Node.js:

```bash
pnpm build
node .output/server/index.mjs
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
CMD ["node", ".output/server/index.mjs"]
```

## Database Setup

### 1. Create Supabase Project

Visit [supabase.com](https://supabase.com) and create a new project.

### 2. Run Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 3. Generate Types

```bash
supabase gen types typescript --project-id your-project-id > src/lib/database.types.ts
```

### 4. Enable RLS

Enable Row Level Security on all tables:

```sql
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
```

Create policies for auth:

```sql
CREATE POLICY "Users can view own data"
  ON your_table
  FOR SELECT
  USING (auth.uid() = user_id);
```

## Performance Optimization

### Enable Caching

```tsx
// In route loader
export const Route = createFileRoute('/posts')({
  loader: async () => {
    const data = await fetchData()
    return data
  },
  staleTime: 1000 * 60 * 5, // Cache for 5 minutes
})
```

### Code Splitting

TanStack Start automatically code-splits routes.

### Image Optimization

Use optimized image formats (WebP, AVIF):

```tsx
<picture>
  <source srcset="/image.avif" type="image/avif" />
  <source srcset="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Fallback" />
</picture>
```

## Monitoring

### Error Tracking

Consider integrating:
- Sentry
- LogRocket
- Datadog

### Analytics

- Google Analytics
- Plausible
- Umami

## Security Checklist

- [ ] Environment variables set correctly
- [ ] RLS policies enabled on all tables
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation on all forms
- [ ] SQL injection prevention (use parameterized queries)
