import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import { AUTHOR } from "../constants.js";

/**
 * Repository for File System and Shell operations
 */
export class FsRepository {
  async exists(filePath) {
    try {
      return await fs.pathExists(filePath);
    } catch (error) {
      throw new Error(`Error checking existence of ${filePath}: ${error.message}`);
    }
  }

  async readDir(dirPath) {
    try {
      return await fs.readdir(dirPath);
    } catch (error) {
      throw new Error(`Error reading directory ${dirPath}: ${error.message}`);
    }
  }

  async ensureDir(dirPath) {
    try {
      await fs.ensureDir(dirPath);
    } catch (error) {
      throw new Error(`Error ensuring directory ${dirPath}: ${error.message}`);
    }
  }

  async writeFile(filePath, content) {
    try {
      await fs.writeFile(filePath, content);
    } catch (error) {
      throw new Error(`Error writing file ${filePath}: ${error.message}`);
    }
  }

  async copy(src, dest) {
    try {
      await fs.copy(src, dest);
    } catch (error) {
      throw new Error(`Error copying from ${src} to ${dest}: ${error.message}`);
    }
  }

  async readJson(filePath) {
    try {
      return await fs.readJson(filePath);
    } catch (error) {
      throw new Error(`Error reading JSON from ${filePath}: ${error.message}`);
    }
  }

  async writeJson(filePath, data) {
    try {
      await fs.writeJson(filePath, data, { spaces: 2 });
    } catch (error) {
      throw new Error(`Error writing JSON to ${filePath}: ${error.message}`);
    }
  }

  async exec(cmd, args, options = {}) {
    try {
      return await execa(cmd, args, options);
    } catch (error) {
      throw new Error(`Error executing ${cmd} ${args.join(" ")}: ${error.message}`);
    }
  }

  async initGit(projectPath) {
    try {
      await this.exec("git", ["init"], { cwd: projectPath });
      await this.exec("git", ["add", "."], { cwd: projectPath });
      await this.exec(
        "git",
        ["commit", "-m", "Initial commit from Zecoryx Generator"],
        { cwd: projectPath }
      );
    } catch (error) {
      // Ignore git errors if git is not installed or other issues
    }
  }

  async updatePackageJson(projectPath, metadata = {}) {
    const pkgPath = path.join(projectPath, "package.json");
    if (!(await this.exists(pkgPath))) return;

    const pkg = await this.readJson(pkgPath);
    pkg.author = {
      name: AUTHOR.name,
      email: AUTHOR.email,
      url: AUTHOR.portfolio,
    };

    pkg.zecoryx = {
      generatedAt: new Date().toISOString(),
      ...metadata,
    };

    await this.writeJson(pkgPath, pkg);
  }
}
