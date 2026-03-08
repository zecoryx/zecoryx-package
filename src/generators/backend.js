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

      spinner.stop();
      console.log(
        `\n🚀 Initialising ${chalk.yellow(framework.toUpperCase())} Backend project: ${chalk.cyan(this.options.projectName)}`,
      );

      if (framework === "nestjs") {
        await execa(
          "npx",
          [
            "@nestjs/cli",
            "new",
            this.options.projectName,
            "--package-manager",
            "npm",
            "--skip-git",
          ],
          {
            stdio: "inherit",
            env: { ...process.env, NPM_CONFIG_YES: "true" },
          },
        );
      } else {
        const templatePath = path.join(
          __dirname,
          "..",
          "templates",
          "backend",
          framework,
        );

        if (await fs.pathExists(templatePath)) {
          await fs.copy(templatePath, projectPath);

          const pkgTemplatePath = path.join(
            projectPath,
            "package.json.template",
          );
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
      }

      spinner.start("Installing dependencies...");
      if (framework !== "nestjs") {
        await this.installDependencies(projectPath);
      }

      spinner.text = "Updating metadata...";
      await this.updatePackageJson(projectPath, {
        projectType: "backend",
        framework: framework,
        db: this.options.database || "none",
        architecture: "Clean Architecture (Layered)",
      });

      spinner.text = "Initialising Git...";
      await this.initializeGit(projectPath);

      spinner.succeed(
        chalk.green(
          `Backend project '${this.options.projectName}' created successfully!`,
        ),
      );
      this.displaySuccessMessage(this.options.projectName, "backend");
    } catch (error) {
      spinner.fail(chalk.red("Backend project creation failed"));
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
