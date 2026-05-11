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

  // ─── Package Manager ────────────────────────────────────────────────────────

  get pm() {
    return this.options.packageManager || "npm";
  }

  get devRunCmd() {
    switch (this.pm) {
      case "yarn": return "yarn dev";
      case "pnpm": return "pnpm dev";
      case "bun":  return "bun dev";
      default:     return "npm run dev";
    }
  }

  pmInstall(packages = []) {
    if (packages.length === 0) {
      switch (this.pm) {
        case "yarn": return { cmd: "yarn",  args: ["install"] };
        case "pnpm": return { cmd: "pnpm",  args: ["install"] };
        case "bun":  return { cmd: "bun",   args: ["install"] };
        default:     return { cmd: "npm",   args: ["install"] };
      }
    }
    switch (this.pm) {
      case "yarn": return { cmd: "yarn",  args: ["add", ...packages] };
      case "pnpm": return { cmd: "pnpm",  args: ["add", ...packages] };
      case "bun":  return { cmd: "bun",   args: ["add", ...packages] };
      default:     return { cmd: "npm",   args: ["install", ...packages] };
    }
  }

  pmInstallDev(packages) {
    switch (this.pm) {
      case "yarn": return { cmd: "yarn",  args: ["add", "--dev", ...packages] };
      case "pnpm": return { cmd: "pnpm",  args: ["add", "--save-dev", ...packages] };
      case "bun":  return { cmd: "bun",   args: ["add", "--dev", ...packages] };
      default:     return { cmd: "npm",   args: ["install", "--save-dev", ...packages] };
    }
  }

  // ─── Git ────────────────────────────────────────────────────────────────────

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

  // ─── Package.json ────────────────────────────────────────────────────────────

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

  async addScriptsToPackageJson(projectPath, scripts) {
    const pkgPath = path.join(projectPath, "package.json");
    if (!(await fs.pathExists(pkgPath))) return;
    const pkg = await fs.readJson(pkgPath);
    pkg.scripts = { ...pkg.scripts, ...scripts };
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  // ─── Env files ──────────────────────────────────────────────────────────────

  async createEnvFiles(projectPath, envContent) {
    await fs.writeFile(path.join(projectPath, ".env"), envContent);
    await fs.writeFile(path.join(projectPath, ".env.example"), envContent);
  }

  // ─── ESLint + Prettier ──────────────────────────────────────────────────────

  async setupLinting(projectPath, { isFrontend = false, language = "js" } = {}) {
    const devPackages = ["eslint@^8", "prettier", "eslint-config-prettier"];

    let eslintConfig = {
      env: { es2022: true },
      extends: ["eslint:recommended", "prettier"],
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      rules: { "no-unused-vars": "warn" },
    };

    if (isFrontend) {
      eslintConfig.env.browser = true;
      eslintConfig.extends.splice(1, 0, "plugin:react/recommended", "plugin:react-hooks/recommended");
      eslintConfig.settings = { react: { version: "detect" } };
      eslintConfig.rules["react/react-in-jsx-scope"] = "off";
      eslintConfig.rules["react/prop-types"] = "off";
      devPackages.push("eslint-plugin-react", "eslint-plugin-react-hooks");
    } else {
      eslintConfig.env.node = true;
    }

    if (language === "ts") {
      eslintConfig.parser = "@typescript-eslint/parser";
      eslintConfig.extends.push("plugin:@typescript-eslint/recommended");
      eslintConfig.plugins = ["@typescript-eslint"];
      eslintConfig.rules["@typescript-eslint/no-unused-vars"] = "warn";
      delete eslintConfig.rules["no-unused-vars"];
      devPackages.push("@typescript-eslint/parser", "@typescript-eslint/eslint-plugin");
    }

    const prettierConfig = {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: "es5",
      printWidth: 80,
    };

    // Install dev packages
    const { cmd, args } = this.pmInstallDev(devPackages);
    await execa(cmd, args, { cwd: projectPath, stdio: "inherit" });

    // Write config files
    await fs.writeJson(path.join(projectPath, ".eslintrc.json"), eslintConfig, { spaces: 2 });
    await fs.writeJson(path.join(projectPath, ".prettierrc"), prettierConfig, { spaces: 2 });

    // Add lint/format scripts
    const lintTarget = isFrontend ? "src" : "src";
    await this.addScriptsToPackageJson(projectPath, {
      lint: `eslint ${lintTarget}`,
      format: `prettier --write ${lintTarget}`,
    });
  }

  // ─── Success messages ────────────────────────────────────────────────────────

  displaySuccessMessage(projectName, projectType) {
    console.log(chalk.green(`\n✔ Project ${chalk.bold(projectName)} generated successfully.`));
    
    console.log(chalk.white(`\nNext steps:`));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(`  ${this.devRunCmd}`));

    console.log(chalk.gray(`\nBuilt with Zecoryx CLI`));
    console.log(chalk.gray(`Portfolio: ${AUTHOR.portfolio}\n`));
  }
}
