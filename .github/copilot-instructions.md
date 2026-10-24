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

Stop this app's running preview before `npm run build`, then restart it with `npm run preview` after the build finishes. Otherwise, the old process can reference outdated hashed CSS/JS URLs and cause asset 404s.

There are no configured test or lint scripts, so no single-test command is available. `tsconfig.json` extends Astro's strict TypeScript configuration.

Verify with the existing build and the README browser checklist; do not invent test/lint commands or add tooling.

## Implementation conventions

- Put pages and endpoints under `src/pages/`; use bracketed filenames for dynamic route segments.
- Keep server-only upstream requests in API routes. Type handlers with Astro's `APIRoute` and keep shared API data types in `src/types/`.
- The project uses ES modules and strict TypeScript. Follow existing Astro component and formatting conventions.
- Guard storage reads/writes and validate persisted values and API payloads. Persistence failures must not block battles; invalid API data must show a per-player error and allow retry.
- Leave corrupt saved history untouched and pause new saves until explicit Clear History; clearing removes only `mona-mayhem-history`.
- Keep storage/audio warnings separate from battle status so progress updates cannot hide them.
- Do not add packages. Press Start 2P is the only permitted external font.
- Keep changes within the requested scope. Do not modify `docs/`, `workshop/`, `localizations/`, `scripts/`, `.github/workflows/`, or `.github/skills/`.

## UI design

Use the retro arcade palette: background `#0a0a1a`, neon green `#5fed83`, purple `#8a2be2`, and error pink `#ff3366`, with Press Start 2P for the display font. Keep new UI consistent with the neon atmosphere; prefer restrained glow and the existing motion style, and disable animations when `prefers-reduced-motion` is enabled.

- Ensure styles reach browser-generated nodes; do not depend on Astro compiler-generated `data-astro-cid-*` attributes on those nodes.
- Keep one roving `tabindex="0"` per contribution graph. Arrow keys move focus within that graph, Tab/Shift+Tab leave it, and visible date/count tooltips work on both hover and keyboard focus.
