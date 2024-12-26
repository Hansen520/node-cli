/*
 * @Date: 2024-12-23 18:12:38
 * @Description: create
 */
import { select, input, confirm  } from '@inquirer/prompts';
import os from 'node:os';
import { NpmPackage } from '@hansen-cli/utils';
import path from 'node:path';
import ora from 'ora';
import fse from 'fs-extra';
import { glob } from 'glob';
import ejs from 'ejs';

async function create() {
    console.log('create 命令执行中...')

    const projectTemplate = await select({
        message: '请选择项目模板',
        choices: [
            {
                name: 'react 项目',
                value: '@hansen-cli/template-react'
            },
            {
                name: 'vue 项目',
                value: '@hansen-cli/template-vue'
            }
        ]
    });

    let projectName = '';

    while (!projectName) {
        projectName = await input({ message: '请输入项目名' })
    }

    const pkg = new NpmPackage({
        name: projectTemplate,
        targetPath: path.join(os.homedir(), '.hansen-cli-template')
    });
    console.log(projectTemplate, projectName);

    if (!await pkg.exists()) {
        const spinner = ora('正在下载模板...').start();
        await pkg.install();
        await sleep(1000);
        spinner.stop();
    } else {
        const spinner = ora('更新模板中...').start();
        await pkg.update();
        await sleep(1000);
        spinner.stop();
    }

    await sleep(1000);

    const templatePath = path.join(pkg.npmFilePath, 'template'); // 模版包都有个 template 目录，路径要拼接一下：
    const targetPath = path.join(process.cwd(), projectName);


    // 判断下当前的目录是否为空
    if (fse.existsSync(targetPath)) {
        const empty = await confirm({ message: '当前目录不为空，是否清空目录?'});
        console.log(empty, 61)
        if (empty) {
            fse.emptyDirSync(targetPath);
        } else {
            process.exit(0);
        }
    }

    const spinner = ora('创建项目中1...').start();
    await sleep(1000);

   

    // 将模板路径复制到当前路径
    fse.copySync(templatePath, targetPath);

     // 修改package.json 中的name
     const files = await glob('**', {
        cwd: targetPath,
        nodir: true,
        ignore: 'node_modules/**'
    });

    // 现在 template 里并没有 ejs 模版的语法，我们改下 template-vue、template-react 的 package.json
    for (let i = 0; i < files.length; i++) {
        const filePath = path.join(targetPath, files[i]);
        const renderResult = await ejs.renderFile(filePath, {
            projectName, // 这里要修改模板的template的package的name
        });
        fse.writeFileSync(filePath, renderResult);
        
    }
    await sleep(1000);

    spinner.stop();

    function sleep(ms: number) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
}

create();

export default create;

