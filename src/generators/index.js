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
    const projectPath = path.join(process.cwd(), this.options.projectName);

    // Check if project directory already exists
    if (await fs.pathExists(projectPath)) {
      console.log(
        chalk.red(
          `\nError: Project directory '${this.options.projectName}' already exists!`,
        ),
      );
      process.exit(1);
    }

    const { category } = this.options;

    if (category === "frontend") {
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
  }

  async initFullstack() {
    const { projectName } = this.options;
    const projectPath = path.join(process.cwd(), projectName);

    console.log(chalk.blue(`\n🏗️ Creating Fullstack project: ${projectName}`));

    // Create root directory
    await fs.ensureDir(projectPath);

    // Create sub-projects
    const frontendOptions = {
      ...this.options,
      projectName: `${projectName}/frontend`,
      category: "frontend",
    };
    const backendOptions = {
      ...this.options,
      projectName: `${projectName}/backend`,
      category: "backend",
    };

    console.log(chalk.yellow(`\nStep 1: Creating Frontend...`));
    const frontendGen = new FrontendGenerator(frontendOptions);
    await frontendGen.init();

    console.log(chalk.yellow(`\nStep 2: Creating Backend...`));
    const backendGen = new BackendGenerator(backendOptions);
    await backendGen.init();

    console.log(
      chalk.green.bold(`\n✅ Fullstack project '${projectName}' is ready!`),
    );
  }
}
