process.stdin.on('readable', () => {
    const buf = process.stdin.read();
    console.log(buf?.toString('utf-8'));
});