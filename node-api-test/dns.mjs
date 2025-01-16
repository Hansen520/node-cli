/*
 * @Date: 2025-01-16 15:06:33
 * @Description: description
 */
import dns from 'node:dns/promises';

async function main() {
    const res = await dns.resolve('bilibili.com');
    console.log(res);
}

main();