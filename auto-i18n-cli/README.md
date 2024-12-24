<!--
 * @Date: 2024-12-17 11:17:23
 * @Description: description
-->
# 1 - 24已看
# 15 基于AST实现精准的代码修改 ast-transform-test

# 24 线程池 来优化性能 worker-test
利用cpu的多核性能，将任务交给线程池去处理


# 25 线程池 scan-thread-pool 返回扫描结果
将扫描交给worker去处理，这是一个扫描目录的工程

# 26 node操作二进制数据 buffer-test
主要是介绍 buffer 的使用 和 blob 的使用，当传递二进制数据的时候，最好用 Blob 而不是 Buffer：

# 27 dns my-dns-server
dns 服务器，可以用来测试 dns 的解析速度，以及 dns 的缓存

# 28 webSocket my-websocket的内容
相关的websocket的手写

# 29 stream 读写流 stream-test
可读流 Readable、可写流 Writable、双工流 Duplex、转换流 Transform

```javascript
import stream from 'node:stream';

// 可读流
const Readable = stream.Readable;
// 可写流
const Writable = stream.Writable;
// 双工流
const Duplex = stream.Duplex;
// 转换流
const Transform = stream.Transform;
```

# 31 前端编译原理

# 32 国际化CLI

# 36 rollup打包而不是webpack
这节我们学习了 rollup，虽然它不如 webpack、vite 提到的多，但也是一个常用的打包工具。

它打包产物没有 runtime 代码，更简洁纯粹，能打包出 esm、cjs、umd 的产物，常用来做 js 库、组件库的打包。相比之下，webpack 目前对 esm 产物的支持还是实验性的，不稳定。

rollup 只有 plugin，没有 loader，因为它的 transform 方法就相当于 webpack 插件的 loader。

vite 就是基于 rollup 来实现的，开发环境用 rollup 插件的 transform 来做代码转换，生产环境用 rollup 打包。
