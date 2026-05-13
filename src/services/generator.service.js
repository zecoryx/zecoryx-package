import path from "path";
import chalk from "chalk";
import { ACTIONS, CATEGORIES, STRUCTURES } from "../constants.js";
import { config } from "../config/index.js";

/**
 * Service for Project Generation logic
 */
export class GeneratorService {
  constructor(fsRepository) {
    this.repo = fsRepository;
  }

  async validateDirectory(projectPath, options) {
    try {
      if (options.action !== ACTIONS.NEW_PROJECT) return;
      
      const exists = await this.repo.exists(projectPath);
      if (!exists) return;

      const files = await this.repo.readDir(projectPath);
      const importantFiles = files.filter(f => !['.git', '.DS_Store', 'Thumbs.db'].includes(f));
      
      if (importantFiles.length > 0) {
        throw new Error(`Directory is not empty! Please use an empty directory.`);
      }
    } catch (error) {
      throw error;
    }
  }

  async generateSkills(projectPath, selectedSkills) {
    try {
      const skillsTemplatePath = path.join(config.paths.templates, "skills");
      const destPath = path.join(projectPath, "skills");

      if (!(await this.repo.exists(skillsTemplatePath))) return;

      await this.repo.ensureDir(destPath);
      
      const copyPromises = selectedSkills.map(async (skill) => {
        const srcFile = path.join(skillsTemplatePath, skill);
        const destFile = path.join(destPath, skill);
        if (await this.repo.exists(srcFile)) {
          await this.repo.copy(srcFile, destFile);
        }
      });

      await Promise.all(copyPromises);
      console.log(chalk.cyan(`\n📚 Added selected AI Skills to /skills directory.`));
    } catch (error) {
      console.error(chalk.red(`Error generating skills: ${error.message}`));
    }
  }

  async generateStructureMd(projectPath, type) {
    try {
      const content = STRUCTURES[type];
      if (!content) return;

      const fileName = type === "bot" ? "telegram-bot.md" : `${type}.md`;
      await this.repo.writeFile(path.join(projectPath, fileName), content);
      console.log(chalk.cyan(`\n📝 Created ${fileName} with ${type.toUpperCase()} architecture.`));
    } catch (error) {
      console.error(chalk.red(`Error generating structure.md: ${error.message}`));
    }
  }

  async initProject(options) {
    try {
      const projectPath = path.resolve(process.cwd(), options.projectName);
      await this.validateDirectory(projectPath, options);

      // Delegating to specific generation logic based on category
      // For this refactor, we are showing the pattern. 
      // In a full implementation, each category would have its own service or method.
      
      console.log(chalk.blue(`\nInitializing ${options.category} project: ${options.projectName}`));
      
      // ... rest of the logic ...
    } catch (error) {
      throw error;
    }
  }
}
