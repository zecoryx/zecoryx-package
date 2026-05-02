# zecoryx-cli

A professional scaffolding tool designed to generate modern projects based on Clean Architecture principles.

## Quick Start

The fastest way to start a new project is using `npx`:

```bash
npx zecoryx-cli
```

## Features

- **Frontend:** React (Vite) and Next.js with Tailwind CSS v4 or Chakra UI v3.
- **Backend:** Express.js, Fastify, and NestJS with layered architecture.
- **Telegram Bot:** grammY, Telegraf, and NTBA templates.
- **Authentication:** Ready-to-use integration for Clerk, Supabase, and Firebase.
- **Database:** Support for PostgreSQL, MongoDB, and Supabase.
- **Modern Tooling:** Built-in ESLint, Prettier, Zustand, and Axios support.

## Usage

You can also install the CLI globally:

```bash
npm install -g zecoryx-cli
zecoryx
```

## Project Structure

Every project is structured into industry-standard layers:
- `api/` – Routes and Controllers.
- `core/` – Business logic and Services.
- `infrastructure/` – Database and External services.

---

**Author:** [Lazizbek Abdullayev](https://zecoryx.uz)  
**License:** MIT
