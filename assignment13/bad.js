
async function trying() {
    await MongoClient.connect(url, {useUnifiedtopology: true}, function(err, db) {
    if(err) {console.log("Connection err" + err); return;}
    
      var dbo = db.db("equities");
      var collection = dbo.collection('equities');

      // Asynchronous - Opening File
      console.log("Going to open file!");
      fs.open('companies.csv', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("File opened successfully!"); 
        console.log("going to read the file!");

        (async function processLineByLine() {
          try {
            const rl = readline.createInterface({
              input: fs.createReadStream('companies.csv'),
              crlfDelay: Infinity
            });

            rl.on('line', (line) => {
              let [companyName, ticker] = line.split(',')
              collection.insertOne({
                  companyName: companyName,
                  ticker: ticker
              })
              console.log(companyName, ticker);
            });
            
            await events.once(rl, 'close');

            console.log('Reading file line by line with readline done.');
          } catch (err) {
            console.error(err);
          }
        })();

        fs.close(fd, function(err) {
          if (err) {
             console.log(err);
          } 
          console.log("File closed successfully.");
       });
      });
    });

      //read line by line of the file (company name + stock ticker) use parse!
      
      //insertOne for each line of the file into the collection as a new document
      
      console.log("Success!");

      db.close();
   
  });