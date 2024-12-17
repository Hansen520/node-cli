/*
 * @Date: 2024-12-17 11:26:03
 * @Description: descriptionons
 */
import { filter, map, Subject } from 'rxjs';

const stream$ = new Subject<number>();

stream$.subscribe((v) => {
    console.log(`订阅者1：${v}`);
});