const express = require('express')
const path = require('path')
const FILE_DIR = path.join(__dirname, 'files')
const resolvePath = require('resolve-path')
const app = express()

app.get('/', (req, res) => {
    res.send('<ul>' +
        '<li>Download <a href="/files/notes/groceries.txt">notes/groceries.txt</a>.</li>' +
        '<li>Download <a href="/files/amazing.txt">amazing.txt</a>.</li>' +
        '<li>Download <a href="/files/missing.txt">missing.txt</a>.</li>' +
        '<li>Download <a href="/files/CCTV大赛上海分赛区.txt">CCTV大赛上海分赛区.txt</a>.</li>' +
        '</ul>')
})

app.get('/files/:file(*)', function (req, res, next) {
    const filePath = resolvePath(FILE_DIR, req.params.file)
    res.download(filePath, function (err) {
        if (!err) {
            return;
        }
        if (err.status !== 404) {
            return next(err)
        }
        if (err.status == 404) {
            res.send('Cant find that file, sorry!')
        }
    })
})

app.listen(3001)