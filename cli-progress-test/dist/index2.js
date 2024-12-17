/*
 * @Date: 2024-11-26 13:31:00
 * @Description: description
 */
import { clearTimeout } from 'timers';
import { ProgressBar } from './ProgressBar.js';
const bar = new ProgressBar();
bar.start(200, 0);
let value = 0;
const timer = setInterval(function () {
    value++;
    bar.update(value);
    if (value > bar.getTotalSize()) {
        clearTimeout(timer);
        bar.stop();
    }
}, 20);
