var http = require('http');
var adr = require('url');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type':'text/html'});
  u = adr.parse(req.url, true)
  if (u.pathname == "/")
	  res.write("This is the home page");
  else if (u.pathname == "/about")
	  res.write ("This is the about page");
 else if (u.pathname == "/process")
	 {
	  res.write ("This is the process page<br>");
	  name = u.query.the_name;
	  res.write ("<h2>Hello " + name+ "</h2>")
	 }
   else 
	  res.write ("Unknown page request");
  res.end();
}).listen(8080);

