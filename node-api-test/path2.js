/*
 * @Date: 2025-01-14 16:56:52
 * @Description: description
 */
const path = require('node:path');

const filePath = path.join('../', 'node-api-test', './', 'path2.js'); // path.join 可以把多个路径连接起来，解析其中的 ../ ./，合并成一个路径。

console.log(filePath);

const filePath2 = path.resolve('../', 'node-api-test', './', 'path2.js'); // path.resolve 也是连接多个路径，但最后会返回一个绝对路径。

console.log(filePath2);

console.log(path.relative('/a/b/c', '/a/d')); // path.relative 是 a 路径到 b 路径的相对路径。

console.log(path.parse(__filename)); // path.parse 是解析路径。