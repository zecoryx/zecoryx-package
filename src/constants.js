/**
 * Zecoryx CLI Constants
 */

export const AUTHOR = {
  name: "Lazizbek Abdullayev",
  nickname: "zecoryx",
  email: "lazizbekabdullayev118@gmail.com",
  portfolio: "https://zecoryx.uz",
  github: "https://github.com/zecoryx",
  telegram: "https://t.me/zecoryx",
};

export const ACTIONS = {
  NEW_PROJECT: "new-project",
  SKILLS_ONLY: "skills-only",
  STRUCTURE_ONLY: "structure-only",
};

export const CATEGORIES = {
  FRONTEND: "frontend",
  ADMIN: "admin",
  BACKEND: "backend",
  TELEGRAM_BOT: "telegram-bot",
  FULLSTACK: "fullstack",
};

export const STRUCTURES = {
  frontend: `## Frontend Structure
  
  /src
  │── /assets         # Global static files
  │── /components     # Shared, global UI components
  │── /config         # Configuration files
  │── /features       # Feature-based modular folders
  │── /hooks          # Reusable global custom hooks
  │── /layouts        # Shared layouts
  │── /lib            # Configurations for external libraries
  │── /pages          # Entry points for routes
  │── /routes         # Application routing definitions
  │── /services       # Global API/service logic
  │── /stores         # Global state management
  │── /types          # Global TypeScript interfaces
  └── /utils          # Global utility functions`,

  admin: `## Admin Panel Structure
  
  /src
  │── /assets         # Icons, global styles, images
  │── /components     # Shared UI components
  │── /config         # API configurations, constants
  │── /features       # Admin modules
  │── /hooks          # Custom hooks
  │── /layouts        # Dashboard layouts
  │── /pages          # Route components
  │── /services       # API integration layer
  │── /stores         # Global state
  └── /utils          # Helpers`,

  backend: `## Backend Structure
  
  /project-root
  │── /src
  │   │── /config         # Database & environment configurations
  │   │── /controllers    # Request-response logic
  │   │── /models         # Data schemas
  │   │── /routes         # API endpoint definitions
  │   │── /services       # Core business logic
  │   │── /middlewares    # Auth, logging, and error handling
  │   │── /utils          # Helper functions & constants
  │   └── app.js          # Main application entry point
  │── /tests              # Unit and integration tests
  │── /docs               # API documentation
  └── README.md           # Project documentation`,

  bot: `## Telegram Bot Structure
  
  ├── .github/          # GitHub actions
  ├── cmd/              # Main entry point
  ├── configs/          # Configuration files
  ├── handlers/         # Message/command logic
  ├── keyboards/        # UI components
  ├── locales/          # Translation files
  ├── middlewares/      # Pre/post-processing
  ├── models/           # Database schemas
  ├── pkg/              # Public library code
  ├── services/         # Core business logic
  ├── utils/            # Helper functions
  └── bot.js            # Entry script`,

  fullstack: `## Fullstack Structure
  
  my-fullstack-app/
  ├── client/ (or frontend/)     # Frontend application
  ├── server/ (or backend/)     # Backend API
  ├── shared/ (optional)        # Shared types or utilities
  └── README.md                 # Project documentation`
};

export const PACKAGE_MANAGERS = {
  NPM: "npm",
  YARN: "yarn",
  PNPM: "pnpm",
  BUN: "bun",
};
