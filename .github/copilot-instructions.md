# Copilot instructions

## Project overview

Mona Mayhem is a workshop template for building a GitHub contribution battle arena. The repository contains two separate deliverables:

- The Astro app lives in `src/pages/`. `astro.config.mjs` uses server output and the standalone `@astrojs/node` adapter. Astro file-based routes define the page and API endpoints.
- The workshop and documentation are static content in `workshop/` and `docs/`. `.github/workflows/deploy.yml` publishes these directories directly to GitHub Pages; it does not build or deploy the Astro app. Keep this distinction in mind when changing deployment behavior.

The app is intentionally a starting scaffold: `src/pages/index.astro` is a placeholder, and `src/pages/api/contributions/[username].ts` currently returns HTTP 501. The workshop describes the intended contribution-data flow: fetch JSON from `https://github.com/{username}.contribs` through the server-side API route, then render and compare the two users' contribution data in the page.

## Build, test, and lint

Run these commands from the repository root:

| Purpose | Command |
| --- | --- |
| Install locked dependencies | `npm ci` |
| Start the Astro development server | `npm run dev` |
| Build the Astro app | `npm run build` |
| Preview the production build | `npm run preview` |

There are currently no test or lint scripts or test/lint runners in `package.json`, so there is no configured single-test command. The TypeScript configuration extends Astro's strict configuration (`tsconfig.json`).

## Code conventions

- Use Astro's file-based routing: page files go under `src/pages/`, and dynamic API routes use bracketed path segments such as `[username].ts`.
- Keep API endpoints server-rendered: the contribution route sets `export const prerender = false` and uses Astro's `APIRoute` type. Preserve the dynamic route when implementing its handler.
- The project uses ES modules (`"type": "module"`) and strict TypeScript. Type API route handlers with Astro's exported types.
- Localized workshop content lives alongside the English source under `workshop/` (for example, `workshop/ko/`). Follow `.github/skills/localizations/SKILL.md` when changing localized content or its workflow.
