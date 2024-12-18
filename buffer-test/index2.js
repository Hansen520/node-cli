/*
 * @Date: 2024-12-18 10:05:26
 * @Description: description
 */
const buffer = new ArrayBuffer(10);

const dataView = new DataView(buffer);

dataView.setUint16(0, 256);// 定义空间

console.log(dataView.getUint16(0));

console.log(dataView.getUint8(0));
console.log(dataView.getUint8(8));
