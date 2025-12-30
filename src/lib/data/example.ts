/**
 * Data Access Layer - Usage Examples
 *
 * This file demonstrates how to use the repository pattern
 * for data access operations.
 */

import { createRepository } from './factory'
import { getSupabaseServerClient } from '../supabase'

// Example 1: Using Data API (PostgREST) strategy
export async function exampleDataApi() {
  const supabase = getSupabaseServerClient()

  // Create repository for a table (replace 'users' with your actual table name)
  const usersRepo = createRepository(supabase, 'users' as any, 'data-api')

  // Find all records
  const { data: allUsers } = await usersRepo.findMany()

  // Find with filters and pagination
  const { data: activeUsers } = await usersRepo.findMany({
    filters: [{ column: 'status', operator: 'eq', value: 'active' }],
    orderBy: { column: 'created_at', ascending: false },
    limit: 10,
    offset: 0,
  })

  // Find by ID
  const { data: user } = await usersRepo.findById(123)

  // Create new record
  const { data: newUser } = await usersRepo.create({
    email: 'user@example.com',
    name: 'John Doe',
  } as any)

  // Update record
  const { data: updatedUser } = await usersRepo.update(123, {
    name: 'Jane Doe',
  } as any)

  // Delete record
  await usersRepo.delete(123)

  return { allUsers, activeUsers, user, newUser, updatedUser }
}

// Example 2: Using SQL strategy for complex queries
export async function exampleSql() {
  const supabase = getSupabaseServerClient()

  // Create repository with SQL strategy
  const usersRepo = createRepository(supabase, 'users' as any, 'sql')

  // Same API as Data API, but uses direct SQL queries
  const { data: users } = await usersRepo.findMany({
    filters: [{ column: 'age', operator: 'gte', value: 18 }],
    limit: 100,
  })

  return users
}

// Example 3: Strategy selection based on use case
export function getRepository(table: string, useComplexQueries = false) {
  const supabase = getSupabaseServerClient()
  const strategy = useComplexQueries ? 'sql' : 'data-api'

  // Data API: Best for simple CRUD, automatic RLS enforcement
  // SQL: Best for complex queries, joins, performance-critical operations

  return createRepository(supabase, table as any, strategy)
}

// Example 4: Type-safe usage with actual tables
// When you have actual tables in your database:
/*
import type { Database } from '../database.types'

export async function getTransactions() {
  const supabase = getSupabaseServerClient()
  const transactionsRepo = createRepository(supabase, 'transactions', 'data-api')

  const { data, error } = await transactionsRepo.findMany({
    filters: [
      { column: 'user_id', operator: 'eq', value: currentUserId },
      { column: 'amount', operator: 'gt', value: 100 }
    ],
    orderBy: { column: 'created_at', ascending: false },
    limit: 50
  })

  return { data, error }
}
*/
