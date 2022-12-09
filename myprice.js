var http = require('http')
var getprice = require('./price.js');

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type';})
// }
console.log(getprice.items.price('hotdog'));