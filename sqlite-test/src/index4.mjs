/*
 * @Date: 2025-01-03 15:17:40
 * @Description: description
 */
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function main() {
    const db = await open({
        filename: 'data.db',
        driver: sqlite3.Database
    });

    const person = await db.get('select * from student where name = :name', {
        ':name': '张三'
    }); // 查询下 name 为张三的记录
    console.log(person);

    const allData = await db.all('select * from student');
    console.log(allData);
}

main();