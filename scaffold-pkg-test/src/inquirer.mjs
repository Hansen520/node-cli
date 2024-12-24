import { input, select, password } from '@inquirer/prompts';

const name = await input({ message: '请输入你的名字' });

const job = await select({
    message: '选择你的职业',
    choices: [
        { name: '前端工程师', value: 'frontend', description: '写页面' },
        { name: '后端工程师', value: 'backend', description: '写接口'},
        { name: '全栈工程师', value: 'fullstack', description: '啥都写' },
        { name: '产品经理', value: 'product', description: '提需求' },
        { name: '设计师', value: 'design', description: '搞UI' },
        { name: '其他', value: 'other', description: '其他' }
    ]
});

const pass = await password({ message: '请输入你的密码' });
console.log(name, job, pass);
