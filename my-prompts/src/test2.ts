import { prompt, PromptOptions } from "./index.js";
import os from 'os';

const questions: PromptOptions[] = [
    {
        message: '你的名字?',
        type: 'text',
        name: 'name'
    },
    {
        message: '年龄?',
        type: 'text',
        name: 'age'
    },
    {
        message: '你的班级？',
        type: 'select',
        name: 'class',
        choices: [
            '一班',
            '二班',
            '三班'
        ]
    },
    {
        message: '你喜欢去的地方？',
        type: 'select',
        name: 'view',
        choices: [
            '九寨沟',
            '张家界',
            '黄山',
            '故宫'
        ]
    }
];

(async function() {
    const answers = await prompt(questions);
    console.log(answers);
    console.log(os.version());
})();
