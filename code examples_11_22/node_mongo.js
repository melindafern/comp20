const MongoClient = require('mongodb').MongoClient;
const connStr= "mongodb+srv://dbUser1:dbuser123@cluster0.rjmq5.mongodb.net/?retryWrites=true&w=majority";
	  

  MongoClient.connect(connStr, { useUnifiedTopology: true },  function(err, db) {
  if(err) { return console.log(err); }
  
    var dbo = db.db("textbooks");
	var collection = dbo.collection('books');
	
	console.log("Success!");
	db.close();
 
});



