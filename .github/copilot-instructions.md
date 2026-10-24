# Copilot instructions

## Project overview

Mona Mayhem is an Astro 6 and TypeScript application for comparing GitHub contribution graphs. `src/pages/` uses Astro file-based routing; `src/pages/api/contributions/[username].ts` is the server endpoint for contribution data, and `src/pages/index.astro` is the battle UI. Shared contribution response types belong in `src/types/contributions.ts`.

The app uses `output: 'server'` with the standalone `@astrojs/node` adapter. The contribution source endpoint is `https://github.com/{username}.contribs`; the API route proxies it server-side so browser clients do not call it directly.

The upstream JSON response has `schema`, `generated_at`, `from`, `to`, `range_days`, `total_contributions`, `private_contributions_included`, `colors_full`, `weeks`, and `months`. Each week has an `index`, `first_day`, and `contribution_days`; each day has `weekday`, `count`, and `level`. `colors_full` maps levels 0–4 to colors. A missing upstream username returns 404.

## Development commands

Run from the repository root:

| Purpose | Command |
| --- | --- |
| Install locked dependencies | `npm ci` |
| Start the development server | `npm run dev` |
| Build the app | `npm run build` |
| Preview the production build | `npm run preview` |

There are no configured test or lint scripts, so no single-test command is available. `tsconfig.json` extends Astro's strict TypeScript configuration.

## Implementation conventions

- Put pages and endpoints under `src/pages/`; use bracketed filenames for dynamic route segments.
- Keep server-only upstream requests in API routes. Type handlers with Astro's `APIRoute` and keep shared API data types in `src/types/`.
- The project uses ES modules and strict TypeScript. Follow existing Astro component and formatting conventions.
- Keep changes within the requested scope. Do not modify `docs/`, `workshop/`, `localizations/`, `scripts/`, `.github/workflows/`, or `.github/skills/`.
