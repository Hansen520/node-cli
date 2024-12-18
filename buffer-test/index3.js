/*
 * @Date: 2024-12-18 10:12:10
 * @Description: description
 */
const fs = require('node:fs/promises');

(async function(){
    const res = await fs.readFile('./package.json', { encoding: 'utf-8' });
    console.log(res);
})();
