const electron = require('electron')
const path = require('path')

const {app, BrowserWindow} = electron
let win;

const createWidnow = () => {
     win = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
     })
    win.loadFile(`index.html`)

    //  打开开发者工具
    win.webContents.openDevTools()

    // 处理窗口关闭事件
    win.on('closed', () => {
        // 取消引用window对象， 如果你的应用支持多窗口的话
        // 通常会把多个window对象放在一个数组里面
        // 与此同时删除对应的元素
        win = null
    })
}

app.on('ready', createWidnow)

app.on('window-all-closed', () => {
    // 在macOs中， 除非用户用cmd + Q 确切地退出
    // 否则绝大部分应用及其菜单栏会保持激活
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOs中， 当单击dock图标并且没有其他窗口打开时
    // 通常在应用程序中重新创建一个窗口
    if(win == null) {
        createWidnow()
    }
})