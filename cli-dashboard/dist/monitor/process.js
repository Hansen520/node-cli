/*
 * @Date: 2024-11-28 17:22:13
 * @Description: description
 */
import si from 'systeminformation';
const parts = {
    p: 'pid',
    c: 'cpu',
    m: 'mem',
};
class ProcessMonitor {
    constructor(table) {
        this.interval = null;
        this.pSort = parts.c;
        this.reIndex = false;
        this.reverse = false;
        this.table = table;
    }
    init() {
        const updater = () => {
            si.processes(data => {
                this.updateData(data);
            });
        };
        updater();
        this.interval = setInterval(updater, 3000);
        // 旋转倒叙
        this.table.screen.key(['m', 'c', 'p'], (ch) => {
            if (parts[ch] == this.pSort) {
                // 按照这边代码，看到只有cup才需要倒叙，其他两个不需要
                this.reverse = !this.reverse;
            }
            else {
                this.pSort = parts[ch] || this.pSort;
            }
            this.reIndex = true;
            updater();
        });
    }
    updateData(data) {
        const part = this.pSort;
        const list = data.list
            .sort(function (a, b) {
            return b[part] - a[part];
        })
            .map(p => {
            return [
                p.pid + '',
                p.command,
                ' ' + p.cpu.toFixed(1),
                p.mem.toFixed(1),
            ];
        });
        var headers = ['PID', 'Command', '%CPU', '%MEM'];
        const position = {
            pid: 0,
            cpu: 2,
            mem: 3,
        }[this.pSort];
        headers[position] += this.reverse ? '▲' : '▼';
        this.table.setData({
            headers: headers,
            // data: [['node', '2'], ['node3', '3']],
            data: this.reverse ? list.reverse() : list,
        });
        if (this.reIndex) {
            this.table.rows.select(0);
            this.reIndex = false;
        }
        this.table.screen.render();
    }
}
export default ProcessMonitor;
