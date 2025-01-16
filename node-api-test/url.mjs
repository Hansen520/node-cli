import url from 'node:url';
const myURL = new url.URL('https://user:pass@sub.example.com:8080/xxx/yyy?a=1&b=2#hash');

console.log(myURL.hash, myURL.hostname, myURL.href, myURL.pathname, myURL.port, myURL.protocol, myURL.search, myURL.searchParams);

console.log(myURL.searchParams.get('a'), myURL.searchParams.get('b'));

myURL.searchParams.set('b', '3');
myURL.searchParams.append('c', '444');
console.log(myURL.searchParams.toString());


const params = new url.URLSearchParams('?aa=1&bb=2');
console.log(params);
for (const [name, value] of params) {
    console.log(name, value);
}

console.log(url.urlToHttpOptions(myURL));