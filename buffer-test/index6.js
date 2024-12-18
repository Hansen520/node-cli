const { Blob } = require('node:buffer');

const blob = new Blob(['今天阳光高高照']); // 创建一个 Blob 对象

const { port1, port2 } = new MessageChannel(); // 创建一个 MessageChannel 对象

port1.onmessage = async ({ data }) => {
    console.log(data);
    console.log('port1 接收到数据 ===>', await data.text());
    console.log('port1 接收到数据 ===>', await data.arrayBuffer());
}

port2.postMessage(blob); // 将 Blob 对象发送到 port2