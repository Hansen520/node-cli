import EventEmitter from "events";
import readline from 'node:readline';
let onKeypress;
export class Prompt extends EventEmitter {
    constructor() {
        super();
        this.value = '';
        readline.emitKeypressEvents(process.stdin);
        this.rl = readline.createInterface({ input: process.stdin });
        // this.rl.on('line', (line) => {
        //     console.log("您输入了："+line);
        // })
        process.stdin.setRawMode(true); //  来开启原始模式。
        onKeypress = this.onKeypress.bind(this);
        // 监听键盘输入读取事件
        process.stdin.on('keypress', onKeypress);
    }
    onKeypress(str, key) {
        if (key.sequence === '\u0003') {
            process.exit();
        }
        // 回车的时候执行
        if (key.name === 'return') {
            this.close();
            return;
        }
        // 输入内容， 抽象类
        this === null || this === void 0 ? void 0 : this.onKeyInput(str, key);
    }
    close() {
        this.emit('submit', this.value);
        process.stdout.write('\n');
        process.stdin.removeListener('keypress', this.onKeypress);
        process.stdin.setRawMode(false);
        this.rl.close();
    }
}
