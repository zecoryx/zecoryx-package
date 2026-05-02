import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";
import chalk from "chalk";
import ora from "ora";
import { BaseGenerator } from "./base.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class BackendGenerator extends BaseGenerator {
  async init() {
    const spinner = ora("Creating backend project foundation...").start();

    try {
      const projectPath = path.join(process.cwd(), this.options.projectName);
      const framework = this.options.backendFramework || "express";
      const language = this.options.backendLanguage || "js";

      spinner.stop();
      const langLabel = language === "ts" ? chalk.blue("TypeScript") : "JavaScript";
      console.log(
        `\n🚀 Initialising ${chalk.yellow(framework.toUpperCase())} ${langLabel} Backend: ${chalk.cyan(this.options.projectName)}`,
      );

      if (framework === "nestjs") {
        const pmFlag = this.pm === "yarn" ? "yarn"
          : this.pm === "pnpm" ? "pnpm"
          : this.pm === "bun"  ? "bun"
          : "npm";

        await execa(
          "npx",
          ["@nestjs/cli", "new", this.options.projectName, "--package-manager", pmFlag, "--skip-git"],
          { stdio: "inherit", env: { ...process.env, NPM_CONFIG_YES: "true" } },
        );
      } else {
        const templateName = language === "ts" ? `${framework}-ts` : framework;
        const templatePath = path.join(__dirname, "..", "templates", "backend", templateName);

        if (await fs.pathExists(templatePath)) {
          await fs.copy(templatePath, projectPath);

          const pkgTemplatePath = path.join(projectPath, "package.json.template");
          if (await fs.pathExists(pkgTemplatePath)) {
            let pkgContent = await fs.readFile(pkgTemplatePath, "utf8");
            pkgContent = pkgContent.replace("{{projectName}}", this.options.projectName);
            await fs.writeFile(path.join(projectPath, "package.json"), pkgContent);
            await fs.remove(pkgTemplatePath);
          }
        }
      }

      spinner.start("Installing dependencies...");
      if (framework !== "nestjs") {
        await this.installDependencies(projectPath);
      }

      if (this.options.linting && framework !== "nestjs") {
        spinner.text = "Setting up ESLint + Prettier...";
        await this.setupLinting(projectPath, { isFrontend: false, language });
      }

      spinner.text = "Creating environment files...";
      if (framework !== "nestjs") {
        await this.createBackendEnvFiles(projectPath);
      }

      spinner.text = "Updating metadata...";
      await this.updatePackageJson(projectPath, {
        projectType: "backend",
        framework,
        language,
        db: this.options.database || "none",
        architecture: "Clean Architecture (Layered)",
      });

      spinner.text = "Initialising Git...";
      await this.initializeGit(projectPath);

      spinner.succeed(
        chalk.green(`Backend project '${this.options.projectName}' created successfully!`),
      );
      this.displaySuccessMessage(this.options.projectName, "backend");
    } catch (error) {
      spinner.fail(chalk.red("Backend project creation failed"));
      throw error;
    }
  }

  async installDependencies(projectPath) {
    try {
      const { cmd, args } = this.pmInstall();
      await execa(cmd, args, { cwd: projectPath, stdio: "inherit" });
    } catch (error) {
      console.error(chalk.red("\n✗ Failed to install dependencies"));
      throw error;
    }
  }

  async createBackendEnvFiles(projectPath) {
    const db = this.options.database;
    let envContent = `PORT=3000\nNODE_ENV=development\n`;
    if (db === "PostgreSQL") {
      envContent += `DATABASE_URL=postgresql://user:password@localhost:5432/mydb\n`;
    } else if (db === "MongoDB") {
      envContent += `MONGODB_URI=mongodb://localhost:27017/mydb\n`;
    } else if (db === "Supabase") {
      envContent += `SUPABASE_URL=your_supabase_url\nSUPABASE_ANON_KEY=your_anon_key\n`;
    }
    await this.createEnvFiles(projectPath, envContent);
  }
}
