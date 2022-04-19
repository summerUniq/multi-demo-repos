const express = require('express')
const port = 3002
const app = express()
const path = require('path')
const fs = require('fs')
const qr = require('qr-image')
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('hello world')
})

/**
 * 1- 静态图片 pulic/test.png
 * 访问地址： http://localhost:3002/test.png
 */

app.use(express.static('./public'))

/**
 * 2- 读取图片文件，以流的形式返回
 * visit path: http://localhost:3002/getFileStream?name=test.png
 */

app.get('/getFileStream', (req, res) => {
    const file = req.query.name
    const stream = fs.createReadStream(path.resolve('./public', file))
    stream.pipe(res)
})

/**
 * 3- 读取图片文件返回流并添加Content-Disposition响应头
 * visit: http://localhost:3002/getFileStream?name=test.png
 * 下载test.png
 */
app.get('/getAttachmentFileStream', (req, res) => {
    const filename = req.query.name
    /**
     * attchment实际设置了两个响应头
     * Content-Disposition: attachment; filename="xxx.png"
     * Content-type: 【文件MIME类型】
     */
    res.attachment(filename)
    const stream = fs.createReadStream(path.resolve('./public', filename))
    stream.pipe(res)
})

/**
 * 4.动态生成图片返回流
 * 我们以生成二维码为例，使用qr-image这个库来创建二维码
 */
app.use('/createQrCode', (req, res) => {
    const data = qr.image(req.query.text, {
        type: 'png'
    })
    data.pipe(res)
})

/**
 * 5- 返回base64字符串
 */

app.use('/createBase64QrCode', (req, res) => {
    const data = qr.image(req.query.text, {
        type: 'png'
    })
    let chunks = [];
    let size = 0;
    data.on('data', (chunk) => {
        console.log('chunk', chunk);
        chunks.push(chunk)
        size += chunk.length
    })
    data.on('end', () => {
        const data = Buffer.concat(chunks, size)
        const base64 = "data:image/png;base64," + data.toString('base64')
        res.send(base64)
    })
})

/**
 * 6.上述几种情况的post请求方式
 * 需要增加中间件解析body参数
 * express.json()
 * express.urlencoded()
 * get --> post
 * 数据获取： req.body.name / req.body.text
 */
app.post('/getFileStreamPost', (req, res) => {
    const filename = req.body.name
    const stream = fs.createReadStream(path.resolve('./public', filename))
    stream.pipe()
})


app.listen(port, () => {
    console.log('服务启动完成');
})