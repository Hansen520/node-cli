/*
 * @Date: 2024-12-02 10:44:50
 * @Description: description
 */
// const fs = require('fs/promises');

// (async function() {
//     const fileContent = await fs.readFile('./package.json', {
//         encoding: 'utf-8'
//     });

//     await fs.writeFile('./package2.json', fileContent);
// })();

const add = require('./add');

console.log(add(1, 2));
