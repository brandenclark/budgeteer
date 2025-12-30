import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'
import type { Repository, DataAccessStrategy } from './types'
import { DataApiRepository } from './strategies/data-api'
import { SqlRepository } from './strategies/sql'

/**
 * Create a repository for a table with the specified strategy
 *
 * @param client Supabase client instance
 * @param table Table name from the database schema
 * @param strategy Data access strategy ('data-api' or 'sql')
 * @returns Repository instance with CRUD operations
 *
 * @example
 * // Using Data API (PostgREST)
 * const usersRepo = createRepository(supabase, 'users', 'data-api')
 * const { data } = await usersRepo.findMany()
 *
 * @example
 * // Using direct SQL queries
 * const usersRepo = createRepository(supabase, 'users', 'sql')
 * const { data } = await usersRepo.findById(123)
 */
export function createRepository<TTable extends keyof Database['public']['Tables']>(
  client: SupabaseClient<Database>,
  table: TTable,
  strategy: DataAccessStrategy = 'data-api'
): Repository<TTable> {
  const options = { client, table, strategy }

  switch (strategy) {
    case 'data-api':
      return new DataApiRepository<TTable>(options)
    case 'sql':
      return new SqlRepository<TTable>(options)
    default:
      throw new Error(`Unknown strategy: ${strategy}`)
  }
}
