import type { Database } from '../../database.types'
import type { Repository, RepositoryOptions, QueryOptions } from '../types'

/**
 * SQL Repository Implementation
 *
 * Uses direct SQL queries via Supabase RPC functions.
 * Best for complex queries, joins, and performance-critical operations.
 *
 * Note: Requires SQL functions to be created in Supabase database.
 * See migrations for setup.
 */
export class SqlRepository<TTable extends keyof Database['public']['Tables']>
  implements Repository<TTable>
{
  private client: RepositoryOptions<TTable>['client']
  private table: TTable

  constructor(options: RepositoryOptions<TTable>) {
    this.client = options.client
    this.table = options.table
  }

  async findById(id: string | number) {
    try {
      const { data, error } = await this.client.rpc('query_single', {
        query_text: `SELECT * FROM ${String(this.table)} WHERE id = $1`,
        params: [id],
      })

      if (error) throw error

      return {
        data: data as Database['public']['Tables'][TTable]['Row'] | null,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }

  async findMany(options?: QueryOptions) {
    try {
      let query = `SELECT * FROM ${String(this.table)}`
      const params: unknown[] = []

      // Build WHERE clause from filters
      if (options?.filters && options.filters.length > 0) {
        const conditions = options.filters.map((filter, index) => {
          params.push(filter.value)
          const paramIndex = params.length
          return `${filter.column} ${this.getOperatorSql(filter.operator)} $${paramIndex}`
        })
        query += ` WHERE ${conditions.join(' AND ')}`
      }

      // Add ORDER BY
      if (options?.orderBy) {
        query += ` ORDER BY ${options.orderBy.column} ${
          options.orderBy.ascending !== false ? 'ASC' : 'DESC'
        }`
      }

      // Add LIMIT and OFFSET
      if (options?.limit !== undefined) {
        query += ` LIMIT ${options.limit}`
      }
      if (options?.offset !== undefined) {
        query += ` OFFSET ${options.offset}`
      }

      const { data, error } = await this.client.rpc('query_many', {
        query_text: query,
        params,
      })

      if (error) throw error

      return {
        data: data as Database['public']['Tables'][TTable]['Row'][] | null,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }

  async create(insertData: Database['public']['Tables'][TTable]['Insert']) {
    try {
      const columns = Object.keys(insertData).join(', ')
      const placeholders = Object.keys(insertData)
        .map((_, i) => `$${i + 1}`)
        .join(', ')
      const values = Object.values(insertData)

      const query = `
        INSERT INTO ${String(this.table)} (${columns})
        VALUES (${placeholders})
        RETURNING *
      `

      const { data, error } = await this.client.rpc('query_single', {
        query_text: query,
        params: values,
      })

      if (error) throw error

      return {
        data: data as Database['public']['Tables'][TTable]['Row'] | null,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }

  async update(
    id: string | number,
    updateData: Database['public']['Tables'][TTable]['Update']
  ) {
    try {
      const sets = Object.keys(updateData)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(', ')
      const values = [...Object.values(updateData), id]

      const query = `
        UPDATE ${String(this.table)}
        SET ${sets}
        WHERE id = $${values.length}
        RETURNING *
      `

      const { data, error } = await this.client.rpc('query_single', {
        query_text: query,
        params: values,
      })

      if (error) throw error

      return {
        data: data as Database['public']['Tables'][TTable]['Row'] | null,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }

  async delete(id: string | number) {
    try {
      const query = `DELETE FROM ${String(this.table)} WHERE id = $1`

      const { error } = await this.client.rpc('execute_sql', {
        query_text: query,
        params: [id],
      })

      if (error) throw error

      return { error: null }
    } catch (error) {
      return {
        error: error as Error,
      }
    }
  }

  getTableName(): TTable {
    return this.table
  }

  private getOperatorSql(operator: string): string {
    const mapping: Record<string, string> = {
      eq: '=',
      neq: '!=',
      gt: '>',
      gte: '>=',
      lt: '<',
      lte: '<=',
      like: 'LIKE',
      in: 'IN',
    }
    return mapping[operator] || '='
  }
}
