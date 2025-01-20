/*
 * @Date: 2025-01-17 10:33:17
 * @Description: description
 */
const fs = require('fs');
const { sum, read, some } = require('./sum');

jest.mock('fs'); // 模拟fs模块

test('sum test', () => {
    expect(sum(1, 2)).toBe(3);
});

test('read test', () => {
    fs.readFileSync.mockReturnValue('{"version":"1.0.0"}');
    expect(read()).toBe(111);

    fs.readFileSync.mockReturnValue('{"version":"2.0.0"}');
    expect(read()).toBe(222);
});

test('some test', () => {
    const fn = jest.fn();
    some(fn);
    // console.log(fn.mock.calls);
    expect(fn.mock.calls.length).toBe(2);
    expect(fn.mock.calls[0][0]).toBe(1);
});

beforeAll(() => {
    console.log('beforeAll');
})

afterAll(() => {
    console.log('afterAll');
})

beforeEach(() => {
    console.log('beforeEach');
})

afterEach(() => {
    console.log('afterEach');
})
