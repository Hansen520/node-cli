/*
 * @Date: 2024-12-03 16:17:29
 * @Description: description
 */
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2), {
    boolean: ['x'],
    string: ['y'],
    unknown: (arg) => {
        return arg === '-u' // 只会有-u的参数
    },
    default: { y: 2333 },
    alias: {
        p: 'port',
        t: 'template'
    }
});

console.log(argv);