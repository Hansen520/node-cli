import { Buffer } from 'node:buffer';

const buffer = Buffer.alloc(10);

buffer.writeUint16LE(256, 0); // LE 是小端存储，BE是大端存储

console.log(buffer);
console.log(buffer.readUint16LE(0));
console.log(buffer.readUint8(0), buffer.readUInt8(1));
