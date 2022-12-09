const MongoClient = require('mongodb').MongoClient;
const connStr= "mongodb+srv://dbUser1:dbuser123@cluster0.rjmq5.mongodb.net/?retryWrites=true&w=majority";


  MongoClient.connect(connStr, function(err, db) {
  if(err) { return console.log(err); }
  
    var dbo = db.db("library");
	var collection = dbo.collection('books');
	
	var theQuery = { title: /^Who/ };
    collection.deleteMany(theQuery, function(err, obj) {
    if (err) throw err;
    console.log("document(s) deleted");
    });

});



