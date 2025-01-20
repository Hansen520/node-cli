/*
 * @Date: 2025-01-20 13:51:30
 * @Description: description
 */
const { Workbook } = require('exceljs');
const fs = require('node:fs');

async function main(){
    const workbook = new Workbook();

    const workbook2 = await workbook.xlsx.readFile('./bundle.xlsx');

    const zhCNBundle = {};
    const enUSBundle = {};

    workbook2.eachSheet((sheet, index1) => {

        sheet.eachRow((row, index) => {
            // console.log('工作表' + index1);
            if (index === 1) {
                return;
            }
            const key = row.getCell(1).value;
            const zhCNValue = row.getCell(2).value;
            const enUSValue = row.getCell(3).value;
            zhCNBundle[key] = zhCNValue;
            enUSBundle[key] = enUSValue;
        });

        console.log(zhCNBundle);
        console.log(enUSBundle);

        fs.writeFileSync('zh-CN.json', JSON.stringify(zhCNBundle, null, 2));
        fs.writeFileSync('en-US.json', JSON.stringify(enUSBundle, null, 2));
        

        // sheet.eachRow((row, index2) => {
        //     const rowData = [];
    
        //     row.eachCell((cell, index3) => {
        //         rowData.push(cell.value);
        //     });

        //     console.log('行' + index2, rowData);
        // })
    })
}

main();