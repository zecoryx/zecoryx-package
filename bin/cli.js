#!/usr/bin/env node
import { main } from '../src/main.js';

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});