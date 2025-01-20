const { Workbook } = require('exceljs');

async function main() {
    const workbook = new Workbook();

    const workbook2 = await workbook.xlsx.readFile('./data.xlsx');

    workbook2.eachSheet((sheet, index1) => { // 表
        // console.log('工作表1' + index1 + '的名称是：' + sheet.name);

        const value = sheet.getSheetValues();

        console.log(value, 13);

        // sheet.eachRow((row, index2) => { // 行
        //     const rowData = [];

            // row.eachCell((cell, index3) => {
            //     rowData.push(cell.value);
            // });

            // console.log('行', index2, rowData);
        // });
    });
}

main();