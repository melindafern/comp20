var http = require('http');
var adr = require('url');
const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://jbalbi01:Jumbo328@atlascluster.gqfxm25.mongodb.net/retryWrites=true&w=majority";
client =new MongoClient(url,{ useUnifiedTopology: true ,useNewUrlParser: true});



http.createServer(function (req,res) {
    if(req.url == "/favicon.ico"){
        console.log(req.url)
    }
    else if (req.url[1] == "?"){
        res.writeHead(200, {'Content-Type':'text/html'});
        u = adr.parse(req.url,true);
        console.log(u)
        fname = u.query.fname;
        lname = u.query.lname;
        num = u.query.discount;
        insertdiscount(fname,lname,num,res)
    }
    else if (req.url.substring(1, 8) == "process") {
        res.writeHead(200, {'Content-Type':'text/html'});
        u = adr.parse(req.url,true);
        console.log(u)
        discountcheck(u, res)
    }
    else if (req.url.substring(1, 8)  == "confirm") {
        res.writeHead(200, {'Content-Type':'text/html'});
        u = adr.parse(req.url,true);
        discount = u.query.discount
        deletediscount(u, discount, res);
    }
    else{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write ("Unknown page request");
        res.end();
    }
    }).listen(8080)

async function insertdiscount(fname,lname,num,res)
{
    MongoClient.connect(url, function(err, data) {
        if (data) {
            console.log("connection");
            if(err) { return console.log(err); }
            var db = data.db("final");
            var collection = db.collection('discounts');
            var query = {Firstname: fname, Lastname: lname};
            collection.find(query).toArray(function (err, item) {
            if (err) {
                console.log("Error: " + err);
                return;
            }
            else {
                if (item.length < 1 && fname != undefined) {
                    var newData = {Firstname: fname, Lastname: lname, Discount : num};
                    collection.insertOne(newData, function(err, res) {
                    if (err) throw err;
                    });
                    console.log("done");
                    note = "Only eligible to hold one discount code at a time";
                }
                else{
                    num = item[0].Discount;
                    console.log("old code");
                    note = "You have a previously unused discount code which must be used";
                }

                fs.readFile("discount.html","utf8", function (error, html) {
                  if (error) {
                    throw error;
                  }
                html = html.replace("DISCOUNT", num);
                html = html.replace("note", note);
                res.end(html);
                });
            }
            });
        }
        else {
            console.log("no connection");
        }
    });
}



async function discountcheck(u, res){
    fname= u.query.fname;
    lname= u.query.lname;
    MongoClient.connect(url, function(err, data) {

        if (data) {
            console.log("connection");
            if(err) { return console.log(err); }
            var db = data.db("final");
            var collection = db.collection('discounts');
            var query = {Firstname: fname, Lastname: lname}
            collection.find(query).toArray(function (err, item) {
                if (err) {
                    console.log("Error: " + err);
                    return;
                }
                else {
                    if (item.length < 1) {
                        discount = 0;
                        dc = 0;
                    }
                    else{
                        discount = item[0].Discount;
                        dc = 1;
                    }
                }
                edit(u,discount,dc,res);
            });
        }
        else {
            console.log("no connection");
        }
    });
}
function edit(u, discount,dc ,res){
    fname= u.query.fname;
    lname= u.query.lname;
    addy= u.query.addy;
    num= u.query.num;
    tax= u.query.tax;
    subtotal = u.query.subtotal;
    cost = u.query.cost;
    qualities = [u.query.qual0, u.query.qual1, u.query.qual2, u.query.qual3, u.query.qual4, u.query.qual5,u.query.qual6]
    quantities = [u.query.quan0, u.query.quan1, u.query.quan2, u.query.quan3, u.query.quan4, u.query.quan5,u.query.quan6]
    allergies = u.query.allergies;
    total=u.query.total;
    fs.readFile("receipt.html",'utf8', function (error, html) {
        if (error) {
            throw error;
        }
        j = 0;
        for (var i = 0; i < cost.length; i++) {
                html = html.replace("QUAN"+i, quantities[i]);
                html = html.replace("QUAL"+i, qualities[i]);
                html = html.replace("COST"+i, cost[i]);
                if (quantities[i] == 0 && j == 0){
                    j = i;
                }
        }
         html = html.replace("K", j);
         html = html.replace("FNAME", fname);
         html = html.replace("LNAME", lname);
         html = html.replace("NUM", num);
         html = html.replace("SUBTOTAL", subtotal);
         html = html.replace("TAX", tax);
         html = html.replace("DISCOUNTCHECK", dc);
         html = html.replace("DISCOUNT", discount);
         html = html.replace("TOTAL", total);
         html = html.replace("TOTALL", total);
         html = html.replace("DISTOTAL", (.75*total).toFixed(2));
         res.end(html);
     });
}



async function deletediscount(u, discount, res){
    MongoClient.connect(url, function(err, data) {
        if (data) {
            console.log("connection");
            if(err) { return console.log(err); }
            var db = data.db("final");
            var collection = db.collection('discounts');
            if (discount != "none"){
                var query = {Discount: discount}
                collection.deleteOne(query, function(err, item) {
                    if (err) throw err;
                });
            }
            editconfirm(u,res);
        }
        else {
            console.log("no connection");
        }
    });
}

function editconfirm(u,res){
    discount = u.query.discount;
    fs.readFile("confirmation.html",'utf8', function (error, html) {
        if (error) {
            throw error;
        }
         res.end(html);
     });

}
