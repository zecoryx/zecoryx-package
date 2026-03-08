import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";
import chalk from "chalk";
import ora from "ora";
import { BaseGenerator } from "./base.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class TelegramBotGenerator extends BaseGenerator {
  async init() {
    const spinner = ora("Creating Telegram bot project foundation...").start();

    try {
      const projectPath = path.join(process.cwd(), this.options.projectName);
      const framework = this.options.botFramework || "grammy";

      spinner.stop();
      console.log(
        `\n🚀 Initialising ${chalk.yellow(framework.toUpperCase())} Telegram Bot project: ${chalk.cyan(this.options.projectName)}`,
      );

      const templatePath = path.join(
        __dirname,
        "..",
        "templates",
        "telegram-bot",
        framework,
      );

      if (await fs.pathExists(templatePath)) {
        await fs.copy(templatePath, projectPath);

        const pkgTemplatePath = path.join(projectPath, "package.json.template");
        if (await fs.pathExists(pkgTemplatePath)) {
          let pkgContent = await fs.readFile(pkgTemplatePath, "utf8");
          pkgContent = pkgContent.replace(
            "{{projectName}}",
            this.options.projectName,
          );
          await fs.writeFile(
            path.join(projectPath, "package.json"),
            pkgContent,
          );
          await fs.remove(pkgTemplatePath);
        }
      }

      spinner.start("Installing dependencies...");
      await this.installDependencies(projectPath);

      spinner.text = "Updating metadata...";
      await this.updatePackageJson(projectPath, {
        projectType: "telegram-bot",
        framework: framework,
        architecture: "Clean Architecture (Layered)",
      });

      spinner.text = "Initialising Git...";
      await this.initializeGit(projectPath);

      spinner.succeed(
        chalk.green(
          `Telegram Bot project '${this.options.projectName}' created successfully!`,
        ),
      );
      this.displaySuccessMessage(this.options.projectName, "telegram-bot");
    } catch (error) {
      spinner.fail(chalk.red("Telegram Bot project creation failed"));
      throw error;
    }
  }

  async installDependencies(projectPath) {
    try {
      await execa("npm", ["install"], { cwd: projectPath, stdio: "inherit" });
    } catch (error) {
      console.error(chalk.red("\n✗ Failed to install dependencies"));
      throw error;
    }
  }
}
