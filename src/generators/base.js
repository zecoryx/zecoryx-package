import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import chalk from "chalk";

export const AUTHOR = {
  name: "Lazizbek Abdullayev",
  nickname: "zecoryx",
  email: "lazizbekabdullayev118@gmail.com",
  portfolio: "https://zecoryx.uz",
  github: "https://github.com/zecoryx",
  telegram: "https://t.me/zecoryx",
};

export class BaseGenerator {
  constructor(options) {
    this.options = options;
  }

  async initializeGit(projectPath) {
    try {
      await execa("git", ["init"], { cwd: projectPath });
      await execa("git", ["add", "."], { cwd: projectPath });
      await execa(
        "git",
        ["commit", "-m", "Initial commit from Zecoryx Generator"],
        { cwd: projectPath },
      );
    } catch (e) {}
  }

  async updatePackageJson(projectPath, metadata = {}) {
    const pkgPath = path.join(projectPath, "package.json");
    if (!(await fs.pathExists(pkgPath))) return;

    const pkg = await fs.readJson(pkgPath);
    pkg.author = {
      name: AUTHOR.name,
      email: AUTHOR.email,
      url: AUTHOR.portfolio,
    };

    pkg.zecoryx = {
      generatedAt: new Date().toISOString(),
      ...metadata,
    };

    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  async createEnvFiles(projectPath, envContent) {
    await fs.writeFile(path.join(projectPath, ".env"), envContent);
    await fs.writeFile(path.join(projectPath, ".env.example"), envContent);
  }

  displaySuccessMessage(projectPath, projectType) {
    console.log(chalk.green.bold("\n✔ Project setup completed by Zecoryx!"));
    console.log(chalk.cyan("\nTo get started:"));
    console.log(chalk.cyan(`  cd ${projectPath}`));
    console.log(chalk.cyan("  npm run dev\n"));
    console.log(chalk.yellow(`\nPortfolio: ${AUTHOR.portfolio}`));
    console.log(chalk.yellow(`Telegram: ${AUTHOR.telegram}`));
  }
}
