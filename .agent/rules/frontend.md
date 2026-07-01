---
trigger: always_on
---

# Frontend Rules

Stack:

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Shadcn UI

Rules:

- Always use TypeScript
- Avoid any
- Prefer reusable components
- Keep files modular
- Prefer composition over huge components

Architecture:

- Feature-based architecture
- Shared UI components inside src/components/ui
- Shared layouts inside src/components/layout

Avoid:

- Monolithic components
- Duplicate logic
- Inline styles
- CSS modules

Imports:

- Use absolute imports
- Keep imports organized

Naming:

- Components: PascalCase
- Hooks: useSomething
- Functions: camelCase
- Constants: UPPER_CASE
