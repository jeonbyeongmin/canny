## Business Logic Change Rule

Before any change:

- Create a test case for the target business logic.
- Use Vitest to write the test case.

After code change:

- Implement or modify the business logic.
- Run the test.
- The test must pass. Do not stop modifying until the code passes the test

---

Project Context

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: React hooks, Zustand, tanstack-query
- Testing: Vitest
- Linting & Formatting: ESLint, Prettier

---

Coding Style Rules

General

- Use functional components.
- Use arrow functions for components and callbacks.
- Always use TypeScript types and interfaces.
- Prefer composition over inheritance.
- Separate business logic from UI (use hooks or utils).

React

- Use latest React hooks (e.g. useFormStatus).
- Optimize with useCallback, useMemo.
- Avoid prop drilling; use Zustand if needed.
- Use controlled components for forms.
- Use useEffect with correct dependencies.

Next.js

- Use react server components as much as possible
- Fetch data inside page.tsx or layout.tsx using async functions.
- Use generateStaticParams when static route generation is required.
- Use dynamic imports to reduce bundle size.
- Use the next/image component for image optimization. For external images, configure allowed domains in next.config.js using remotePatterns.
- Use next/link for navigation.

---

TypeScript Rules

- Always type component props.
- Prefer interface over type for component props.
- Enable strictNullChecks.
- Avoid any; if used, explain why.

---

File & Folder Conventions

- File names: kebab-case (example: my-component.tsx).
- Folder structure:
- /components: reusable components.
- /hooks: custom hooks.
- /lib or /utils: API utilities.
- /types: types & interfaces.
- For client-side env variables: use prefix NEXT*PUBLIC*.

---

Copilot Usage Guide

✅ Allowed:

- Typed React components.
- Typed hooks.
- Utility functions.
- Vitest test cases.
- Suggesting Next.js best practices.

🚫 Avoid:

- Inline styles (unless asked).
- Deprecated React lifecycles.
- Class components.
- Unnecessary libraries.
