/*
 * @Date: 2025-01-15 11:26:41
 * @Description: description
 */
import fs from 'node:fs';

fs.mkdirSync('aaa');

setTimeout(() => {
    fs.renameSync('aaa', 'bbb');
}, 1000);

setTimeout(() => {
    fs.rmSync('bbb', { recursive: true });
}, 3000);
