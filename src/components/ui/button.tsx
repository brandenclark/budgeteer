import { Button as KobalteButton } from '@kobalte/core/button'
import { type VariantProps, cva } from 'class-variance-authority'
import { splitProps, type ComponentProps } from 'solid-js'
import { cn } from '../../lib/utils'

/**
 * Button variants using class-variance-authority
 *
 * Defines different visual styles and sizes for the Button component
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/50',
        destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/50',
        outline: 'border-2 border-slate-600 bg-transparent hover:bg-slate-800 text-white',
        secondary: 'bg-slate-700 text-white hover:bg-slate-600',
        ghost: 'hover:bg-slate-800 text-white',
        link: 'text-cyan-400 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ComponentProps<typeof KobalteButton>,
    VariantProps<typeof buttonVariants> {
  class?: string
}

/**
 * Button component
 *
 * Accessible button built on Kobalte with Tailwind styling.
 * Supports multiple variants and sizes.
 *
 * @example
 * <Button>Click me</Button>
 * <Button variant="destructive" size="lg">Delete</Button>
 * <Button variant="outline">Cancel</Button>
 */
export function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, ['variant', 'size', 'class'])

  return (
    <KobalteButton
      class={cn(buttonVariants({ variant: local.variant, size: local.size }), local.class)}
      {...others}
    />
  )
}
