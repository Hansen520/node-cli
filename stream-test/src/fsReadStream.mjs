/*
 * @Date: 2024-12-20 16:20:37
 * @Description: description
 */
import fs from 'node:fs';

const readStream = fs.createReadStream(import.meta.dirname + '/data.txt', 'utf-8');

readStream.on('data', (data)=> {
    console.log(data.toString())
});

readStream.on('end', () => {
    console.log('done');
});
