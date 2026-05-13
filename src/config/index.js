import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Application Configuration
 */
class Config {
  constructor() {
    this.pkg = this._loadPackageJson();
    this.paths = {
      root: path.join(__dirname, "../../../"),
      src: path.join(__dirname, "../../"),
      templates: path.join(__dirname, "../../templates"),
    };
  }

  _loadPackageJson() {
    try {
      const pkgPath = path.join(__dirname, "../../../package.json");
      return fs.readJsonSync(pkgPath);
    } catch (error) {
      return { version: "0.0.0" };
    }
  }

  get version() {
    return this.pkg.version;
  }
}

export const config = new Config();
