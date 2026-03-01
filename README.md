# Concord v2 — Project Context (for Prompting)

Use this file as the source of truth when generating or editing code for this repository.

## 1) Tech Stack + Versions

- Framework: Next.js `16.1.6` (App Router)
- UI: React `19.2.3`, React DOM `19.2.3`
- Language: TypeScript `^5` (`strict: true`)
- Styling: Tailwind CSS `^4` (`@import "tailwindcss"` in `globals.css`)
- Linting: ESLint `^9` + `eslint-config-next` `16.1.6` (`core-web-vitals` + `typescript`)
- Compiler: React Compiler enabled (`next.config.ts` -> `reactCompiler: true`)

## 2) Package Ecosystem in Use

- Forms/Validation: `react-hook-form`, `@hookform/resolvers`, `zod`
- Auth: `next-auth`, `firebase`
- UI primitives: `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`
- Utilities: `axios`, `date-fns`, `zustand`, `sonner`, `react-icons`

## 3) Current Project Structure

```txt
src/
	app/
		(auth)/
		(protected)/
		actions/
		api/
		biodatas/
		globals.css
		layout.tsx
		page.tsx
	components/
		ui/
	lib/
		axios.ts
	models/
	types/
		biodata.ts
		firebase.ts
		user.ts
```

## 4) Conventions to Preserve

- Use App Router patterns (`src/app/...`), not Pages Router.
- Keep TypeScript-first code (`.ts`/`.tsx`) with explicit shared types in `src/types`.
- Use alias imports with `@/*` (configured in `tsconfig.json`).
- Prefer reusable clients/utilities in `src/lib` (example: `axiosPublic`, `axiosSecure`).
- Keep route-group organization (`(auth)`, `(protected)`) for feature boundaries.
- Follow existing lint and Next.js defaults; do not introduce conflicting style tooling.

## 5) Styling Rules

- Use Tailwind utility classes for UI styling.
- Keep global theme tokens in `src/app/globals.css` (`--background`, `--foreground`, font vars).
- Avoid introducing a new CSS architecture unless required.

## 6) Environment Variables (currently referenced)

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 7) Local Scripts

- `npm run dev` -> start dev server
- `npm run build` -> production build
- `npm run start` -> run production server
- `npm run lint` -> lint project

## 8) Prompt Template (copy/paste)

```txt
You are editing the Concord v2 codebase.

Constraints:
- Keep stack/version compatibility: Next.js 16.1.6, React 19.2.3, Tailwind 4, TypeScript strict.
- Use App Router and existing src structure.
- Reuse existing patterns in src/lib, src/types, and src/components/ui.
- Use @/* import aliases.
- Do not add unrelated dependencies or change architecture.
- Keep code consistent with existing lint rules and project style.

Task:
[Describe your feature/bugfix here]
```
