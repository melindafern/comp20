const fs = require("fs");
const readline = require('readline');
const { runInContext } = require("vm");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://melindafern:7ta1GCEBunXOf2ak@cluster0.5uyl2dn.mongodb.net/?retryWrites=true&w=majority";

// Function: dbConnect()
// Purpose: This function connects the host to the mongodb database.
// Description: This function starts by connecting to the MongoClient with an async function. This function is called 
//              in the processCompanies() function. It finds the correct equities database and collection. Then it waits
//              for the documents to be inserted into the database and console logs when it is complete. Then it closes the
//              client connection.
// Input: docs an array of the information to be put into the mongodb collection.
// Output: N/a
function dbConnect(docs){
  //connect to database
  MongoClient.connect(url, async function(err, client) {
    if (err) { return }
    try {
      const database = client.db("equities", { useUnifiedTopology: true });
      const collection = database.collection('equities');
      
      const options = {ordered:true};
  
      const result = await collection.insertMany(docs, {});
  
      console.log(`${result.insertedCount} the docs were inserted`);
      
    } finally {
      await client.close();
    }
  });
}

// Function: processCompanies()
// Purpose: This function reads the companies.csv file and stores it in an array.
// Description: This function creates a readstream and uses readline to read the information from the csv file. It skips the first line
//              and splits the proceeding lines into an array of the company name and ticker information. The array pieces are then combined
//              into a single large array companyDoc. Then the array calls dbConnect() sending companyDoc with it.
// Input: N/a
// Output: N/a
async function processCompanies() {
  const fstream = fs.createReadStream('companies.csv');
  const rl = readline.createInterface({input: fstream, crlfDelay: Infinity});
  
  let companies = [];
  let skip = true;
  for await (const line of rl) {
    if (skip) {
      skip = false;
      continue;
    }
    let [name, ticker] = line.split(',');
    let companyDoc = {companyName: name, ticker: ticker};
    companies.push(companyDoc);
  }

  console.log("finished with file");
  console.log(companies);
  dbConnect(companies); //.catch(console.dir);
  return true;
}

processCompanies();
console.log("its happening!");