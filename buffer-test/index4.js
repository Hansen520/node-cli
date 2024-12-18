/*
 * @Date: 2024-12-18 10:14:06
 * @Description: description
 */
const { Buffer } = require('node:buffer');
// new Buffer 的方式被废弃了，创建 Buffer 一般用 Buffer.alloc 或者 Buffer.from
const buf1 = Buffer.alloc(10, 12);
const buf2 = Buffer.from('光之巨人', 'utf-8');

const buf3 = Buffer.from([1, 2, 3]);

console.log(buf1.toString('hex'));
console.log(buf2.toString('utf-8'));
console.log(buf2.toString('base64'));

console.log(buf3.toString('hex'));
console.log(new Uint8Array(buf3));