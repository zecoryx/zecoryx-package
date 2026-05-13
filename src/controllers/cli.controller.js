import chalk from "chalk";
import figlet from "figlet";
import { getPrompts } from "../prompts.js";
import { config } from "../config/index.js";

/**
 * Controller for CLI interactions
 */
export class CliController {
  constructor(generatorService) {
    this.service = generatorService;
  }

  async start() {
    try {
      this._displayHeader();
      const answers = await getPrompts();
      await this.service.initProject(answers);
      
      console.log(chalk.green.bold(`\n✔ Process completed successfully!`));
    } catch (error) {
      this._handleError(error);
    }
  }

  _displayHeader() {
    console.clear();
    console.log(
      chalk.blue(
        figlet.textSync("Zecoryx", { horizontalLayout: "full" })
      )
    );
    console.log(chalk.bold(`\n⚡ Zecoryx CLI v${config.version}`));
    console.log(chalk.gray("Professional project generator\n"));
  }

  _handleError(error) {
    console.error(chalk.red("\nFatal Error:"), error.message || error);
    process.exit(1);
  }
}
