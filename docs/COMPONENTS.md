# Components Guide

## UI Component System

Built on Kobalte primitives with Tailwind CSS styling.

## Using Existing Components

### Button

```tsx
import { Button } from '~/components/ui'

function MyPage() {
  return (
    <div>
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>

      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔥</Button>
    </div>
  )
}
```

## Creating New Components

### Step 1: Create Component File

```tsx
// src/components/ui/input.tsx
import { TextField as KobalteTextField } from '@kobalte/core/text-field'
import { splitProps, type ComponentProps } from 'solid-js'
import { cn } from '~/lib/utils'

export interface InputProps extends ComponentProps<typeof KobalteTextField.Input> {
  class?: string
}

export function Input(props: InputProps) {
  const [local, others] = splitProps(props, ['class'])

  return (
    <KobalteTextField.Input
      class={cn(
        'px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg',
        'text-white placeholder-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-cyan-500',
        local.class
      )}
      {...others}
    />
  )
}
```

### Step 2: Export from Index

```tsx
// src/components/ui/index.ts
export { Button } from './button'
export { Input } from './input'  // Add new component
```

## Styling Patterns

### Using cn() Utility

Merge Tailwind classes with proper precedence:

```tsx
import { cn } from '~/lib/utils'

<div class={cn('px-4 py-2', 'bg-blue-500', props.class)} />
```

### Variant System

Use class-variance-authority for type-safe variants:

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const variants = cva('base-classes', {
  variants: {
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
    color: {
      blue: 'bg-blue-500',
      red: 'bg-red-500',
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'blue',
  },
})

type Props = VariantProps<typeof variants>
```

## Theme Customization

Custom theme tokens in `src/styles.css`:

```css
@theme {
  /* Budget-specific colors */
  --color-income-500: #22c55e;
  --color-expense-500: #ef4444;
  --color-savings-500: #3b82f6;

  /* Custom fonts */
  --font-family-sans: Inter, system-ui, sans-serif;
}
```

Use in components:

```tsx
<div class="bg-income-500 text-white">Income</div>
<div class="bg-expense-500 text-white">Expense</div>
```

## Accessibility

All Kobalte components are accessible by default:

- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management

Add focus styles for visibility:

```tsx
<button class="focus-visible:ring-2 focus-visible:ring-cyan-500">
  Click me
</button>
```
