var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import minimist from 'minimist';
import chalk from 'chalk';
import prompts from 'prompts';
import path from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
const argv = minimist(process.argv.slice(2), {
    alias: { h: 'help', t: 'template' },
    string: ['_'], // 把额外参数解析为字符串
});
function formatTargetDir(targetDir) {
    // 去空格，去掉末尾的斜杠
    return targetDir === null || targetDir === void 0 ? void 0 : targetDir.trim().replace(/\/+$/g, '');
}
const defaultTargetDir = 'vite-project';
const helpMessage = `\
Usage: create-vite [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${chalk.yellow('vanilla-ts     vanilla')}
${chalk.green('vue-ts         vue')}
${chalk.cyan('react-ts       react')}
${chalk.cyan('react-swc-ts   react-swc')}
${chalk.magenta('preact-ts      preact')}
${chalk.redBright('lit-ts         lit')}
${chalk.red('svelte-ts      svelte')}
${chalk.blue('solid-ts       solid')}
${chalk.blueBright('qwik-ts        qwik')}`;
// 选择框架和模板
const FRAMEWORKS = [
    {
        name: 'vue',
        display: 'Vue',
        color: chalk.green,
        variants: [
            {
                name: 'vue-ts',
                display: 'TypeScript',
                color: chalk.blue,
            },
            {
                name: 'vue',
                display: 'JavaScript',
                color: chalk.yellow,
            }
        ],
    },
    {
        name: 'react',
        display: 'React',
        color: chalk.cyan,
        variants: [
            {
                name: 'react-ts',
                display: 'TypeScript',
                color: chalk.blue,
            },
            {
                name: 'react-swc-ts',
                display: 'TypeScript + SWC',
                color: chalk.blue,
            },
            {
                name: 'react',
                display: 'JavaScript',
                color: chalk.yellow,
            },
            {
                name: 'react-swc',
                display: 'JavaScript + SWC',
                color: chalk.yellow,
            }
        ],
    }
];
const TEMPLATES = FRAMEWORKS.map(f => {
    var _a;
    return (_a = f.variants) === null || _a === void 0 ? void 0 : _a.map(v => v.name);
}).reduce((a, b) => {
    return a.concat(b);
}, []);
// console.log(FRAMEWORKS, TEMPLATES)
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const argTargetDir = formatTargetDir(argv._[0]);
        const argTemplate = argv.template || argv.t;
        const help = argv.help;
        if (help) {
            console.log(helpMessage);
            return;
        }
        let targetDir = argTargetDir || defaultTargetDir; // 如果用户没有输入项目名，则使用默认的项目名
        let result;
        try {
            // 如果用户没有输入项目名，则提示用户输入，以输入为准
            result = yield prompts([{
                    type: argTargetDir ? null : 'text', // type 是指定类型，比如 text、select，当指定为 null 的时候就会忽略这个问题
                    name: 'projectName',
                    message: chalk.reset('Project name:'),
                    initial: defaultTargetDir,
                    onState: (state) => {
                        // console.log(state)
                        targetDir = formatTargetDir(state.value) || defaultTargetDir;
                    }
                }, {
                    type: argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select', // 如果用户输入了模板，并且模板在模板列表中，则不提示用户选择模板
                    name: 'framework',
                    message: chalk.reset('Select a framework:'),
                    initial: 0,
                    choices: FRAMEWORKS.map((framework) => {
                        const frameworkColor = framework.color;
                        // console.log(framework, frameworkColor, 61);
                        return {
                            title: frameworkColor(framework.display || framework.name),
                            value: framework,
                        };
                    }),
                },
                {
                    // 如果用户选择了框架，并且框架有多个变体，则提示用户选择变体, 依据上一个为准， framework为上一个选项的值
                    type: (framework) => framework && framework.variants ? 'select' : null,
                    name: 'variant',
                    message: chalk.reset('Select a variant:'),
                    choices: (framework) => framework.variants.map((variant) => {
                        const variantColor = variant.color;
                        return {
                            title: variantColor(variant.display || variant.name),
                            value: variant.name,
                        };
                    }),
                },
            ]);
        }
        catch (cancelled) {
            console.log(cancelled.message, 69);
            return false;
        }
        console.log(result, 73);
        const { framework, variant } = result;
        const root = path.join(process.cwd(), targetDir);
        let template = variant || argTemplate;
        console.log(`\nScaffolding project in ${root}...`);
        // fileURLToPath 将 URL 转换为文件路径，模板文件的路径
        const templateDir = path.resolve(fileURLToPath(import.meta.url), '../..', `template-${template}`);
        console.log(templateDir, 185);
        // ------------------------------------
        const renameFiles = {
            _gitignore: '.gitignore',
        };
        const write = (file, content) => {
            const targetPath = path.join(root, renameFiles[file] || file);
            if (content) {
                fs.writeFileSync(targetDir, content);
            }
            else {
                copy(path.join(templateDir, file), targetPath);
            }
        };
        function copy(src, dest) {
            const stat = fs.statSync(src);
            // 如果是目录，则递归创建目录，如果是文件，则直接复制文件
            if (stat.isDirectory()) {
                copyDir(src, dest);
            }
            else {
                // 递归终止
                fs.copyFileSync(src, dest); // 是文件就创建目录，不是就写入文件
            }
        }
        function copyDir(srcDir, destDir) {
            fs.mkdirSync(destDir, { recursive: true }); // 递归创建目录
            for (const file of fs.readdirSync(srcDir)) {
                // 返回拼接的绝对路径
                const srcFile = path.resolve(srcDir, file);
                const destFile = path.resolve(destDir, file);
                copy(srcFile, destFile);
            }
        }
        // 如果不存在目录则先创建一份
        if (!fs.existsSync(root)) {
            fs.mkdirSync(root, { recursive: true });
        }
        const files = fs.readdirSync(templateDir);
        for (const file of files) {
            write(file, '');
        }
        const cdProjectName = path.relative(process.cwd(), root);
        console.log(`\nDone. Now run:\n`);
        if (root !== process.cwd()) {
            console.log(`  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`);
        }
        console.log(`  npm install`);
        console.log(`  npm run dev`);
        console.log();
    });
}
init().catch((e) => {
    console.error(e);
});
