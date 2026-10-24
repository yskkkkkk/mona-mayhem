🌐 English | [Español](README.es.md) | [Português (Brasil)](README.pt_BR.md) | [한국어](README.ko.md)

# Mona Mayhem — GitHub Contribution Battle Arena

Compare two GitHub users in a retro arcade battle. The Astro server app fetches contribution data through a server-side API proxy and displays contribution graphs, streaks, and a battle winner.

## Run locally

Requires Node.js and npm. From the repository root:

```bash
npm ci
npm run dev
```

Open [http://localhost:4321](http://localhost:4321), enter two GitHub usernames, and start a battle.

To check a production build:

```bash
npm run build
npm run preview
```

If this app's preview is already running, stop it before `npm run build`, then restart it with `npm run preview` after the build finishes. An old preview process can reference outdated hashed CSS/JS URLs, causing 404s and broken styling or scripts.

## Features

- Side-by-side contribution graphs with daily tooltips and color-level legends
- Contribution totals, date ranges, longest streaks, and a winner banner
- Alternate neon theme, recent battle history, optional synthesized sound, and shareable results

## Contribution API

`GET /api/contributions/{username}` proxies GitHub's `https://github.com/{username}.contribs` endpoint from the server, avoiding browser CORS restrictions. Valid usernames receive the upstream JSON, including `from`, `to`, `total_contributions`, `colors_full`, `weeks`, and `months`. Invalid usernames return `400`, missing GitHub users return `404`, and upstream failures return `502`. Successful responses are cached in memory for 10 minutes; `X-Cache` reports `MISS` or `HIT`.

## Browser verification checklist

These manual checks are pending. Use browser DevTools for viewport, reduced-motion, storage, and API-response simulations where needed.

- [ ] Battle `octocat` vs `torvalds`; both graphs, totals, streaks, and the winner appear. Repeat using Enter in either username field.
- [ ] Submit blank and malformed usernames (for example, `bad/name`) in either field; clear validation errors appear and correcting the inputs allows a battle.
- [ ] Try a validly formatted but nonexistent GitHub username in each player position separately; the API error identifies that player, loading ends, and a corrected retry works.
- [ ] Check 12px graph cells and five legend swatches per graph. Hover and keyboard-focus days to see visible tooltips with the correct date and contribution count.
- [ ] Tab enters each graph at one day; arrow keys move focus within that graph, and Tab/Shift+Tab leave rather than traversing every cell. Focused tooltips remain visible, including near graph edges.
- [ ] At 1024px, 768px, and mobile widths (for example, 375px), controls and results remain usable. Wide graphs scroll horizontally inside their own containers, without page-level horizontal scrolling.
- [ ] Switch themes and reload; the selected theme persists.
- [ ] Run several battles and reload; up to 10 recent battles are retained. Clear history and reload; it stays empty without clearing the saved theme.
- [ ] Share a winner result and a tie (use the same username for both players); the shared/copied winner or tie status, both names, and both contribution counts match the displayed results.
- [ ] Check the countdown and results slide-in. Enable reduced motion and repeat; animations are suppressed while the battle still reaches its results.
- [ ] Simulate `localStorage` read/write/remove failures, including quota errors; a warning remains visible during battles while sharing and theme changes remain usable, without uncaught errors.
- [ ] Simulate corrupt saved theme/history data. Invalid JSON, non-array history, or mixed invalid history entries must not block battles: the stored history stays untouched, valid records display, and new saves pause until a successful Clear History.
- [ ] Simulate invalid JSON or an unexpected contribution API response shape; the affected player gets a readable error while any valid player's graph remains visible. No winner/share result is offered, loading ends, and a valid retry succeeds.

# 🎮 Mona Mayhem

**VS Code & GitHub Copilot CLI Workshop** — Build a GitHub Contribution Battle Arena

A workshop template for building a retro arcade-themed website with Astro that compares GitHub contribution graphs of two users. This is the **starting point** — you'll build the app step by step using GitHub Copilot.

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*What you'll build by the end of the workshop*

## 📚 Workshop

The workshop supports two tracks — follow the one that matches your preferred workflow:

- **VS Code track** — Chat, Plan Mode, Agent Mode, background agents, and editor-native review loops
- **CLI track** — `copilot`, `@file` context, `/plan`, autonomous edits, `/fleet`, `/delegate`, and `/review`

| Part | Title | Copilot Focus |
|------|-------|---------------|
| [00](workshop/00-overview.md) | Overview | Track selection and learning goals |
| [01](workshop/01-setup.md) | Setup & Context Engineering | Instructions, permissions, and environment setup |
| [02](workshop/02-plan-and-scaffold.md) | Plan & Scaffold | Planning the API and page architecture |
| [03](workshop/03-agent-mode.md) | Build the Game | Agentic implementation and iteration |
| [04](workshop/04-design-vibes.md) | Design-First Theming | Visual design planning and implementation |
| [05](workshop/05-polish.md) | Polish & Parallel Work | Parallelism, reviews, and quality passes |
| [06](workshop/06-bonus.md) | Bonus & Extensions | Open-ended feature ideas and extra Copilot experiments |

## 🚀 Quick Start

1. **Create your own repo first** by either:
   - clicking **Use this template** to create a new repo, or
   - forking this repository.
2. Choose your workshop path:
   - **VS Code:** clone your repo and open it in VS Code.
   - **GitHub Copilot CLI:** clone your repo locally, install `copilot`, and work from your terminal.
3. Follow the [workshop guide](workshop/00-overview.md)

## Prerequisites

### Shared

- GitHub Copilot (Pro, Business, or Enterprise)
- Git
- Node.js

### VS Code track

- VS Code v1.107+
- GitHub Copilot extension signed in

### CLI track

- GitHub Copilot CLI (`copilot`)
- Node.js 22+ if you plan to install the CLI via `npm install -g @github/copilot`
- Or Homebrew / WinGet if you prefer a native package manager install

## Technology Stack

- **Framework**: [Astro](https://astro.build/) v6
- **Runtime**: Node.js with [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) adapter
- **Font**: Press Start 2P (retro gaming font)
- **API**: GitHub's contribution graph API

## Deployment Notes

### Current GitHub Pages setup

The workflow in `.github/workflows/deploy.yml` currently deploys static workshop/docs content from `docs/` and `workshop/` to GitHub Pages. It does not build or deploy the Astro app from `src/`.

### If you want to deploy the Astro app to GitHub Pages

GitHub Pages is static hosting, so the Astro app should use static output.

1. Change `output` in `astro.config.mjs` from `server` to `static`.
2. Remove the Node adapter (`@astrojs/node`) from `astro.config.mjs` and `package.json`.
3. Update the GitHub Actions workflow to run `npm ci` and `npm run build`, then upload `dist/` as the Pages artifact.
4. If deploying to a project page (`https://<user>.github.io/<repo>/`), set `site` and `base` in `astro.config.mjs`.

If you plan to keep API routes running in production, use a server platform instead of GitHub Pages (for example, Vercel, Netlify, or a Node host).

## License

MIT
