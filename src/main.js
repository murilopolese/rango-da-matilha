const choo = require('choo')
const html = require('choo/html')
const home = require('./view.js')

const app = choo()
app.route('/', home)
app.mount('#rango')
