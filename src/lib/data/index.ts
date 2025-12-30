/**
 * Data Access Layer
 *
 * Provides a repository pattern abstraction for data operations
 * with support for both Supabase Data API (PostgREST) and direct SQL.
 *
 * Usage:
 * ```ts
 * import { createRepository } from '~/lib/data'
 * import { getSupabaseServerClient } from '~/lib/supabase'
 *
 * const supabase = getSupabaseServerClient()
 * const usersRepo = createRepository(supabase, 'users', 'data-api')
 * const { data } = await usersRepo.findMany({ limit: 10 })
 * ```
 */

export { createRepository } from './factory'
export type {
  Repository,
  DataAccessStrategy,
  QueryOptions,
  Filter,
  FilterOperator,
} from './types'
export { DataApiRepository } from './strategies/data-api'
export { SqlRepository } from './strategies/sql'
