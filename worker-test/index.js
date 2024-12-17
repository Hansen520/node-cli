/*
 * @Date: 2024-12-17 10:35:21
 * @Description: description
 */
const { Worker, MessageChannel } = require('node:worker_threads');

const { port1, port2 } = new MessageChannel();

const worker= new Worker('./node-worker.js');

// 用通道二传数据，通道一接收
worker.postMessage({
    value: 10*10000*10000, channel: port2
}, [port2]);

port1.on('message', (value) => {
    console.log('res', value);
})