import { FrontendGenerator } from "./frontend.js";
import { BackendGenerator } from "./backend.js";
import { TelegramBotGenerator } from "./telegram-bot.js";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";

export class ProjectGenerator {
  constructor(options) {
    this.options = options;
  }

  async init() {
    const projectPath = path.resolve(process.cwd(), this.options.projectName);
    const isCurrentDir = this.options.projectName === "." || this.options.projectName === "./";

    // If current dir, use the folder name as project name for package.json etc.
    if (isCurrentDir) {
      this.options.projectName = path.basename(projectPath);
    }

    // Check if project directory already exists and is not empty (Only for new projects)
    if (this.options.action === "new-project" && await fs.pathExists(projectPath)) {
      const files = await fs.readdir(projectPath);
      if (files.length > 0) {
        // If it's current dir, check if it's "mostly" empty
        const importantFiles = files.filter(f => !['.git', '.DS_Store', 'Thumbs.db'].includes(f));
        if (importantFiles.length > 0) {
          console.log(
            chalk.red(
              `\nError: Directory '${isCurrentDir ? '.' : this.options.projectName}' is not empty! Please use an empty directory or specify a new project name.`,
            ),
          );
          process.exit(1);
        }
      }
    }

    // Update options with resolved absolute path for internal use if needed,
    // but generators currently use path.join(process.cwd(), projectName)
    // so let's be careful.
    // Most generators do: path.join(process.cwd(), this.options.projectName)
    // If I changed this.options.projectName to folder name, it will try to create a new folder!
    // So I need a separate variable for the installation directory vs the project name.

    this.options.installPath = projectPath;

    if (this.options.action === "skills-only") {
      await this.addSkillsGuidelines();
      console.log(chalk.green.bold(`\n✔ Skills & Guidelines added to '${this.options.projectName}' successfully.`));
      return;
    }

    if (this.options.action === "structure-only") {
      if (this.options.structureDoc && this.options.structureDoc !== "none") {
        await this.generateStructureMd();
      }
      console.log(chalk.green.bold(`\n✔ structure.md added to '${this.options.projectName}' successfully.`));
      return;
    }

    const { category } = this.options;

    if (category === "frontend" || category === "admin") {
      const generator = new FrontendGenerator(this.options);
      await generator.init();
    } else if (category === "backend") {
      const generator = new BackendGenerator(this.options);
      await generator.init();
    } else if (category === "telegram-bot") {
      const generator = new TelegramBotGenerator(this.options);
      await generator.init();
    } else if (category === "fullstack") {
      await this.initFullstack();
    } else {
      // Fallback for old prompt structure
      const generator = new FrontendGenerator(this.options);
      await generator.init();
    }

    if (this.options.structureDoc && this.options.structureDoc !== "none") {
      await this.generateStructureMd();
    }

    if (this.options.addSkills) {
      await this.addSkillsGuidelines();
    }
  }

  async addSkillsGuidelines() {
    const projectPath = this.options.installPath || path.join(process.cwd(), this.options.projectName);
    const skillsTemplatePath = path.join(__dirname, "..", "templates", "skills");
    const destPath = path.join(projectPath, "skills");

    if (await fs.pathExists(skillsTemplatePath)) {
      await fs.ensureDir(destPath);
      await fs.copy(skillsTemplatePath, destPath);
      console.log(chalk.cyan(`\n📚 Added team skills & guidelines to /skills directory.`));
    }
  }

  async generateStructureMd() {
    const projectPath = this.options.installPath || path.join(process.cwd(), this.options.projectName);
    const type = this.options.structureDoc;
    let content = "";

    const structures = {
      frontend: `## Frontend Structure
  
  /src
  │── /assets         # Global static files (images, icons, global styles)
  │── /components     # Shared, global UI components (Buttons, Inputs, Modals)
  │── /config         # Configuration files (API endpoints, global constants)
  │── /features       # Feature-based modular folders
  │   └── /auth       # Example feature: Authentication
  │       ├── /api    # Feature-specific API calls
  │       ├── /components # Components only used in this feature
  │       ├── /hooks  # Feature-specific custom hooks
  │       ├── /types  # TypeScript types for this feature
  │       └── index.ts # Entry point for the feature (public API)
  │── /hooks          # Reusable global custom hooks
  │── /layouts        # Shared layouts for different page types
  │── /lib            # Configurations for external libraries (Axios, Firebase)
  │── /pages          # Entry points for routes (e.g., HomePage, LoginPage)
  │── /routes         # Application routing definitions
  │── /services       # Global API/service logic
  │── /stores         # Global state management (Redux, Zustand, Pinia)
  │── /types          # Global TypeScript interfaces and types
  └── /utils          # Global utility/helper functions`,

      admin: `## Admin Panel Structure
  
  /src
  │── /assets         # Icons, global styles, images
  │── /components     # Shared UI components (Tables, Charts, Forms)
  │── /config         # API configurations, constants
  │── /features       # Admin modules
  │   ├── /dashboard  # Statistics and overview
  │   ├── /users      # User management CRUD
  │   └── /settings   # System settings
  │── /hooks          # Custom hooks
  │── /layouts        # Dashboard layouts (Sidebar, Navbar)
  │── /pages          # Route components
  │── /services       # API integration layer
  │── /stores         # Global state (Admin info, settings)
  └── /utils          # Helpers`,

      backend: `## Backend Structure
  
  /project-root
  │── /src
  │   │── /config         # Database & environment configurations
  │   │── /controllers    # Request-response logic
  │   │── /models         # Data schemas (Mongoose, SQLAlchemy, etc.)
  │   │── /routes         # API endpoint definitions
  │   │── /services       # Core business logic
  │   │── /middlewares    # Auth, logging, and error handling
  │   │── /utils          # Helper functions & constants
  │   └── app.js          # Main application entry point
  │── /tests              # Unit and integration tests
  │── /docs               # API documentation (Swagger/OpenAPI)
  │── .env.example        # Template for environment variables
  │── .gitignore          # Files to exclude from Git
  └── README.md           # Project setup & usage instructions`,

      bot: `## Telegram Bot Structure
  
  ├── .github/          # GitHub actions, workflows, and issue templates
  ├── cmd/              # Main entry point (binaries/executables)
  ├── configs/          # Configuration files (YAML, JSON, .env templates)
  ├── handlers/         # Message/command logic (defines what happens when a user types)
  ├── keyboards/        # UI components like buttons or menus (specific to chat bots)
  ├── locales/          # Translation files for multilingual support
  ├── middlewares/      # Pre/post-processing (logging, user authentication)
  ├── models/           # Database schemas and data objects
  ├── pkg/              # Public library code usable by other projects
  ├── services/         # Core business logic or API integrations
  ├── utils/            # Helper functions (date formatting, scrapers)
  ├── .gitignore        # Files to ignore (node_modules, .env, secrets)
  ├── Dockerfile        # Containerization instructions
  └── bot.js            # Entry script`,

      fullstack: `## Fullstack Structure
  
  my-fullstack-app/
  ├── client/ (or frontend/)     # React, Vue, Next.js, etc.
  │   ├── src/
  │   ├── public/
  │   └── package.json
  ├── server/ (or backend/)     # Node.js, Express, Go, etc.
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   └── package.json
  ├── shared/ (optional)        # Shared TypeScript types or utilities
  ├── .github/                  # GitHub Actions workflows and templates
  ├── docker-compose.yml        # Orchestration for local development
  ├── .gitignore                # Global ignore file
  └── README.md                 # Project documentation`
    };

    content = structures[type] || "";

    if (content) {
      const fileName = type === "bot" ? "telegram-bot.md" : `${type}.md`;
      await fs.writeFile(path.join(projectPath, fileName), content);
      console.log(chalk.cyan(`\n📝 Created ${fileName} with ${type.toUpperCase()} architecture.`));
    }
  }

  async initFullstack() {
    const { projectName } = this.options;
    const projectPath = this.options.installPath || path.join(process.cwd(), projectName);

    console.log(chalk.blue(`\nInitializing Fullstack project: ${projectName}`));

    // Create root directory and common folders
    await fs.ensureDir(projectPath);
    await fs.ensureDir(path.join(projectPath, "shared"));
    await fs.ensureDir(path.join(projectPath, ".github/workflows"));

    // Create root files
    await fs.writeFile(
      path.join(projectPath, "docker-compose.yml"),
      `version: '3.8'\n\nservices:\n  frontend:\n    build: ./frontend\n    ports:\n      - "5173:5173"\n  backend:\n    build: ./backend\n    ports:\n      - "3000:3000"\n`,
    );

    await fs.writeFile(
      path.join(projectPath, ".gitignore"),
      `node_modules\n.env\ndist\nbuild\n.DS_Store\n`,
    );

    await fs.writeFile(
      path.join(projectPath, "README.md"),
      `# ${projectName}\n\nFullstack application with Frontend and Backend.\n\n## Structure\n\n- \`frontend/\`: React application\n- \`backend/\`: Node.js API\n- \`shared/\`: Shared types and utilities\n`,
    );

    // Create sub-projects
    const frontendOptions = {
      ...this.options,
      projectName: `${projectName}/frontend`,
      installPath: path.join(projectPath, "frontend"),
      category: "frontend",
    };
    const backendOptions = {
      ...this.options,
      projectName: `${projectName}/backend`,
      installPath: path.join(projectPath, "backend"),
      category: "backend",
    };

    console.log(chalk.gray(`\nStep 1: Frontend setup...`));
    const frontendGen = new FrontendGenerator(frontendOptions);
    await frontendGen.init();

    console.log(chalk.gray(`\nStep 2: Backend setup...`));
    const backendGen = new BackendGenerator(backendOptions);
    await backendGen.init();

    console.log(
      chalk.green.bold(`\n✔ Fullstack project '${projectName}' ready.`),
    );
  }
}
