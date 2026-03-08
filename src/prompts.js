import inquirer from "inquirer";
import chalk from "chalk";

export const getPrompts = async () => {
  return await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-zecoryx-project",
      validate: (input) => !!input.trim() || "Name cannot be empty",
    },
    {
      type: "list",
      name: "category",
      message: "Choose project category:",
      choices: [
        { name: chalk.cyan("Frontend (React/Next.js)"), value: "frontend" },
        { name: chalk.green("Backend (Node.js API)"), value: "backend" },
        { name: chalk.magenta("Telegram Bot"), value: "telegram-bot" },
        {
          name: chalk.yellow("Fullstack (Frontend + Backend)"),
          value: "fullstack",
        },
      ],
    },
    // Frontend Specific
    {
      type: "list",
      name: "projectType",
      message: "Choose frontend framework:",
      choices: [
        { name: chalk.cyan("React (Vite)"), value: "vite" },
        { name: chalk.magenta("Next.js (App Router)"), value: "next" },
      ],
      when: (answers) => ["frontend", "fullstack"].includes(answers.category),
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
    // Original Frontend Options
    {
      type: "list",
      name: "language",
      message: "Choose language:",
      choices: ["JavaScript", "TypeScript"],
      filter: (val) => (val.toLowerCase() === "typescript" ? "ts" : "js"),
      when: (answers) => ["frontend", "fullstack"].includes(answers.category),
    },
    {
      type: "list",
      name: "uiLibrary",
      message: "UI Library:",
      choices: ["Tailwind CSS", "Chakra UI", "None"],
      when: (answers) =>
        (answers.projectType === "vite" || answers.projectType === "next") &&
        ["frontend", "fullstack"].includes(answers.category),
    },
    {
      type: "list",
      name: "auth",
      message: "Choose Authentication provider:",
      choices: ["None", "Clerk", "Supabase", "Firebase"],
      when: (answers) => ["frontend", "fullstack"].includes(answers.category),
    },
    {
      type: "confirm",
      name: "router",
      message: "Add React Router?",
      default: true,
      when: (answers) => answers.projectType === "vite",
    },
    {
      type: "list",
      name: "icons",
      message: "Choose Icon library:",
      choices: ["React Icons", "Lucide React", "None"],
      default: "React Icons",
      when: (answers) => ["frontend", "fullstack"].includes(answers.category),
    },
    {
      type: "list",
      name: "notification",
      message: "Notification library:",
      choices: ["react-toastify", "sonner", "None"],
      when: (answers) =>
        answers.projectType === "vite" && answers.uiLibrary !== "Chakra UI",
    },
    {
      type: "list",
      name: "structure",
      message: "Project structure:",
      choices: ["ZCS", "Classic"],
      when: (answers) => answers.projectType === "vite",
    },
    {
      type: "confirm",
      name: "stateManagement",
      message: "Add Zustand for state management?",
      default: false,
      when: (answers) => answers.projectType === "vite",
    },
    {
      type: "confirm",
      name: "axios",
      message: "Add Axios for API requests?",
      default: true,
      when: (answers) => ["frontend", "fullstack"].includes(answers.category),
    },
  ]);
};
