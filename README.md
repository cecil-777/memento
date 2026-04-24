# Memento PKM

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cecil-777/memento)

A modern, full-stack Personal Knowledge Management (PKM) application built with React, TypeScript, Tailwind CSS, and Shadcn/UI. Powered by Cloudflare Workers for the backend API and optimized for performance, scalability, and developer experience.

## Features

- **Full-Stack TypeScript**: End-to-end type safety with React, Hono, and Cloudflare Workers.
- **Modern UI**: Responsive design with Tailwind CSS, Shadcn/UI components, and Framer Motion animations.
- **State Management**: TanStack Query for data fetching, Zustand for client state, and Immer for immutable updates.
- **Developer Tools**: Hot reload, error boundaries, theme toggle (light/dark), and client-side error reporting.
- **API Ready**: Hono-based backend with CORS, logging, and health checks. Extend via `worker/userRoutes.ts`.
- **Deployment Optimized**: Zero-config deployment to Cloudflare Workers with asset bundling via Vite.
- **Mobile Responsive**: Hooks for mobile detection and responsive layouts.
- **Production Ready**: ESLint, TypeScript strict mode, and Tailwind JIT compilation.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Shadcn/UI, Lucide Icons, Framer Motion, React Router
- **State & Data**: TanStack React Query, Zustand, React Hook Form, Zod
- **Backend**: Hono, Cloudflare Workers, Workers KV/Durable Objects ready
- **UI Components**: Radix UI primitives, Sonner (toasts), Headless UI
- **Utilities**: clsx, Tailwind Merge, date-fns, UUID
- **Dev Tools**: Bun, ESLint, Wrangler

## Quick Start

1. **Install dependencies** (using Bun):
   ```bash
   bun install
   ```

2. **Start development server**:
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`).

3. **Build for production**:
   ```bash
   bun build
   ```

## Development

- **Add frontend routes**: Edit `src/main.tsx` and `src/pages/`.
- **Add API routes**: Implement in `worker/userRoutes.ts`. Auto-reloads in dev.
- **Custom UI**: Use Shadcn components from `@/components/ui/*`. Add via `npx shadcn-ui@latest add <component>`.
- **Theme**: Supports light/dark mode with `useTheme()` hook.
- **Error Reporting**: Client errors auto-reported to `/api/client-errors`.
- **Linting**:
  ```bash
  bun lint
  ```
- **Type Generation**:
  ```bash
  bun cf-typegen
  ```

Extend the sidebar in `src/components/app-sidebar.tsx` or use `AppLayout` for layouts.

## Deployment

Deploy to Cloudflare Workers with one command:

```bash
bun deploy
```

This builds assets and deploys via Wrangler.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cecil-777/memento)

### Manual Deployment

1. Install Wrangler: `bun add -d wrangler`
2. Login: `wrangler login`
3. Deploy: `bun deploy` or `wrangler deploy`

Config in `wrangler.jsonc`. Assets served as SPA with API proxying.

### Environment Variables

Set via Wrangler dashboard or `wrangler.toml`:

```toml
[vars]
API_URL = "https://your-worker.your-account.workers.dev"
```

## Project Structure

```
├── src/              # React app
│   ├── components/   # UI components (Shadcn + custom)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utilities
│   ├── pages/        # Route pages
│   └── main.tsx      # App entry
├── worker/           # Cloudflare Worker API
│   ├── index.ts      # Core handler (do not edit)
│   └── userRoutes.ts # Your API routes
├── tailwind.config.js # Theme & animations
└── vite.config.ts    # Vite + Cloudflare plugin
```

## Contributing

1. Fork the repo.
2. Create a feature branch.
3. Install deps with Bun.
4. Submit PR with clear description.

## License

MIT. See [LICENSE](LICENSE) for details.