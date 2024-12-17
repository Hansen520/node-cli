/*
 * @Date: 2024-12-17 10:45:17
 * @Description: description
 */
const { channel } = require('node:diagnostics_channel');
const os = require('node:os');

const { Worker, MessageChannel } = require('node:worker_threads');

const poolSize = os.cpus().length;

const workers = [];
const tunnels = [];

for (let i = 0; i < poolSize; i++) {
  const { port1, port2 } = new MessageChannel();

  const worker = new Worker('./pool-worker.js');
  worker.postMessage({
    type: 'startup',
    id: i,
    channel: port2
  }, [port2]);

  tunnels.push(port1);// 传入通道
  workers.push(worker);// 传入工作线程
}
// 读取通道的值
for (let i = 0; i < tunnels.length; i ++) {
    console.log(tunnels.length);
    // 监听通道消息，哪个消息有返回就用哪一个通道
    tunnels[i].on('message', (msg) => {
        console.log(`线程 ${msg.id} 计算出了结果 ${msg.res}`);
    });
}

let curIndex = 0;

function addJob(num) {
    const tunnel = tunnels[curIndex];

    tunnel.postMessage({
        value: num
    });

    curIndex = curIndex >= workers.length - 1 ? 0 : curIndex + 1;
}

for (let i = 0; i < 100; i++) {
    addJob(Math.floor(Math.random() * 1000 * 10));
}