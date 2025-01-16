/*
 * @Date: 2025-01-16 15:20:56
 * @Description: description
 */
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const rl = createInterface({
  input: createReadStream('./repl.mjs')
});

rl.on('line', (line) => {
  console.log(`Line from file: ${line}`);
});
