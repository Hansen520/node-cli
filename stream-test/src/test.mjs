/*
 * @Date: 2024-12-20 15:05:53
 * @Description: description
 */
import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer(async (req, res) => {
    const readStream = fs.createReadStream(import.meta.dirname + '/data.txt', 'utf-8');
    readStream.pipe(res);
});

server.listen(8000);

