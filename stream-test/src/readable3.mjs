import { Readable } from 'node:stream';

class ReadableDong extends Readable {

    constructor(iterator) {
        super();
        this.iterator = iterator;
    }

    _read() { // ReadableDong的_read方法必需被执行
        const next = this.iterator.next();
        if(next.done) { // 如果迭代器已经完成，则调用push(null)表示流已经结束
            return this.push(null);
        } else {
            this.push(next.value)
        }
    }

}

function *songGenerator() {
    yield '阿门阿前一棵葡萄树，';
    yield '阿东阿东绿的刚发芽，';
    yield '阿东背着那重重的的壳呀，';
    yield '一步一步地往上爬。';
}

const songIterator = songGenerator();


function createReadStream(interator) {
    return new ReadableDong(interator);
}

const readableStream = new createReadStream(songIterator);

readableStream.on('data', (data)=> {
    console.log(data.toString())
});

readableStream.on('end', () => {
    console.log('done');
});
