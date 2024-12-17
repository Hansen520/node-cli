/*
 * @Date: 2024-12-02 15:04:07
 * @Description: description
 */
const cp = require('child_process');

cp.spawnSync('node', ['./index.js'], {
    stdio: 'inherit',
});