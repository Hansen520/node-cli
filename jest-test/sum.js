/*
 * @Date: 2025-01-17 10:32:48
 * @Description: description
 */
const fs = require('fs');
function sum(a, b) {
  return a + b;
}

function read() {
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

    if (pkg.version === '1.0.0') {
        return 111;
    } else {
        return 222;
    }
}

function some(callback) {
  callback(1);
  callback(2);
}

function minus(a, b) {
  return a - b;
}

module.exports = {
  sum,
  read,
  some,
  minus
};
