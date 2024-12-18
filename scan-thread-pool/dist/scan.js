import { cpus } from 'node:os';
import { MessageChannel, Worker } from "node:worker_threads";
import { dirname, extname } from 'node:path';
export class ScanService {
    constructor() {
        this.index = 0;
        this.workers = [];
        this.tunnels = [];
    }
    startScan(stream$, path) {
        // TODO: add logic to start scan
        this.initWorkers();
        this.listenEvents(stream$);
        this.addJob({ job: 'scan', value: { path } });
    }
    listenEvents(stream$) {
        this.tunnels.forEach((tunnel) => {
            tunnel.on('message', (data) => {
                this.newWorkerMessage(data, stream$);
            });
        });
    }
    getWorkerPath() {
        const actualFilePath = import.meta.url;
        const dirPath = dirname(actualFilePath);
        const extension = extname(actualFilePath);
        const workerName = 'scan.worker'; // 工作线程文件名称
        return new URL(`${dirPath}/${workerName}${extension}`);
    }
    newWorkerMessage(message, stream$) {
        const { type, value } = message;
        if (type === 'scanResult') {
            const results = value.results;
            results.forEach((result) => {
                const { path, isTarget } = result;
                if (isTarget) {
                    stream$.next(path);
                }
                else {
                    this.addJob({
                        job: 'scan',
                        value: { path }, // 获取目标路径
                    });
                }
            });
        }
    }
    addJob(job) {
        if (job.job === 'scan') {
            const tunnel = this.tunnels[this.index];
            const message = { type: 'scan', value: job.value };
            tunnel.postMessage(message);
            this.index = this.index >= this.workers.length - 1 ? 0 : this.index + 1;
        }
    }
    initWorkers() {
        const size = this.getPoolSize();
        for (let i = 0; i < size; i++) {
            const { port1, port2 } = new MessageChannel();
            const worker = new Worker(this.getWorkerPath());
            worker.postMessage({
                type: 'startup',
                value: {
                    channel: port2,
                    id: i
                }
            }, [port2]);
            this.workers.push(worker);
            this.tunnels.push(port1);
        }
    }
    getPoolSize() {
        return cpus().length;
    }
}
