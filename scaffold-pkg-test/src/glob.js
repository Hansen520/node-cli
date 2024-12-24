/*
 * @Date: 2024-12-23 16:12:39
 * @Description: 获取当前目录下所有文件
 */
const { glob } = require('glob');

async function main() {

    // 获取当前目录下所有文件
    const files = await glob('**', {
        cwd: process.cwd(),
        nodir: true,
        ignore: 'node_modules/**'
    })
    console.log(files);
}

main();
