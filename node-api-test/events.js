/*
 * @Date: 2025-01-14 16:31:37
 * @Description: description
 */
const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('aaa', (data) => {
    console.log('aaa event triggered', data)
})

myEmitter.once('bbb', (data) => {
    console.log('bbb 事件触发', data);
});

myEmitter.emit('aaa', 111);
myEmitter.emit('aaa', 222);
myEmitter.emit('bbb', 333);
myEmitter.emit('bbb', 444);