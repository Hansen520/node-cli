/*
 * @Date: 2024-12-03 16:05:36
 * @Description: description
 */
// console.log(process.argv.slice(2));

const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

console.log(argv);
