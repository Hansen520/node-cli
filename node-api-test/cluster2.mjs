/*
 * @Date: 2025-01-16 14:16:55
 * @Description: description
 */
import http from 'node:http';

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello uuu\n');
})

server.listen(8000);
