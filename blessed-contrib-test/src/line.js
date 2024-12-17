/*
 * @Date: 2024-11-28 13:53:08
 * @Description: description
 */
const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen({
    fullUnicode: true
});

const lineChart = contrib.line({
    style: {
        line: "yellow",
        text: "green",
        baseline: "blue"
    },
    label: '气温变化'
})

const data = {
    x: ['11 月 28 日', '11 月 29 日', '11 月 30 日', '12 月 1 日'],
    y: [6, 13, 8, 10]
}

screen.append(lineChart)
lineChart.setData([data])

screen.key('C-c', function() {
    screen.destroy();
});

screen.render();