import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import updateNotifier from 'update-notifier';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPrompts } from './prompts.js';
import { ProjectGenerator } from './generators.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = fs.readJsonSync(path.join(__dirname, '../package.json'));

export async function main() {
  // Update checker
  updateNotifier({ pkg }).notify();

  // ASCII Art Logo
  console.clear();
  console.log(
    chalk.white(
      figlet.textSync('ZECORYX', { horizontalLayout: 'full' })
    )
  );
  console.log(chalk.blue.bold('\n⚡ Professional Web Project Generator\n'));

  try {
    const answers = await getPrompts();
    const generator = new ProjectGenerator(answers);
    await generator.init();
  } catch (error) {
    console.error(chalk.red('\nError:'), error);
    process.exit(1);
  }
}