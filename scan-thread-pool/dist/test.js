/*
 * @Date: 2024-12-17 11:26:03
 * @Description: descriptionons
 */
import { filter, map, Subject } from 'rxjs';
const stream$ = new Subject();
const result$ = stream$.pipe(map(x => x * x)).pipe(filter((x) => x % 2 !== 0));
result$.subscribe((v) => {
    console.log(`订阅者1：${v}`);
});
result$.subscribe((v) => {
    console.log(`订阅者2: ${v}`);
});
stream$.next(1);
setTimeout(() => {
    stream$.next(2);
}, 1000);
setTimeout(() => {
    stream$.next(3);
}, 1000);
