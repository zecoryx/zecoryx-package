import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { main } from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// You can pass __dirname to modules that require paths if needed
main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});