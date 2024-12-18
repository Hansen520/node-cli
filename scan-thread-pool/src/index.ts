/*
 * @Date: 2024-12-17 16:25:34
 * @Description: description
 */
import { Subject } from "rxjs";
import { ScanService } from "./scan.js";
import getFolderSize from "get-folder-size";

const service = new ScanService();

const stream$ = new Subject<string>();
console.log('开始执行了');
service.startScan(stream$, 'D:\\nodeProject');

stream$.subscribe(async (value) => {
    console.log('订阅者收到了扫描结果：', value, await getSize(value))
})

async function getSize(path: string) {
    const res = await getFolderSize(path);
    return (res.size / 1024 / 1024).toFixed(2) + 'M';
};