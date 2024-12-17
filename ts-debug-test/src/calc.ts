/*
 * @Date: 2024-12-02 16:27:08
 * @Description: description
 */
function add(a: number, b: number) {
    if (a === 1) {
        throw new Error('a不能为1,xxxXXX###');
    }
    return a + b;
}

export {
    add
}
