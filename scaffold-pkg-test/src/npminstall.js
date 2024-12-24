// 我们会从 npm 仓库下载模版到本地的临时目录，这时候就可以用 npminstall 这个包来下载：
const npminstall = require('npminstall');
(async () => {
    await npminstall({
        pkgs: [
            {
                name: 'chalk',
                version: 'latest'
            }
        ],
        root: process.cwd() + '/aaa',
        registry: 'https://registry.npmmirror.com',
    })
})().catch(err => {
    console.log(err);
})
