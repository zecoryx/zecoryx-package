import chalk from 'chalk';
import { getPrompts } from './prompts.js';
import { ProjectGenerator } from './generators.js';

export async function main() {
  console.log(chalk.blue.bold('\n⚡ React Vite Project Generator\n'));
  
  try {
    const answers = await getPrompts();
    const generator = new ProjectGenerator(answers);
    await generator.init();
  } catch (error) {
    console.error(chalk.red('\nError:'), error);
    process.exit(1);
  }
}