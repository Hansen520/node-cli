import fs from 'node:fs';
import fse from 'fs-extra'

// node 22以上才行
// fs.cpSync('aaa', 'aaa4', {
//     recursive: true
// });



fse.copySync('aaa', 'aaa5')