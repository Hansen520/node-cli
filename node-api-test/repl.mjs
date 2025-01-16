/*
 * @Date: 2025-01-16 15:01:05
 * @Description: description
 */
import repl from 'node:repl';
import cfonts from 'cfonts';

const r = repl.start({ prompt: '> ', eval: myEval });

function myEval(cmd, context, filename, callback) {
    cfonts.say(cmd, {
        font: '3D',
        colors: ['yellow', 'cyan']
    });
    // console.log('你输入的命令:', cmd);
    callback();
}