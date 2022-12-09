const { response } = require('express');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const querystring = require('querystring');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://melindafern:7ta1GCEBunXOf2ak@cluster0.5uyl2dn.mongodb.net/?retryWrites=true&w=majority";

//creates form app with express
app.use(express.urlencoded({extended:true}));

//uses get to create form html webpage
app.get('/', function(req, res, next){
  res.send(`
    <div class="container">
      <div class ="formstuff">
        <form method="post" action = '/'>

          <p class="userInput"><label>Company Name or Stock Ticker</label> <input type="text"  name='theInput' /></p>
        
          <p>
           <input type="radio"  name="name_or_ticker" value = "name" checked="checked"/>Company Name
           <input type="radio"  name="name_or_ticker" value = "ticker"/>Stock Ticker
          </p>

          <input type = "submit" value = "Submit" />

        </form>
      </div>
    </div>
  `);
});

//uses post to save the data from the from that the user inputs and calls dbConnect() sending the form data and the response page with it
app.post('/', async function(req, res, next){
  let input = req.body.theInput;
  let radio = req.body.name_or_ticker;
  await dbConnect(input, radio, res);
});

//displays on the localhost:2000
app.listen(2000);

//connects to the mongodb database with an async function
function dbConnect(input, radio, res){
  //connect to database
  MongoClient.connect(url, async function(err, client) {
    if (err) throw err;
      const database = client.db("equities", { useUnifiedTopology: true });
      const collection = database.collection('equities');
      //if the radio button is clicked to the ticker symbol
      if (radio == 'ticker') {
        //query to find the matching companyName to the ticker
        collection.find({ticker:input}).toArray(async function(err, result) {
        if (err) throw err;
        let string = await JSON.stringify(result);
        let parsed = await JSON.parse(string);
        let i = 0;
        let print = "";
        //concatenates the print statement with the proper info from the database and prints it to the response page
        while (parsed[i] != null) {
          print += parsed[i].companyName + " " + parsed[i].ticker + "\n";
          i++;
          if(parsed[i] == undefined) {
            await res.send(print);
          }
        }
        client.close();
        });
      }
      //if the radio button is clicked to the companyName option
      else {
        //query to find the matching ticker to the companyName
        collection.find({companyName:input}).toArray(async function(err, result) {
          if (err) throw err;
          let string = await JSON.stringify(result);
          let parsed = await JSON.parse(string);
          let i = 0;
          let print = "";
          //concatenates the print statement with the proper info from the database and prints it to the response page
          while (parsed[i] != null) {
            print += parsed[i].companyName + " " + parsed[i].ticker + "\n";
            i++;
            if(parsed[i] == undefined) {
              await res.send(print);
            }
          }
          client.close();
          });
      }
  });
}