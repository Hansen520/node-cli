var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
 * @Date: 2024-12-17 16:25:34
 * @Description: description
 */
import { Subject } from "rxjs";
import { ScanService } from "./scan.js";
import getFolderSize from "get-folder-size";
const service = new ScanService();
const stream$ = new Subject();
console.log('开始执行了');
service.startScan(stream$, 'D:\\nodeProject');
stream$.subscribe((value) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('订阅者收到了扫描结果：', value, yield getSize(value));
}));
function getSize(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield getFolderSize(path);
        return (res.size / 1024 / 1024).toFixed(2) + 'M';
    });
}
;
