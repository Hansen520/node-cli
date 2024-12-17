/*
 * @Date: 2024-11-28 17:17:17
 * @Description: description
 */
import si from 'systeminformation';
class DiskMonitor {
    constructor(donut) {
        this.interval = null;
        this.donut = donut;
    }
    init() {
        const updater = () => {
            si.fsSize('', (data) => {
                this.updateData(data);
            });
        };
        updater();
        this.interval = setInterval(updater, 3000);
    }
    updateData(data) {
        const disk = data[0];
        const label = formatSize(disk.used) +
            ' of ' +
            formatSize(disk.size);
        this.donut.setData([
            {
                percent: disk.use / 100,
                label: label,
                color: 'green',
            }
        ]);
        this.donut.screen.render();
    }
}
function formatSize(bytes) {
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}
export default DiskMonitor;
