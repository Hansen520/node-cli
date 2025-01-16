/*
 * @Date: 2025-01-15 14:45:42
 * @Description: description
 */
import crypto from 'node:crypto';

export function md5(str) {
    const hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}

console.log(md5('123456'));
