import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

/**
 * Data access strategy type
 */
export type DataAccessStrategy = 'data-api' | 'sql'

/**
 * Filter operators for query building
 */
export type FilterOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in'

/**
 * Filter condition for queries
 */
export interface Filter {
  column: string
  operator: FilterOperator
  value: unknown
}

/**
 * Query options for data access
 */
export interface QueryOptions {
  filters?: Filter[]
  orderBy?: {
    column: string
    ascending?: boolean
  }
  limit?: number
  offset?: number
}

/**
 * Repository interface for data access
 *
 * Provides a consistent interface for data operations
 * regardless of the underlying strategy (Data API or SQL).
 */
export interface Repository<TTable extends keyof Database['public']['Tables']> {
  /**
   * Find a single record by ID
   */
  findById(id: string | number): Promise<{
    data: Database['public']['Tables'][TTable]['Row'] | null
    error: Error | null
  }>

  /**
   * Find multiple records with optional filters
   */
  findMany(options?: QueryOptions): Promise<{
    data: Database['public']['Tables'][TTable]['Row'][] | null
    error: Error | null
  }>

  /**
   * Create a new record
   */
  create(
    data: Database['public']['Tables'][TTable]['Insert']
  ): Promise<{
    data: Database['public']['Tables'][TTable]['Row'] | null
    error: Error | null
  }>

  /**
   * Update a record by ID
   */
  update(
    id: string | number,
    data: Database['public']['Tables'][TTable]['Update']
  ): Promise<{
    data: Database['public']['Tables'][TTable]['Row'] | null
    error: Error | null
  }>

  /**
   * Delete a record by ID
   */
  delete(id: string | number): Promise<{
    error: Error | null
  }>

  /**
   * Get the table name
   */
  getTableName(): TTable
}

/**
 * Repository constructor options
 */
export interface RepositoryOptions<TTable extends keyof Database['public']['Tables']> {
  client: SupabaseClient<Database>
  table: TTable
  strategy: DataAccessStrategy
}
