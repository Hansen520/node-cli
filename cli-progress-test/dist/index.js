import { Bar } from 'cli-progress';
const bar = new Bar({
    format: '进度: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | {speed}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});
bar.start(200, 0, {
    speed: "0"
});
let value = 0;
const timer = setInterval(() => {
    value++;
    bar.update(value, {
        speed: (60 * Math.random()).toFixed(2) + "Mb/s"
    });
    if (value >= bar.getTotal()) {
        clearInterval(timer);
        bar.stop();
    }
}, 20);
