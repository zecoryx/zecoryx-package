import inquirer from "inquirer";
import chalk from "chalk";

export const getPrompts = async () => {
  return await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "project",
      validate: (input) => !!input.trim() || "Name cannot be empty",
    },
    // Package Manager
    {
      type: "list",
      name: "packageManager",
      message: "Choose package manager:",
      choices: [
        { name: "npm", value: "npm" },
        {
          name: chalk.cyan("pnpm") + "  (faster, disk efficient)",
          value: "pnpm",
        },
        { name: chalk.yellow("yarn"), value: "yarn" },
        { name: chalk.green("bun") + "  (fastest)", value: "bun" },
      ],
      default: "npm",
    },
    {
      type: "list",
      name: "category",
      message: "Choose project category:",
      choices: [
        { name: chalk.cyan("Frontend (React/Next.js)"), value: "frontend" },
        { name: chalk.green("Backend (Node.js API)"), value: "backend" },
        { name: chalk.magenta("Telegram Bot"), value: "telegram-bot" },
        { name: chalk.red("Admin Panel (Dashboard)"), value: "admin" },
        {
          name: chalk.yellow("Fullstack (Frontend + Backend)"),
          value: "fullstack"
        },
      ],
    },
    // Frontend & Admin Specific
    {
      type: "list",
      name: "projectType",
      message: "Choose framework:",
      choices: [
        { name: chalk.cyan("React (Vite)"), value: "vite" },
        { name: chalk.magenta("Next.js (App Router)"), value: "next" },
      ],
      when: (answers) => ["frontend", "admin", "fullstack"].includes(answers.category),
    },
    // Backend Specific
    {
      type: "list",
      name: "backendFramework",
      message: "Choose backend framework:",
      choices: [
        { name: chalk.green("Express.js (Classic)"), value: "express" },
        { name: chalk.blue("Fastify (Performance)"), value: "fastify" },
        { name: chalk.red("NestJS (Enterprise)"), value: "nestjs" },
      ],
      when: (answers) => ["backend", "fullstack"].includes(answers.category),
    },
    // Backend Language
    {
      type: "list",
      name: "backendLanguage",
      message: "Choose backend language:",
      choices: [
        { name: "JavaScript", value: "js" },
        { name: chalk.blue("TypeScript"), value: "ts" },
      ],
      when: (answers) =>
        ["backend", "fullstack"].includes(answers.category) &&
        answers.backendFramework !== "nestjs",
    },
    // Telegram Bot Specific
    {
      type: "list",
      name: "botFramework",
      message: "Choose Telegram Bot framework:",
      choices: [
        { name: chalk.blue("grammY (Modern)"), value: "grammy" },
        { name: chalk.yellow("Telegraf (Popular)"), value: "telegraf" },
        { name: chalk.red("NTBA (Simple)"), value: "ntba" },
      ],
      when: (answers) => answers.category === "telegram-bot",
    },
    // DB & Shared
    {
      type: "list",
      name: "database",
      message: "Choose Database:",
      choices: ["None", "PostgreSQL", "MongoDB", "Supabase"],
      when: (answers) =>
        ["backend", "telegram-bot", "fullstack"].includes(answers.category),
    },
    // Original Frontend & Admin Options
    {
      type: "list",
      name: "language",
      message: "Choose language:",
      choices: ["JavaScript", "TypeScript"],
      filter: (val) => (val.toLowerCase() === "typescript" ? "ts" : "js"),
      when: (answers) => ["frontend", "admin", "fullstack"].includes(answers.category),
    },
    {
      type: "list",
      name: "uiLibrary",
      message: "UI Library:",
      choices: ["Tailwind CSS", "Chakra UI", "None"],
      when: (answers) =>
        (answers.projectType === "vite" || answers.projectType === "next") &&
        ["frontend", "admin", "fullstack"].includes(answers.category),
    },
    {
      type: "list",
      name: "auth",
      message: "Choose Authentication provider:",
      choices: ["None", "Clerk", "Supabase", "Firebase"],
      when: (answers) => ["frontend", "admin", "fullstack"].includes(answers.category),
    },
    {
      type: "confirm",
      name: "router",
      message: "Add React Router?",
      default: true,
      when: (answers) => answers.projectType === "vite" && ["frontend", "admin", "fullstack"].includes(answers.category),
    },
    {
      type: "list",
      name: "icons",
      message: "Choose Icon library:",
      choices: ["React Icons", "Lucide React", "None"],
      default: "React Icons",
      when: (answers) => ["frontend", "admin", "fullstack"].includes(answers.category),
    },
    {
      type: "list",
      name: "notification",
      message: "Notification library:",
      choices: ["react-toastify", "sonner", "None"],
      when: (answers) =>
        answers.projectType === "vite" && answers.uiLibrary !== "Chakra UI" && ["frontend", "admin", "fullstack"].includes(answers.category),
    },
    {
      type: "confirm",
      name: "stateManagement",
      message: "Add Zustand for state management?",
      default: false,
      when: (answers) => answers.projectType === "vite" && ["frontend", "admin", "fullstack"].includes(answers.category),
    },
    {
      type: "confirm",
      name: "axios",
      message: "Add Axios for API requests?",
      default: true,
      when: (answers) => ["frontend", "admin", "fullstack"].includes(answers.category),
    },
    // Linting & Formatting
    {
      type: "confirm",
      name: "linting",
      message: "Add ESLint + Prettier?",
      default: true,
    },
    {
      type: "confirm",
      name: "addSkills",
      message: "Add team skills & guidelines (code-review, git-workflow, etc.)?",
      default: true,
    },
    {
      type: "list",
      name: "structureDoc",
      message: "Add project architecture documentation (structure.md)?",
      choices: [
        { name: "None", value: "none" },
        { name: chalk.yellow("Fullstack"), value: "fullstack" },
        { name: chalk.cyan("Frontend"), value: "frontend" },
        { name: chalk.red("Admin Panel"), value: "admin" },
        { name: chalk.green("Backend"), value: "backend" },
        { name: chalk.magenta("Telegram Bot"), value: "bot" },
      ],
      default: (answers) => {
        if (answers.category === "telegram-bot") return "bot";
        return answers.category;
      },
    },
  ]);
};
