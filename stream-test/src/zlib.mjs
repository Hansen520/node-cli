/*
 * @Date: 2024-12-20 16:47:55
 * @Description: description
 */
import {
    createReadStream,
    createWriteStream,
} from 'node:fs';
import { createGzip } from 'node:zlib';
  
const gzip = createGzip();
const source = createReadStream(import.meta.dirname + '/data.txt');
const destination = createWriteStream('data.txt.gz');

source.pipe(gzip).pipe(destination);
