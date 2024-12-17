/*
 * @Date: 2024-11-28 15:22:51
 * @Description: description
 */
function sum(min, max) {
    if (min > max)
        return 0;
    // min + min + ... + min + sum(min + 1, max) + 0
    return min + sum(min + 1, max); // 递归调用
}
;
console.log(sum(1, 100));
export {};
