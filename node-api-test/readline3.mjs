/*
 * @Date: 2025-01-16 15:23:28
 * @Description: description
 */
import readline from 'node:readline';

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);
 
process.stdin.on('keypress', (str, key) => {
 
    console.log(str, key)

    if(key.sequence === '\u0003') {
        process.exit();
    }
});
