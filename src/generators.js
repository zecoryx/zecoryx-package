import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";
import chalk from "chalk";
import ora from "ora";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Custom author information
const AUTHOR = {
  name: "Lazizbek Abdullayev",
  nickname: "zecoryx",
  email: "lazizbekabdullayev118@gmail.com",
  portfolio: "https://zecoryx.uz",
  github: "https://github.com/zecoryx",
  telegram: "https://t.me/zecoryx",
  kwork: "https://kwork.ru/user/zecoryx",
};

const META_TAGS = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Professional React application built with Vite by Zecoryx" />
  <meta name="author" content="Zecoryx (Lazizbek Abdullayev)">
  <meta name="keywords" content="react,vite,zecoryx,modern web development">
  <meta name="generator" content="Zecoryx React Vite Generator">
  <meta property="og:title" content="Zecoryx React Vite App">
  <meta property="og:description" content="Professional React application developed by Zecoryx">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${AUTHOR.portfolio}">
  <meta property="og:image" content="https://zecoryx.uz/og-image.jpg">
  <meta name="twitter:creator" content="@zecoryx">
`;

export class ProjectGenerator {
  constructor(options) {
    this.options = options;
  }

  async init() {
    const spinner = ora("Creating project...").start();

    try {
      await this.createProject();
      await this.installDependencies();
      await this.configureProject();
      await this.updatePackageJson();

      spinner.succeed(chalk.green("Project created successfully!"));
      this.displaySuccessMessage();
    } catch (error) {
      spinner.fail(chalk.red("Project creation failed"));
      console.error(chalk.red("\nError details:"), error);
      process.exit(1);
    }
  }

  async createProject() {
    const { projectName, language } = this.options;

    // Create Vite project
    await execa("npm", ["init", "vite@latest", projectName, "--", "--template", `react-${language}`], { stdio: "inherit" });

    // Copy template structure
    const templatePath = path.join(__dirname, "templates", this.options.structure.toLowerCase());

    if (await fs.pathExists(templatePath)) {
      await fs.copy(templatePath, projectName, { overwrite: true });
    }

    // Update index.html
    await this.updateIndexHtml();
  }

  async updateIndexHtml() {
    const indexPath = path.join(this.options.projectName, "index.html");

    if (await fs.pathExists(indexPath)) {
      let content = await fs.readFile(indexPath, "utf8");
      content = content.replace("</head>", `${META_TAGS}\n</head>`);
      await fs.writeFile(indexPath, content);
    }
  }

  async updatePackageJson() {
    const pkgPath = path.join(this.options.projectName, "package.json");
    const pkg = await fs.readJson(pkgPath);

    // Update scripts
    pkg.scripts = {
      ...pkg.scripts,
      dev: "vite --host 0.0.0.0",
      preview: "vite preview --host 0.0.0.0",
    };

    // Add author information
    pkg.author = {
      name: AUTHOR.name,
      email: AUTHOR.email,
      url: AUTHOR.portfolio,
    };

    // Add custom metadata
    pkg.metadata = {
      generatedBy: "Zecoryx React Vite Generator",
      version: "1.0.0",
      creator: AUTHOR.nickname,
      links: {
        portfolio: AUTHOR.portfolio,
        github: AUTHOR.github,
        telegram: AUTHOR.telegram,
        kwork: AUTHOR.kwork,
      },
      configuration: {
        ui: this.options.uiLibrary,
        router: this.options.router,
        icons: this.options.icons,
      },
    };

    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  async installDependencies() {
    const { projectName, uiLibrary, router, icons, notification } = this.options;
    const dependencies = [];
    const devDependencies = [];

    // UI Libraries
    if (uiLibrary === "Tailwind CSS") {
      await execa("npm", ["install", "tailwindcss", "@tailwindcss/vite"], {
        cwd: projectName,
        stdio: "inherit",
      });
    } else if (uiLibrary === "Chakra UI") {
      await execa("npm", ["install", "@chakra-ui/react", "@emotion/react"], {
        cwd: projectName,
        stdio: "inherit",
      });

      await execa("npx", ["@chakra-ui/cli", "snippet", "add"], {
        cwd: projectName,
        stdio: "inherit",
      });
    }

    // Router
    if (router) {
      dependencies.push("react-router-dom@latest");
    }

    // Icons
    if (icons) {
      dependencies.push("react-icons@latest");
    }

    // Notifications
    if (notification === "react-toastify") {
      dependencies.push("react-toastify@latest");
    } else if (notification === "sonner") {
      dependencies.push("sonner@latest");
    }

    // Install remaining dependencies
    if (dependencies.length > 0) {
      await execa("npm", ["install", ...dependencies], {
        cwd: projectName,
        stdio: "inherit",
      });
    }
  }

  async configureProject() {
    const { projectName, uiLibrary, router } = this.options;

    await this.configureMainFile();
    await this.configureVite();

    if (uiLibrary === "Tailwind CSS") {
      await this.configureTailwind();
    } else if (uiLibrary === "Chakra UI") {
      await this.configureChakraUI();
    }
  }

  async configureMainFile() {
    const { projectName, router, language, uiLibrary } = this.options;
    const ext = language === "tsx" ? "tsx" : "jsx";
    const mainPath = path.join(projectName, "src", `main.${ext}`);

    if (!(await fs.pathExists(mainPath))) {
      console.warn(chalk.yellow(`Main file not found at ${mainPath}`));
      return;
    }

    let content = await fs.readFile(mainPath, "utf8");
    let imports = [];
    let wrappers = [];

    // Add router if selected
    if (router) {
      imports.push("import { BrowserRouter } from 'react-router-dom'");
      wrappers.push("BrowserRouter");
    }

    // Add Chakra provider if selected
    if (uiLibrary === "Chakra UI") {
      imports.push("import { Provider } from './components/ui/provider'");
      wrappers.push("Provider");
    }

    // Add all imports
    if (imports.length > 0) {
      content = content.replace("import React from 'react'", `import React from 'react';\n${imports.join("\n")}`);
    }

    // Wrap the App component with all providers
    if (wrappers.length > 0) {
      const wrapperChain = wrappers.reduceRight((acc, wrapper) => {
        return `<${wrapper}>\n    ${acc}\n  </${wrapper}>`;
      }, "<App />");

      content = content.replace("<App />", wrapperChain);
    }

    await fs.writeFile(mainPath, content);
  }

  async configureVite() {
    const { projectName, uiLibrary } = this.options;
    const vitePath = path.join(projectName, "vite.config.js");

    let content = `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n`;

    if (uiLibrary === "Tailwind CSS") {
      content += `import tailwindcss from '@tailwindcss/vite';\n\n`;
    }

    content += `export default defineConfig({\n  plugins: [\n    react()`;

    if (uiLibrary === "Tailwind CSS") {
      content += `,\n    tailwindcss()`;
    }

    content += `\n  ],\n  server: {\n    host: '0.0.0.0',\n    port: 5173,\n    open: true\n  }\n});`;

    await fs.writeFile(vitePath, content);
  }

  async configureTailwind() {
    const { projectName } = this.options;
    const configPath = path.join(projectName, "tailwind.config.js");

    const content = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
})`;

    await fs.writeFile(configPath, content);

    // Update CSS file
    const cssPath = path.join(projectName, "src", "index.css");
    const cssContent = `@import "tailwindcss";`;

    await fs.writeFile(cssPath, cssContent);
  }

  async configureChakraUI() {
    const { projectName } = this.options;
    const providerPath = path.join(projectName, "src", "components", "ui", "provider.jsx");

    // Ensure provider component exists
    await fs.ensureDir(path.dirname(providerPath));

    const providerContent = `../src/components/ui/provider.jsx';

export function Provider({ children }) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}`;

    await fs.writeFile(providerPath, providerContent);
  }

  displaySuccessMessage() {
    const { projectName } = this.options;

    console.log(chalk.green.bold("\n✔ Project setup completed by Zecoryx!"));
    console.log(chalk.cyan("\nTo get started:"));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan("  npm run dev\n"));
    console.log(chalk.dim("Server will run on http://localhost:5173"));
    console.log(chalk.dim("Available on your network at 0.0.0.0"));
    console.log(chalk.yellow("\nMore from Zecoryx:"));
    console.log(chalk.yellow(`Portfolio: ${AUTHOR.portfolio}`));
    console.log(chalk.yellow(`GitHub: ${AUTHOR.github}`));
    console.log(chalk.yellow(`Telegram: ${AUTHOR.telegram}`));
  }
}