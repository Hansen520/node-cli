/*
 * @Date: 2025-01-16 13:54:29
 * @Description: description
 */
import cp from 'node:child_process';

const child = cp.execFile('/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome', ['--user-data-dir=./aaa']);
