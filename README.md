# PONYX — The AI Operating System for Startups

From idea to first revenue in 7 days. PONYX autonomously validates, builds, tests, and fundraises for startups.

## Quick Start

```bash
# Install dependencies
npm install

# Set up database
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

**Landing Page** — Full marketing site with hero, 4-step process, 7-day timeline, multi-agent showcase, pricing cards, and mobile-responsive navigation.

**4-Phase AI Workflow:**

| Phase | Agent | What it does |
|-------|-------|-------------|
| Validate | AI Analyst | Scores your idea against market data, generates validation report |
| Build | AI Builder | Generates landing pages, marketing copy, product architecture |
| Test | AI Growth | Plans go-to-market strategy, simulates market testing signals |
| Raise | AI Investor | Creates pitch deck outline, financial projections, data room checklist |

**Dashboard** — Project management with stats overview, progress tracking, and one-click demo project creation.

**Chat Interface** — Markdown-rendered AI responses, message persistence, copy-to-clipboard, keyboard shortcuts.

**Export** — Download full project report as markdown with all AI conversations.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** with custom PONYX dark theme
- **Prisma v7** + SQLite (LibSQL adapter)
- **NextAuth v5** (credentials auth, JWT sessions)
- **Mock AI Engine** (realistic responses, no API key required)

## Project Structure

```
src/
  app/
    page.tsx                    # Marketing landing page
    auth/signin/                # Login / Registration
    dashboard/                  # Project list + stats
    dashboard/project/[id]/     # Project detail + AI chat
    api/
      auth/                     # NextAuth handlers
      projects/                 # CRUD + export
      ai/validate|build|growth|raise/  # AI agent endpoints
  components/
    landing/                    # Hero, timeline, agents, pricing, etc.
    dashboard/                  # Chat, cards, timeline, score, stats
    ui/                         # Button, input, card, badge, skeleton
  lib/
    auth.ts                     # NextAuth v5 configuration
    db.ts                       # Prisma client (LibSQL)
    ai/mock.ts                  # Mock AI response engine
```

## Environment Variables

Copy `.env.example` to `.env`:

```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Database

```bash
npx prisma db push       # Create/update tables
npx prisma generate      # Generate client
npx prisma studio        # Visual database editor
```

## Scaling to Production

1. **Database**: Swap SQLite for PostgreSQL (update `prisma.config.ts` + adapter)
2. **Real AI**: Install `@anthropic-ai/sdk`, replace mock imports in API routes
3. **Payments**: Add Stripe integration for subscription/launch package tiers
4. **Deploy**: `npm run build && npm start` or deploy to Vercel
5. **Voice**: Add Web Speech API for voice onboarding (Day 1 pitch feature)

## License

Proprietary — PONYX
