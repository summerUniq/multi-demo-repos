const ws = require('nodejs-websocket')
const PORT = 3000

const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MESSAGE = 2

// 连接的总用户数
let count = 0
const server = ws.createServer((connect) => {
    count++
    // connect 每个进入的用户都会有一个connect 对象
    connect.userName = `用户${count}`
    // 只要有人进入需要告诉所有用户
    const msg = {
        type: TYPE_ENTER,
        msg: `${connect.userName}进入了聊天室`,
        time: new Date().toLocaleString()
    }
    broadcast(msg)
    connect.on('text', (data) => {
        // 告诉所有人发送的信息
        broadcast({
            type: TYPE_MESSAGE,
            msg: data,
            time: new Date().toLocaleString()
        })

    })
    connect.on('close', () => {
        console.log('close' + connect.userName);
        count--
        // 告诉所有用户有人离开了
        broadcast({
            type: TYPE_LEAVE,
            msg: `${connect.userName}离开了聊天室`,
            time: new Date().toLocaleString()
        })
    })
    connect.on('error', () => {
        console.log('error');
    })
})

server.listen(PORT, () => {
    console.log('监听端口3000');
})


function broadcast(msg) {
    server.connections.forEach(v => {
        v.send(JSON.stringify(msg))
    })
}