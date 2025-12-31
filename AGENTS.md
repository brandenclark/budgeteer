# Agent Instructions

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

## Coding Standards

### Solid.js Best Practices

- **Use functional components** - Prefer function declarations over class components
- **Use createSignal() for reactive state** - Solid's primary reactivity primitive
- **Use .tsx extension for files with JSX** - Clear indication of JSX content
- **Use type-safe context with createContext** - Proper typing for context
- **Implement proper typing for event handlers** - Type safety throughout

### Tailwind CSS Best Practices

- **Utility-first CSS approach** - Compose styles from utility classes
- **Use @apply directive** - Create reusable styles in CSS files
- **Responsive design** - Utilize Tailwind's responsive classes (sm:, md:, lg:, etc.)
- **Dark mode** - Implement using Tailwind's dark variant
- **Global styles** - Use `/src/styles.css` for global styles
- **Custom styles** - Use @layer directive for custom utilities
- **JIT mode** - Just-In-Time compilation for faster development

### TypeScript Standards

- **Strict mode enabled** - Use TypeScript's strict mode
- **Proper typing** - Follow TypeScript best practices and naming conventions
- **Type assertions** - Use sparingly and only when necessary
- **Strict checks** - Implement strict TypeScript checks throughout

