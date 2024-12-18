/*
 * @Date: 2024-12-18 10:26:05
 * @Description: description
 */
const { Buffer } = require('node:buffer');

const buffer = Buffer.alloc(10);

buffer.writeInt16LE(256, 0); // 设置空间

console.log(buffer.readUInt16LE(0));

console.log(buffer.readUint8(0), buffer.readUint8(1));