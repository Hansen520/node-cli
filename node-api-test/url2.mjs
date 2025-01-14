/*
 * @Date: 2025-01-14 17:54:21
 * @Description: description
 */
import http from 'node:http';
import url from 'node:url';

// const options = {
//     method: 'GET',
//     host: 'www.baidu.com',
//     port: 80,
//     path: '/'
// };

/*
    需要传递对象形式的 options。
    这时候就可以用 url.urlToHttpOptions 来解析 url 字符串来生成：
*/
const options = url.urlToHttpOptions(new URL('http://www.baidu.com:80/'));

const req = http.request(options, res => {
    res.on('data', (chunk) => {
        console.log(chunk.toString());
    });
    res.on('end', () => {
        console.log('done');
    });
});

req.end();
