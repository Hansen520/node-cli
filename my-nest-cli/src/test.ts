import path from 'node:path';
import { transformFile } from './transform.js';

(async function() {
    const filePath = path.join(process.cwd(), './nest-project/aaa.module.ts');
    // console.log(filePath, 6);
    const code = await transformFile(filePath);

    console.log(code)
})() 