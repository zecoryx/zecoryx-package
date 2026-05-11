# Zecoryx CLI

A professional project generator designed for modern web development. This tool scaffolds high-quality project structures following industry best practices like Clean Architecture and Feature-Driven Design.

## Core Features

- **Standardized Architectures:** Automatically generates `structure.md` to document the chosen project layout.
- **Frontend & Admin:** Feature-based modular structure for React and Next.js applications.
- **Backend:** Layered Clean Architecture for Express and Fastify (Node.js).
- **Telegram Bots:** Modular event-driven structure for grammY, Telegraf, and NTBA.
- **Fullstack Monorepo:** Integrated Frontend and Backend with a shared utility layer and Docker support.
- **Team Handbook:** Optional `skills/` directory with guidelines for Code Reviews, Git Workflows, and Naming Conventions.
- **SEO Optimized:** Frontend templates achieve 100% SEO scores in Lighthouse audits.

## Project Categories

### 1. Frontend & Admin Panel
Uses a **Feature-Based Structure** inspired by Bulletproof React.
- `src/features/`: Self-contained modules (auth, dashboard, etc.) with their own API, components, and hooks.
- `src/components/`: Shared global UI components.
- `src/layouts/`: Reusable page wrappers.

### 2. Backend API
Follows a **Standard Layered Structure**.
- `src/controllers/`: Request and response handling.
- `src/services/`: Core business logic.
- `src/models/`: Data schemas and types.
- `src/routes/`: API endpoint definitions.

### 3. Telegram Bot
A **Modular Structure** for scalable bot development.
- `handlers/`: Command and message logic.
- `keyboards/`: Interface components.
- `middlewares/`: Request processing layers.

### 4. Fullstack
A **Monorepo** approach for seamless development.
- `client/`: Frontend application.
- `server/`: Backend API.
- `shared/`: Shared TypeScript types and validation schemas.
- `docker-compose.yml`: Local orchestration setup.

## Getting Started

Generate a new project using npx:

```bash
npx zecoryx-tools
```

Follow the interactive prompts to configure your project name, framework, and additional features like linting or team guidelines.

## Architecture Documentation

Each project includes a `structure.md` file that explains the specific folder hierarchy and the purpose of each directory, ensuring new team members can onboard quickly.

## Author

Lazizbek Abdullayev (Zecoryx)
[Portfolio](https://zecoryx.uz) | [Telegram](https://t.me/zecoryx)
