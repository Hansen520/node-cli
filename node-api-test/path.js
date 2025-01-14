const path = require('node:path');

const filePath = __filename;

console.log(filePath)
console.log(path.dirname(filePath));
console.log(path.basename(filePath));
console.log(path.extname(filePath));