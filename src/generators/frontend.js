import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";
import chalk from "chalk";
import ora from "ora";
import { BaseGenerator, AUTHOR } from "./base.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const META_TAGS = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A professional web application built with modern technologies for optimal performance and SEO." />
  <meta name="author" content="Lazizbek Abdullayev (Zecoryx)" />
  <meta name="keywords" content="web application, modern ui, performant web, react, nextjs">
  <meta property="og:title" content="Modern Web Application" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="Discover a seamless and high-performance web experience." />
`;

export class FrontendGenerator extends BaseGenerator {
  async init() {
    const spinner = ora("Creating frontend project foundation...").start();
    const projectPath = this.options.installPath || path.join(process.cwd(), this.options.projectName);

    try {
      if (this.options.projectType === "next") {
        spinner.stop();
        console.log(`\nInitializing Next.js project: ${chalk.cyan(this.options.projectName)}`);
        await this.createNextProject(projectPath);
      } else {
        spinner.stop();
        console.log(`\nInitializing Vite project: ${chalk.cyan(this.options.projectName)}`);
        await this.createViteProject(projectPath);
      }

      spinner.start("Installing dependencies...");
      await this.installDependencies(projectPath);

      spinner.text = "Configuring project files...";
      await this.configureProject(projectPath);

      if (this.options.linting) {
        spinner.text = "Setting up ESLint + Prettier...";
        await this.setupLinting(projectPath, {
          isFrontend: true,
          language: this.options.language || "js",
        });
      }

      spinner.text = "Updating metadata...";
      await this.updatePackageJson(projectPath, {
        projectType: this.options.projectType,
        auth: this.options.auth,
        ui: this.options.uiLibrary || "Tailwind (Next.js default)",
      });

      spinner.text = "Creating environment variables...";
      await this.createFrontendEnvFiles(projectPath);
      await this.ensureGitignoreHasEnv(projectPath);

      spinner.text = "Initialising Git...";
      await this.initializeGit(projectPath);

      spinner.succeed(
        chalk.green(`Frontend project '${this.options.projectName}' created successfully!`),
      );
      this.displaySuccessMessage(this.options.projectName, this.options.projectType);
    } catch (error) {
      spinner.fail(chalk.red("Frontend project creation failed"));
      throw error;
    }
  }

  async createViteProject(projectPath) {
    const { projectName, language } = this.options;
    const template = language === "ts" ? "react-ts" : "react";

    // If installing in current dir, create-vite needs "."
    const viteProjectName = this.options.installPath === process.cwd() ? "." : projectName;

    console.log(chalk.yellow(`\n✨ Creating Vite core...`));
    await execa(
      "npx",
      ["create-vite@latest", viteProjectName, "--template", template, "--no-interactive"],
      {
        stdio: "inherit",
        env: { ...process.env, NPM_CONFIG_YES: "true" },
      },
    );

    console.log(chalk.gray(`Applying project structural patterns...`));
    const templateFolder = this.options.category === "admin" ? "admin" : "frontend";
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      templateFolder
    );
    if (await fs.pathExists(templatePath)) {
      await fs.copy(templatePath, projectPath, { overwrite: true });
      const unusedExt = language === "ts" ? "jsx" : "tsx";
      const srcDir = path.join(projectPath, "src");
      await this.removeUnusedExtFiles(srcDir, unusedExt);
    }

    await this.updateIndexHtml(projectPath);
  }

  async removeUnusedExtFiles(dir, ext) {
    if (!(await fs.pathExists(dir))) return;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await this.removeUnusedExtFiles(fullPath, ext);
      } else if (entry.name.endsWith(`.${ext}`)) {
        await fs.remove(fullPath);
      }
    }
  }

  async createNextProject(projectPath) {
    const { projectName, language, packageManager } = this.options;
    const pmFlag = packageManager === "pnpm" ? "--use-pnpm"
      : packageManager === "yarn" ? "--use-yarn"
      : packageManager === "bun"  ? "--use-bun"
      : "--use-npm";

    // If installing in current dir, create-next-app needs "."
    const nextProjectName = this.options.installPath === process.cwd() ? "." : projectName;

    const args = [
      "create-next-app@latest",
      nextProjectName,
      "--app",
      "--tailwind",
      "--eslint",
      "--src-dir",
      language === "ts" ? "--ts" : "--js",
      "--import-alias", "@/*",
      "--no-turbopack",
      pmFlag,
      "--yes",
    ];

    await execa("npx", args, { stdio: "inherit" });
  }

  async updateIndexHtml(projectPath) {
    const indexPath = path.join(projectPath, "index.html");
    if (await fs.pathExists(indexPath)) {
      let content = await fs.readFile(indexPath, "utf8");
      
      // Ensure title is set correctly (SEO requirement)
      const formattedName = this.options.projectName
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        
      content = content.replace(
        /<title>(.*?)<\/title>/,
        `<title>${formattedName}</title>`,
      );
      
      // Inject meta tags if not already present
      if (!content.includes('name="description"')) {
        content = content.replace("</head>", `${META_TAGS}\n</head>`);
      }
      
      await fs.writeFile(indexPath, content);
    }
  }

  async ensureGitignoreHasEnv(projectPath) {
    const gitignorePath = path.join(projectPath, ".gitignore");
    if (await fs.pathExists(gitignorePath)) {
      let content = await fs.readFile(gitignorePath, "utf8");
      if (!content.includes("\n.env\n") && !content.includes("\n.env")) {
        content += "\n.env\n";
        await fs.writeFile(gitignorePath, content);
      }
    }
  }

  async createFrontendEnvFiles(projectPath) {
    const { projectName, auth, projectType } = this.options;
    const prefix = projectType === "next" ? "NEXT_PUBLIC_" : "VITE_";

    let envContent = `${prefix}API_URL=http://localhost:3000\n${prefix}APP_NAME=${projectName}\n`;

    if (auth === "Clerk") {
      if (projectType === "next") {
        envContent += `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key\nCLERK_SECRET_KEY=your_secret_key\n`;
      } else {
        envContent += `VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key\n`;
      }
    } else if (auth === "Supabase") {
      envContent += `${prefix}SUPABASE_URL=your_url\n${prefix}SUPABASE_ANON_KEY=your_key\n`;
    } else if (auth === "Firebase") {
      envContent += `${prefix}FIREBASE_API_KEY=your_key\n${prefix}FIREBASE_AUTH_DOMAIN=your_domain\n`;
    }

    await this.createEnvFiles(projectPath, envContent);
  }

  async installDependencies(projectPath) {
    const { uiLibrary, router, icons, notification, stateManagement, axios, auth, projectType } = this.options;
    const dependencies = [];

    if (projectType === "vite") {
      if (uiLibrary === "Tailwind CSS") dependencies.push("tailwindcss", "@tailwindcss/vite");
      else if (uiLibrary === "Chakra UI") dependencies.push("@chakra-ui/react", "@emotion/react");
      if (router) dependencies.push("react-router-dom");
      if (notification === "react-toastify") dependencies.push("react-toastify");
      else if (notification === "sonner") dependencies.push("sonner");
    }

    if (icons === "React Icons") dependencies.push("react-icons");
    else if (icons === "Lucide React") dependencies.push("lucide-react");
    if (stateManagement) dependencies.push("zustand");
    if (axios) dependencies.push("axios");

    if (auth === "Clerk") {
      dependencies.push(projectType === "next" ? "@clerk/nextjs" : "@clerk/clerk-react");
    } else if (auth === "Supabase") {
      dependencies.push("@supabase/supabase-js");
    } else if (auth === "Firebase") {
      dependencies.push("firebase");
    }

    try {
      const { cmd, args } = this.pmInstall(dependencies);
      if (dependencies.length > 0) {
        console.log(chalk.blue(`\n📦 Installing: ${chalk.cyan(dependencies.join(", "))}`));
      }
      await execa(cmd, args, { cwd: projectPath, stdio: "inherit" });
    } catch (error) {
      console.error(chalk.red("\n✗ Failed to install dependencies"));
      throw error;
    }

    if (uiLibrary === "Chakra UI") {
      await execa("npx", ["@chakra-ui/cli", "snippet", "add"], {
        cwd: projectPath,
        stdio: "inherit",
      });
    }
  }

  async configureProject(projectPath) {
    if (this.options.projectType === "vite") {
      await this.configureViteMain(projectPath);
      await this.configureViteConfig(projectPath);
      if (this.options.uiLibrary === "Tailwind CSS") await this.configureViteTailwind(projectPath);
      else if (this.options.uiLibrary === "Chakra UI") await this.configureViteChakra(projectPath);
    }
  }

  async configureViteMain(projectPath) {
    const { router, language, uiLibrary } = this.options;
    const ext = language === "ts" ? "tsx" : "jsx";
    const mainPath = path.join(projectPath, "src", `main.${ext}`);
    if (!(await fs.pathExists(mainPath))) return;

    let content = await fs.readFile(mainPath, "utf8");
    let imports = [];
    let wrappers = [];

    if (router) {
      imports.push("import { BrowserRouter } from 'react-router-dom';");
      wrappers.push("BrowserRouter");
    }
    if (uiLibrary === "Chakra UI") {
      imports.push("import { Provider } from './components/ui/provider';");
      wrappers.push("Provider");
    }

    if (imports.length > 0) content = imports.join("\n") + "\n" + content;
    if (wrappers.length > 0) {
      let wrappedApp = "<App />";
      wrappers.forEach((wrapper) => {
        wrappedApp = `<${wrapper}>\n      ${wrappedApp}\n    </${wrapper}>`;
      });
      content = content.replace("<App />", wrappedApp);
    }
    await fs.writeFile(mainPath, content);
  }

  async configureViteConfig(projectPath) {
    const { uiLibrary, language } = this.options;
    const ext = language === "ts" ? "ts" : "js";
    const vitePath = path.join(projectPath, `vite.config.${ext}`);
    const content = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
${uiLibrary === "Tailwind CSS" ? "import tailwindcss from '@tailwindcss/vite';\n" : ""}
export default defineConfig({
  plugins: [react(), ${uiLibrary === "Tailwind CSS" ? "tailwindcss()," : ""}],
  server: { host: true, port: 5173, open: true }
});`;
    await fs.writeFile(vitePath, content);
    const oldExt = ext === "ts" ? "js" : "ts";
    const oldPath = path.join(projectPath, `vite.config.${oldExt}`);
    if (await fs.pathExists(oldPath)) await fs.remove(oldPath);
  }

  async configureViteTailwind(projectPath) {
    const cssPath = path.join(projectPath, "src", "index.css");
    await fs.writeFile(cssPath, `@import "tailwindcss";\n\n:root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n}\n`);
  }

  async configureViteChakra(projectPath) {
    const { language } = this.options;
    const ext = language === "ts" ? "tsx" : "jsx";
    const providerPath = path.join(projectPath, "src", "components", "ui", `provider.${ext}`);
    if (await fs.pathExists(providerPath)) {
      let content = await fs.readFile(providerPath, "utf8");
      if (
        content.includes("export function Provider") &&
        content.includes("<Provider>") &&
        !content.includes("ChakraProvider")
      ) {
        content =
          "import { ChakraProvider, defaultSystem } from '@chakra-ui/react';\n\n" +
          content
            .replace("<Provider>", "<ChakraProvider value={defaultSystem}>")
            .replace("</Provider>", "</ChakraProvider>");
        await fs.writeFile(providerPath, content);
      }
    }
  }
}
