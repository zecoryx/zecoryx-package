import updateNotifier from "update-notifier";
import { config } from "./config/index.js";
import { FsRepository } from "./repositories/fs.repository.js";
import { GeneratorService } from "./services/generator.service.js";
import { CliController } from "./controllers/cli.controller.js";

/**
 * Main application entry point
 */
export async function main() {
  // Update checker
  updateNotifier({ pkg: config.pkg }).notify();

  // Initialize dependencies
  const fsRepo = new FsRepository();
  const generatorService = new GeneratorService(fsRepo);
  const cliController = new CliController(generatorService);

  // Run the application
  await cliController.start();
}
