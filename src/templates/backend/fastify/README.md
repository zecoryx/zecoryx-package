# {{projectName}}

Backend application built with Fastify.

## Structure

```
├── src/
│   ├── config/         # Database & environment configurations
│   ├── controllers/    # Request-response logic
│   ├── models/         # Data schemas
│   ├── routes/         # API endpoint definitions
│   ├── services/       # Core business logic
│   ├── middlewares/    # Plugins, auth, and error handling
│   ├── utils/          # Helper functions & constants
│   └── app.js          # Main application entry point
├── tests/              # Unit and integration tests
├── docs/               # API documentation
├── .env.example        # Template for environment variables
└── .gitignore          # Files to exclude from Git
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment:
   ```bash
   cp .env.example .env
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
