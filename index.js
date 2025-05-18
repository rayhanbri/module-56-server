// npm install korlam express , mongodb,cors,dotenv 

const express = require ('express');
const cors = require ('cors');
const app = express();
// eita dot env website sobar laste bosacci 
require('dotenv').config()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware 
app.use(cors());
app.use(express.json());

// node-modules and .env are in gitignore file jate kew na dhekhe 
// from env. file 
// DB_User = 'module-56-db'
// DB_Pass = 'JBh6W4n9gwLixx6F'

// console.log(process.env.DB_User)
// console.log(process.env.DB_Pass)
  

// ei uri the username ar password boshabho ,ekta space dichi just code crushed kore geche bhia

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.eztfylz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeesCollection  = client.db('coffeeDB').collection('coffess')

    // data server e anbho data base theke 
    app.get('/coffees',async(req,res) => {
      // const cursor = coffeesCollection.find();
      // const result = await cursor.toArray();

      const result = await coffeesCollection.find().toArray()
      res.send(result)

      // data showing on client server 
    })



    // posting coffes data in server 
    app.post('/coffees',async(req,res) => {
      const newCoffee = req.body;
      console.log(newCoffee)
      // ekhon data base add korte jacci 
      const result =await coffeesCollection.insertOne(newCoffee)
      res.send(result)

      // data ekhono website dhekhabhe na  data just mongo ar nodemon e dhekhabhe 

    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error


    // finaly tare comment kore dhibho 
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) =>{
    res.send('coffe is getting hotter')
})

app.listen(port,() => {
    console.log(`server is runnig on port ${port}`)
})