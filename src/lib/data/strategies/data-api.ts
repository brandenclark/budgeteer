import type { Database } from '../../database.types'
import type { Repository, RepositoryOptions, QueryOptions, Filter } from '../types'

/**
 * Data API Repository Implementation
 *
 * Uses Supabase PostgREST API (supabase.from()) for data access.
 * Best for simple CRUD operations and automatic RLS enforcement.
 */
export class DataApiRepository<TTable extends keyof Database['public']['Tables']>
  implements Repository<TTable>
{
  private client: RepositoryOptions<TTable>['client']
  private table: TTable

  constructor(options: RepositoryOptions<TTable>) {
    this.client = options.client
    this.table = options.table
  }

  async findById(id: string | number) {
    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single()

    return {
      data: data as Database['public']['Tables'][TTable]['Row'] | null,
      error: error as Error | null,
    }
  }

  async findMany(options?: QueryOptions) {
    let query = this.client.from(this.table).select('*')

    // Apply filters
    if (options?.filters) {
      for (const filter of options.filters) {
        query = this.applyFilter(query, filter)
      }
    }

    // Apply ordering
    if (options?.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      })
    }

    // Apply pagination
    if (options?.limit !== undefined) {
      query = query.limit(options.limit)
    }
    if (options?.offset !== undefined) {
      query = query.range(
        options.offset,
        options.offset + (options.limit ?? 10) - 1
      )
    }

    const { data, error } = await query

    return {
      data: data as Database['public']['Tables'][TTable]['Row'][] | null,
      error: error as Error | null,
    }
  }

  async create(insertData: Database['public']['Tables'][TTable]['Insert']) {
    const { data, error } = await this.client
      .from(this.table)
      .insert(insertData)
      .select()
      .single()

    return {
      data: data as Database['public']['Tables'][TTable]['Row'] | null,
      error: error as Error | null,
    }
  }

  async update(
    id: string | number,
    updateData: Database['public']['Tables'][TTable]['Update']
  ) {
    const { data, error } = await this.client
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    return {
      data: data as Database['public']['Tables'][TTable]['Row'] | null,
      error: error as Error | null,
    }
  }

  async delete(id: string | number) {
    const { error } = await this.client
      .from(this.table)
      .delete()
      .eq('id', id)

    return {
      error: error as Error | null,
    }
  }

  getTableName(): TTable {
    return this.table
  }

  private applyFilter(query: any, filter: Filter) {
    const { column, operator, value } = filter

    switch (operator) {
      case 'eq':
        return query.eq(column, value)
      case 'neq':
        return query.neq(column, value)
      case 'gt':
        return query.gt(column, value)
      case 'gte':
        return query.gte(column, value)
      case 'lt':
        return query.lt(column, value)
      case 'lte':
        return query.lte(column, value)
      case 'like':
        return query.like(column, value)
      case 'in':
        return query.in(column, value as unknown[])
      default:
        return query
    }
  }
}
