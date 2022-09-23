var fs = require('fs')
var products = JSON.parse(fs.readFileSync('products.txt').toString())
module.exports = products;