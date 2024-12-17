/*
 * @Date: 2024-12-17 10:10:05
 * @Description: description
 */
function calc(num) {
    let total = 0;
    for(let i = 0; i< num; i++) {
        total += i;
    }
    return total
}

addEventListener('message', function(evt) {
    postMessage(calc(evt.data));
});