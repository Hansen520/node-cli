/*
 * @Date: 2025-01-03 15:22:30
 * @Description: description
 */
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function main() {
    const db = await open({
        filename: 'data.db',
        driver: sqlite3.Database
    });

    const insert = await db.prepare('INSERT INTO student (id, name, age) VALUES (?, ?, ?)');
    insert.run(4, '迪迦', 20);
    insert.run(5, '盖亚', 21);
    insert.run(6, '赛罗', 22);
    insert.finalize();

    const update = await db.prepare('UPDATE student SET name = ? WHERE id = ?');
    update.run('张三222', 1);
    update.finalize();

    const del = await db.prepare('DELETE FROM student WHERE id = ?');
    del.run(4);
    del.finalize();

    const allData = await db.all('SELECT * FROM student');
    console.log(allData);

}

main();
