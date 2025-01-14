/*
 * @Date: 2025-01-14 17:13:59
 * @Description: description
 */
// console.log(__dirname);
// console.log(__filename);

import url from 'node:url';

console.log(import.meta.url);
console.log(import.meta.resolve('./a.js'));

console.log(import.meta.dirname);
console.log(import.meta.filename);

console.log(url.fileURLToPath(import.meta.url));
console.log(url.pathToFileURL(import.meta.filename));