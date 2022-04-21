const {connectToRteBox} = require('rte-controller')

function connect() {
    connectToRteBox('http://127.0.0.1:8001/')
}
setTimeout(connect, 3000);