/*
 * @Date: 2024-11-26 13:59:16
 * @Description: 键盘控制
 */
import readline from 'node:readline';

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.sequence === '\u0003') {
        process.exit();
    }
    console.log(str, key);
});