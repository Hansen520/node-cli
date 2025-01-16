import { StringDecoder } from 'node:string_decoder';
import { Buffer } from 'node:buffer';

const decoder = new StringDecoder('utf8');

const buf = Buffer.from('我说要有爱', 'utf-8');
console.log(decoder.write(buf));