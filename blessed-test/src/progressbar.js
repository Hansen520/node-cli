/*
 * @Date: 2024-11-28 13:44:44
 * @Description: description
 */
const blessed = require('blessed');

const screen = blessed.screen({
    fullUnicode: true
});

const progressBar = blessed.progressbar({
    parent: screen,
    top: '50%',
    left: 0,
    height: 1,
    width: 200,
    style: {
        bg: 'gray',
        bar: {
            bg: 'red'
        }
    }
})

screen.key('C-c', function() {
    screen.destroy();
});

let total = 0;
const timer = setInterval(() => {
    if(total === 100) {
        clearInterval(timer);
    }

    progressBar.setProgress(total)
    screen.render();

    total += 2;    
}, 20);

screen.render();
