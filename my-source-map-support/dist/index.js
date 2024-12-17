function add(a, b) {
    if (a === 1) {
        throw new Error('xxx');
    }
    return a + b;
}
function main() {
    console.log(add(1, 2));
}
main();
export {};
// console.log(retrieveSourceMapURL('./dist/index.js'))
//# sourceMappingURL=index.js.map