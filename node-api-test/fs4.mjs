/*
 * @Date: 2025-01-15 13:51:52
 * @Description: description
 */
import fs from 'node:fs';
import path from 'node:path';

function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true }); // 递归创建目录
    console.log(fs.readdirSync(srcDir), 10);
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file)
      const destFile = path.resolve(destDir, file)
      copy(srcFile, destFile)
    }
}

function copy(src, dest) {
    const stat = fs.statSync(src)
    console.log(fs.statSync(src), 20);
    if (stat.isDirectory()) {
        copyDir(src, dest)
    } else {
        fs.copyFileSync(src, dest)
    }
}

copy('aaa', 'aaa3');