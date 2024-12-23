/*
 * @Date: 2024-12-20 16:23:38
 * @Description: description
 */
import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer(async function (req, res) {
    const writeStream = fs.createWriteStream('aaa.txt', 'utf-8');
    req.pipe(writeStream);
    res.end('done');
});

server.listen(8000);
