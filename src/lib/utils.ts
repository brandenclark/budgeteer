import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper precedence
 *
 * Combines clsx for conditional classes and tailwind-merge
 * to handle Tailwind class conflicts.
 *
 * @example
 * cn('px-4 py-2', 'bg-blue-500', { 'text-white': true })
 * // => 'px-4 py-2 bg-blue-500 text-white'
 *
 * @example
 * // Later classes override earlier ones
 * cn('px-4', 'px-6')
 * // => 'px-6'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
