/*
 * @Date: 2024-12-06 17:25:07
 * @Description: description
 */

// process.stdout.write('hello')
// process.stdout.write(' ')
// process.stdout.write('world' + process.platform + process.version + process.uptime() + process.pid + process.arch)
// process.stdout.write('\n' + process.cwd() + '\n' + __dirname + '\n' + __filename)

// process.stdin.on('data', (data) => {
//     console.log(`User input: ${data}`);
//   });

const buf = Buffer.alloc(10);
const buf2 = Buffer.from('Hello, world!');
const buf3 = Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
buf.write('Hello');
buf.write('World', 4);
console.log(buf.toString());
console.log(buf2.toString());
console.log(buf3);

const buf4 = Buffer.concat([buf2, buf3]);
console.log(buf4.toString());
