/*
 * @Date: 2024-12-23 15:43:11
 * @Description: description
 */
const fs = require('fs');
const path = require('path');

function copyDir (srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.resolve(srcDir, file);
        const destFile = path.resolve(destDir, file);
        copy(srcFile, destFile);
    }
}

function copy(src, dest) {
    const stat = fs.statSync(src) // 获取文件状态
    if (stat.isDirectory()) {
        copyDir(src, dest);
    } else {
        fs.copyFileSync(src, dest);
    }
}

copyDir('./src', './aaa/ccc')