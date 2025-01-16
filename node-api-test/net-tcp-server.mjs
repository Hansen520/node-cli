/*
 * @Date: 2025-01-16 14:22:54
 * @Description: description
 */
import net from 'node:net';

const server = net.createServer((clientSocket) => {
    console.log('新的客户端 socket 连接');

    clientSocket.on('data', (data) => {
        console.log('收到客户端数据:', data.toString());

        clientSocket.write('发送给客户端的数据');
    });

    clientSocket.on('end', () => {
        console.log('客户端 socket 断开连接');
    })
});

server.listen(6666, 'localhost', () => {
    const address = server.address();

    console.log('被监听的地址为：%j', address);
})