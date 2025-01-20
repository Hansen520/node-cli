/*
 * @Date: 2025-01-17 13:48:16
 * @Description: description
 */
const jest = {
    fn(impl= () => {}) {
        const mockFn = (...args) => {
            mockFn.mock.calls.push(args);
            return impl(...args);
        };
        mockFn.originImpl = impl;
        mockFn.mock = { calls: [] };
        return mockFn;
    },
    mock(mockPath, mockExports = {}) {
        const path = require.resolve(mockPath);
        require.cache[path] = {
            id: path,
            filename: path,
            loaded: true,
            exports: mockExports
        };
    }
}