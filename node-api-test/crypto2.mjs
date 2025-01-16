/*
 * @Date: 2025-01-15 14:46:44
 * @Description: description 
 */
import { createHash } from 'node:crypto';
import { Readable } from 'node:stream';

const rs = new Readable();
rs._read = function() {
    this.push('123456');
    this.push(null);
}

const hash = createHash('md5');
rs.pipe(hash).setEncoding('hex').pipe(process.stdout);
