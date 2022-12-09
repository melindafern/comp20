var http = require('http');
var getprice = require('./prices.js');
/*
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The cost of a hotdog is: "+ 
			getprice.items.price('hotdog')+ "<br>");

  res.end();
}).listen(8080);*/
console.log(getprice.items.price('hotdog'))