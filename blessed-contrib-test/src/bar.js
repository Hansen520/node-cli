/*
 * @Date: 2024-11-28 14:01:41
 * @Description: description
 */
const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen({
    fullUnicode: true
});

const bar = contrib.bar({
    label: '气温变化1',
    barWidth: 8,
    barSpacing: 20,
    maxHeight: 20
})

 screen.append(bar)

 bar.setData({
    titles: ['11.1', '11.2', '11.3', '11.4'],
    data: [6, 13, 8, 10]
})

screen.key('C-c', function() {
    screen.destroy();
});

screen.render();
