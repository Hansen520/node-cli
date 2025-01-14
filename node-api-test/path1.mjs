/*
 * @Date: 2025-01-14 16:54:30
 * @Description: description
 */
// const path = require('node:path');
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = fileURLToPath(import.meta.url);

// const filePath = __filename;

console.log(filePath)
console.log(path.dirname(filePath));
console.log(path.basename(filePath));
console.log(path.extname(filePath));