import { createFileRoute, redirect } from '@tanstack/solid-router'
import { requireAuthClient } from '../lib/auth'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    await requireAuthClient()
  },
  component: () => {
    // Redirect to dashboard
    redirect({ to: '/dashboard', throw: true })
  },
})
