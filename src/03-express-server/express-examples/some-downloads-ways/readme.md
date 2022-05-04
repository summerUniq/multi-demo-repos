# 下载图片的多种方式

1- 静态资源下载

```js
app.use(express.static('./public'))
```

2- 图片以流返回

```js
app.get('/getFileStram', (req, res) => {
    const filename = req.query.name
    const stream = fs.createReadStream(path.resolve('./public', filename))
    stream.pipe(res)
})
```

3- 读取图片文件返回流并添加Content-Disposition响应头
Content-Disposition响应头是MIME协议的扩展，用来告诉浏览器如何处理服务器发送的文件

```json
// 浏览器能直接打开直接打开，否则保存
Content-Disposition: inline; 

// 告诉浏览器以附件的形式发送，会直接触发保存，会以接口的名字作为默认的文件名
Content-Disposition: attachment;

// 告诉浏览器以附件的形式发送，会直接触发保存，filename的值作为保存的文件名
Content-Disposition: attachment; filename="test.png"
```

```js
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
```

4- 动态生成图片流， 比如二维码

```js
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
```

5- 返回base64

```js
app.use('/createQrCode', (req, res) => {
    const data = qr.image(req.query.text, {
        type: 'png'
    })
    const chunks = []
    let size = 0
    data.on('data', (chunk) => {
        chunks.push(chunk)
        size += chunk.length
    })
    data.on('end', (req, res) => {
        const stream  = Buffer.concat(chunks, size);
        const base64 = 'data:image/png;base64' + stream.toString('base64')
        res.send(base64)
    })
})
```
