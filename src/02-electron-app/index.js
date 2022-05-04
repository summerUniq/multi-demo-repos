
const remote = require('electron').remote
const main = remote.require('./main.js')
const Button = document.createElement('button')
Button.textContent = 'open a new window'
Button.addEventListener('click', () => {
    main.openWindow()
})
exports.Button = Button