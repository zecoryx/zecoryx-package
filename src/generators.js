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
};

const META_TAGS = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Professional application built by Zecoryx" />
  <meta name="author" content="Zecoryx (Lazizbek Abdullayev)">
  <meta name="keywords" content="react,nextjs,vite,zecoryx,modern web development">
  <meta property="og:title" content="Zecoryx Web App">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${AUTHOR.portfolio}">
  <meta name="twitter:creator" content="@zecoryx">
`;

export class ProjectGenerator {
  constructor(options) {
    this.options = options;
  }

  async init() {
    const spinner = ora("Creating project foundation...").start();

    try {
      // Check if project directory already exists
      const projectPath = path.join(process.cwd(), this.options.projectName);
      if (await fs.pathExists(projectPath)) {
        spinner.fail(chalk.red(`Project directory '${this.options.projectName}' already exists!`));
        console.log(chalk.yellow('\nPlease choose a different project name or remove the existing directory.'));
        process.exit(1);
      }

      if (this.options.projectType === 'next') {
        spinner.stop();
        console.log(`\n🚀 Initialising Next.js project: ${chalk.cyan(this.options.projectName)}`);
        await this.createNextProject();
      } else {
        spinner.stop();
        console.log(`\n🚀 Initialising Vite project: ${chalk.cyan(this.options.projectName)}`);
        await this.createViteProject();
      }

      spinner.start("Installing additional dependencies...");
      await this.installDependencies();

      spinner.text = "Configuring project files...";
      await this.configureProject();

      spinner.text = "Updating metadata...";
      await this.updatePackageJson();

      spinner.text = "Creating environment variables...";
      await this.createEnvFiles();

      spinner.text = "Initialising Git...";
      await this.initializeGit();

      spinner.succeed(chalk.green(`Project '${this.options.projectName}' created successfully!`));
      this.displaySuccessMessage();
    } catch (error) {
      spinner.fail(chalk.red("Project creation failed"));
      console.error(chalk.red("\nError details:"), error);
      process.exit(1);
    }
  }

  async createViteProject() {
    const { projectName, language } = this.options;
    const template = language === 'ts' ? 'react-ts' : 'react';

    // Use npx and pass --template to avoid prompts.
    // Adding --yes or similar if available, but for create-vite,
    // usually passing all arguments is enough unless there's an existing dir.
    await execa("npx", ["create-vite@latest", projectName, "--template", template], {
      stdio: "inherit",
      env: { ...process.env, NPM_CONFIG_YES: "true" } // Try to bypass some prompts
    });

    if (this.options.structure) {
      const templatePath = path.join(__dirname, "templates", this.options.structure.toLowerCase());
      if (await fs.pathExists(templatePath)) {
        await fs.copy(templatePath, projectName, { overwrite: true });
      }
    }

    await this.updateIndexHtml();
  }

  async createNextProject() {
    const { projectName, language } = this.options;
    const args = [
      "create-next-app@latest",
      projectName,
      "--app",
      "--tailwind",
      "--eslint",
      "--src-dir",
      language === 'ts' ? "--ts" : "--js",
      "--import-alias", "@/*",
      "--no-turbopack",
      "--yes" // Very important for create-next-app
    ];

    await execa("npx", args, { stdio: "inherit" });
  }

  async updateIndexHtml() {
    const indexPath = path.join(this.options.projectName, "index.html");
    if (await fs.pathExists(indexPath)) {
      let content = await fs.readFile(indexPath, "utf8");
      content = content.replace(/<title>(.*?)<\/title>/, `<title>${this.options.projectName}</title>`);
      if (!content.includes('name="author"')) {
        content = content.replace("</head>", `${META_TAGS}\n</head>`);
      }
      await fs.writeFile(indexPath, content);
    }
  }

  async updatePackageJson() {
    const pkgPath = path.join(this.options.projectName, "package.json");
    if (!(await fs.pathExists(pkgPath))) return;

    const pkg = await fs.readJson(pkgPath);
    pkg.author = {
      name: AUTHOR.name,
      email: AUTHOR.email,
      url: AUTHOR.portfolio,
    };

    pkg.zecoryx = {
      generatedAt: new Date().toISOString(),
      projectType: this.options.projectType,
      auth: this.options.auth,
      ui: this.options.uiLibrary || 'Tailwind (Next.js default)'
    };

    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  async createEnvFiles() {
    const { projectName, auth, projectType } = this.options;
    const prefix = projectType === 'next' ? 'NEXT_PUBLIC_' : 'VITE_';

    let envContent = `${prefix}API_URL=http://localhost:3000\n${prefix}APP_NAME=${projectName}\n`;

    if (auth === 'Clerk') {
      const clerkPrefix = projectType === 'next' ? 'NEXT_PUBLIC_' : 'VITE_';
      envContent += `${clerkPrefix}CLERK_PUBLISHABLE_KEY=your_key\nCLERK_SECRET_KEY=your_secret\n`;
    } else if (auth === 'Supabase') {
      envContent += `${prefix}SUPABASE_URL=your_url\n${prefix}SUPABASE_ANON_KEY=your_key\n`;
    } else if (auth === 'Firebase') {
      envContent += `${prefix}FIREBASE_API_KEY=your_key\n${prefix}FIREBASE_AUTH_DOMAIN=your_domain\n`;
    }

    await fs.writeFile(path.join(projectName, ".env"), envContent);
    await fs.writeFile(path.join(projectName, ".env.example"), envContent);
  }

  async initializeGit() {
    const { projectName } = this.options;
    try {
      await execa("git", ["init"], { cwd: projectName });
      await execa("git", ["add", "."], { cwd: projectName });
      await execa("git", ["commit", "-m", "Initial commit from Zecoryx Generator"], { cwd: projectName });
    } catch (e) { }
  }

  async installDependencies() {
    const { projectName, uiLibrary, router, icons, notification, stateManagement, axios, auth, projectType } = this.options;
    const dependencies = [];

    if (projectType === 'vite') {
      if (uiLibrary === "Tailwind CSS") dependencies.push("tailwindcss", "@tailwindcss/vite");
      else if (uiLibrary === "Chakra UI") dependencies.push("@chakra-ui/react", "@emotion/react");
      if (router) dependencies.push("react-router-dom");
      if (notification === "react-toastify") dependencies.push("react-toastify");
      else if (notification === "sonner") dependencies.push("sonner");
    }

    if (icons === 'React Icons') dependencies.push("react-icons");
    else if (icons === 'Lucide React') dependencies.push("lucide-react");
    if (stateManagement) dependencies.push("zustand");
    if (axios) dependencies.push("axios");

    // Auth dependencies
    if (auth === 'Clerk') {
      dependencies.push(projectType === 'next' ? "@clerk/nextjs" : "@clerk/clerk-react");
    } else if (auth === 'Supabase') {
      dependencies.push("@supabase/supabase-js");
    } else if (auth === 'Firebase') {
      dependencies.push("firebase");
    }

    if (dependencies.length > 0) {
      console.log(chalk.blue(`\n📦 Installing dependencies: ${chalk.cyan(dependencies.length)} packages`));
      console.log(chalk.gray(`   ${dependencies.join(", ")}`));
      try {
        await execa("npm", ["install", ...dependencies], { cwd: projectName, stdio: "inherit" });
        console.log(chalk.green('✓ Dependencies installed successfully'));
      } catch (error) {
        console.error(chalk.red('\n✗ Failed to install dependencies'));
        console.error(chalk.yellow('You can install them manually by running:'));
        console.error(chalk.cyan(`  cd ${projectName} && npm install ${dependencies.join(' ')}`));
        throw error;
      }
    }

    if (uiLibrary === "Chakra UI") {
      await execa("npx", ["@chakra-ui/cli", "snippet", "add"], { cwd: projectName, stdio: "inherit" });
    }
  }

  async configureProject() {
    if (this.options.projectType === 'vite') {
      await this.configureViteMain();
      await this.configureViteConfig();
      if (this.options.uiLibrary === "Tailwind CSS") await this.configureViteTailwind();
      else if (this.options.uiLibrary === "Chakra UI") await this.configureViteChakra();
    }
  }

  async configureViteMain() {
    const { projectName, router, language, uiLibrary } = this.options;
    const ext = language === "ts" ? "tsx" : "jsx";
    const mainPath = path.join(projectName, "src", `main.${ext}`);
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
      wrappers.forEach(wrapper => { wrappedApp = `<${wrapper}>\n      ${wrappedApp}\n    </${wrapper}>`; });
      content = content.replace("<App />", wrappedApp);
    }
    await fs.writeFile(mainPath, content);
  }

  async configureViteConfig() {
    const { projectName, uiLibrary, language } = this.options;
    const ext = language === 'ts' ? 'ts' : 'js';
    const vitePath = path.join(projectName, `vite.config.${ext}`);
    const content = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
${uiLibrary === "Tailwind CSS" ? "import tailwindcss from '@tailwindcss/vite';\n" : ""}
export default defineConfig({
  plugins: [react(), ${uiLibrary === "Tailwind CSS" ? "tailwindcss()," : ""}],
  server: { host: true, port: 5173, open: true }
});`;
    await fs.writeFile(vitePath, content);
    const oldExt = ext === 'ts' ? 'js' : 'ts';
    const oldPath = path.join(projectName, `vite.config.${oldExt}`);
    if (await fs.pathExists(oldPath)) await fs.remove(oldPath);
  }

  async configureViteTailwind() {
    const { projectName } = this.options;
    
    // Create PostCSS config for Tailwind v4
    const postcssPath = path.join(projectName, "postcss.config.js");
    const postcssContent = `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
`;
    await fs.writeFile(postcssPath, postcssContent);
    
    // Update CSS file with Tailwind v4 import
    const cssPath = path.join(projectName, "src", "index.css");
    const cssContent = `@import "tailwindcss";

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}
`;
    await fs.writeFile(cssPath, cssContent);
  }

  async configureViteChakra() {
    const { projectName, language } = this.options;
    const ext = language === 'ts' ? 'tsx' : 'jsx';
    const providerPath = path.join(projectName, "src", "components", "ui", "provider." + ext);
    if (await fs.pathExists(providerPath)) {
      let content = await fs.readFile(providerPath, "utf8");
      if (content.includes("export function Provider") && content.includes("<Provider>")) {
        content = content.replace("<Provider>", "<ChakraProvider>").replace("</Provider>", "</ChakraProvider>");
        if (!content.includes("ChakraProvider")) content = "import { ChakraProvider, defaultSystem } from '@chakra-ui/react';\n\n" + content;
        await fs.writeFile(providerPath, content);
      }
    }
  }

  displaySuccessMessage() {
    const { projectName, projectType } = this.options;
    console.log(chalk.green.bold("\n✔ Project setup completed by Zecoryx!"));
    console.log(chalk.cyan("\nTo get started:"));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(projectType === 'next' ? "  npm run dev" : "  npm run dev\n"));
    console.log(chalk.yellow(`\nPortfolio: ${AUTHOR.portfolio}`));
    console.log(chalk.yellow(`Telegram: ${AUTHOR.telegram}`));
  }
}