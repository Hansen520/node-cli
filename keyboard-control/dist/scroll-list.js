/*
 * @Date: 2024-11-26 14:27:17
 * @Description: description
 */
import { BaseUi } from './base-ui.js';
import chalk from 'chalk';
export class ScrollList extends BaseUi {
    constructor(list = []) {
        super();
        this.list = list;
        this.curSeletecIndex = 0;
        this.scrollTop = 0;
        this.KEYS = {
            up: () => this.cursorUp(),
            down: () => this.cursorDown()
        };
        this.render();
    }
    onKeyInput(name) {
        if (name !== 'up' && name !== 'down') {
            return;
        }
        const action = this.KEYS[name];
        action();
        this.render();
    }
    cursorUp() {
        this.moveCursor(-1);
    }
    cursorDown() {
        this.moveCursor(1);
    }
    moveCursor(index) {
        this.curSeletecIndex += index;
        if (this.curSeletecIndex < 0) {
            this.curSeletecIndex = 0;
        }
        if (this.curSeletecIndex >= this.list.length) {
            this.curSeletecIndex = this.list.length - 1;
        }
        this.fitScroll();
    }
    fitScroll() {
        const shouldScrollUp = this.curSeletecIndex < this.scrollTop;
        const shouldScrollDown = this.curSeletecIndex > this.scrollTop + this.terminalSize.rows - 2;
        if (shouldScrollUp) {
            this.scrollTop -= 1;
        }
        if (shouldScrollDown) {
            this.scrollTop += 1;
        }
        this.clear();
    }
    clear() {
        for (let row = 0; row < this.terminalSize.rows; row++) {
            this.clearLine(row);
        }
    }
    bgRow(text) {
        return chalk.bgBlue(text + ' '.repeat(this.terminalSize.columns - text.length));
    }
    render() {
        /* 画出可视区的范围 */
        const visibleList = this.list.slice(this.scrollTop, this.scrollTop + this.terminalSize.rows);
        visibleList.forEach((item, index) => {
            const row = index;
            this.clearLine(row);
            let content = item;
            if (this.curSeletecIndex === this.scrollTop + index) {
                content = this.bgRow(content);
            }
            this.printAt(content, {
                x: 0,
                y: row,
            });
        });
    }
}
