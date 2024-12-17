import ansiEscapes from 'ansi-escapes';
import { Prompt } from "./Prompt.js";
import chalk from 'chalk';
function isNonPrintableChar(char) {
    return /^[\x00-\x1F\x7F]$/.test(char);
}
export class TextPrompt extends Prompt {
    constructor(options) {
        super();
        this.options = options;
        this.out = process.stdout;
        this.cursor = 0;
    }
    /* 每一次的键盘都做一次操作 */
    onKeyInput(str, key) {
        if (key.name === 'backspace') {
            this.cursor--;
            this.value = this.value.slice(0, this.cursor);
        }
        if (!isNonPrintableChar(str)) {
            this.value += str;
            this.cursor++;
        }
        this.render();
    }
    render() {
        this.out.write(ansiEscapes.eraseLine);
        this.out.write(ansiEscapes.cursorTo(0));
        this.out.write([
            chalk.bold(this.options.message),
            chalk.gray('›'),
            ' ',
            chalk.blue(this.value)
        ].join(''));
        this.out.write(ansiEscapes.cursorSavePosition);
        this.out.write(ansiEscapes.cursorDown(1) + ansiEscapes.cursorTo(0));
        if (this.value === '') {
            this.out.write(chalk.red('请输入' + this.options.message));
        }
        else {
            this.out.write(ansiEscapes.eraseLine);
        }
        this.out.write(ansiEscapes.cursorRestorePosition);
    }
}
