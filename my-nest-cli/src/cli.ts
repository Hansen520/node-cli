#!/usr/bin/env node
import { transformFile } from "./transform.js";
import { access, writeFile } from "node:fs/promises";
import path from "node:path";
import { Command } from 'commander';
import chalk from "chalk";

const program = new Command();

program
  .name('my-nest-cli')
  .description('自动添加 controller')
  .version('0.0.1');

program.command('transform')
  .description('修改 module 代码，添加 controller')
  .argument('path', '待转换的文件路径')
  .action(async (filePath: string) => {
    if(!filePath) {
        console.log(chalk.red('文件路径不能为空'))
    }

    const p = path.join(process.cwd(), filePath);

    try {
        await access(p); // 检查文件路径是否存在， 判断文件的权限

        const formattedCode = await transformFile(filePath);
        writeFile(p, formattedCode); // 在某路径写入文件内容，写入文件

        console.log(`${chalk.bgBlueBright('UPDATE')} ${filePath}`)
    } catch(e) {
        console.log(chalk.red('文件路径不存在'))
    }
  });

program.parse();

