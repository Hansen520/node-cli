import ansiEscapes from 'ansi-escapes';
import { Key, Prompt } from "./Prompt.js";
import chalk from 'chalk';

export interface SelectPromptOptions  {
    type: 'select'
    name: string
    message: string
    choices: Array<string>
}

export class SelectPrompt extends Prompt {
    out = process.stdout
    index = 0 // 第几行

    constructor(private options: SelectPromptOptions) {
        super();
        this.value = options.choices[0];
    }

    // 从抽象类里面拿到的东西
    onKeyInput(str: string, key: Key) {
        if(key.name !== 'up' && key.name !== 'down') {
            return;
        }
        
        if(key.name === 'down') {
            this.index += 1;
            // 回到第一行
            if(this.index > this.options.choices.length - 1) {
                this.index = 0;
            }
        }

        if(key.name === 'up') {
            this.index -= 1;
            // 回到最后一行
            if(this.index < 0) {
                this.index = this.options.choices.length - 1
            }
        }

        this.value = this.options.choices[this.index]; // 修改值
        this.out.write(ansiEscapes.cursorTo(0)); // 移动光标
        this.render();
    }

    render() {
        this.out.write(ansiEscapes.eraseLine);

        this.out.write(ansiEscapes.cursorSavePosition);

        this.out.write(ansiEscapes.cursorTo(0));

        this.out.write([
            chalk.bold(this.options.message),
            chalk.gray('›'),
            ' ',
            chalk.blue(this.value)
        ].join(''))

        for(let i = 0; i< this.options.choices.length; i++) {
            const choice = this.options.choices[i];

            this.out.write(ansiEscapes.cursorDown(1))
            this.out.write(ansiEscapes.cursorTo(2))
            
            if(this.value === choice) {
                this.out.write(chalk.blue('❯')+ ' ' + choice )
            } else {
                this.out.write('  ' + choice )
            }
        }

        this.out.write(ansiEscapes.cursorRestorePosition);
    }
}
