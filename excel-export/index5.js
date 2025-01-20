/*
 * @Date: 2025-01-20 14:15:13
 * @Description: description
 */
const { execSync } = require('node:child_process');
const { parse } = require("csv-parse/sync");
const fs = require('node:fs');

const sheetUrl = "https://docs.qq.com/sheet/DUU1WdHBQbHF0ZktE?tab=unkz1o";

execSync(`curl -L ${sheetUrl}/export?format=csv -o ./message2.csv`, {
    stdio: 'ignore'
});

const input = fs.readFileSync("./message2.csv");

const records = parse(input, { columns: true });

console.log(records);
