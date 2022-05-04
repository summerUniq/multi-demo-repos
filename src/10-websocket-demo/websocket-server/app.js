const ws = require('nodejs-websocket')
const server = ws.createServer(connect => {
    console.log('连接成功了');
    connect.on('text', (data) => {
        console.log(data);
        connect.send(data)
    })

    connect.on('close', () => {
        console.log('断开链接');
    })

    connect.on('error', () => {
        console.log('用户连接异常');
    })
})

server.listen(3000, () => {
    console.log('websocket服务启动起来了，坚听了端口' + 3000);
})