#!/usr/bin/env node
import { Command } from 'commander';
import chalk from "chalk";
import { add, minus, divide, multiply, power, radical } from '@han-yarn/core';
const program = new Command();
program
    .name('num-cli')
    .description('计算数字加减')
    .version('0.0.1');
program.command('add')
    .description('加法')
    .argument('a', '第一个数字')
    .argument('b', '第二个数字')
    .action((a, b) => {
    console.log(chalk.green(add(+a, +b)));
});
program.command('minus')
    .description('减法')
    .argument('a', '第一个数字')
    .argument('b', '第二个数字')
    .action((a, b) => {
    console.log(chalk.cyan(minus(+a, +b)));
});
program.command('divide')
    .description('除法')
    .argument('a', '第一个数字')
    .argument('b', '第二个数字')
    .action((a, b) => {
    console.log(chalk.cyan(divide(+a, +b)));
});
program.command('multiply')
    .description('乘法')
    .argument('a', '第一个数字')
    .argument('b', '第二个数字')
    .action((a, b) => {
    console.log(chalk.cyan(multiply(+a, +b)));
});
program.command('power')
    .description('次幂')
    .argument('a', '第一个数字')
    .argument('b', '第二个数字')
    .action((a, b) => {
    console.log(chalk.cyan(power(+a, +b)));
});
program.command('radical')
    .description('开根')
    .argument('a', '开根的数字')
    .action((a) => {
    console.log(chalk.cyan(radical(+a)));
});
program.parse();
