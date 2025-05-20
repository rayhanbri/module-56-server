// npm install korlam express , mongodb,cors,dotenv 

const express = require ('express');
const cors = require ('cors');
const app = express();
// eita dot env website sobar laste bosacci 
require('dotenv').config()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

    const coffeesCollection  = client.db('coffeeDB').collection('coffes');

    // for new data neednew collection 
    const userCollection = client.db('coffeeDB').collection('users');

    // data server e anbho data base theke 
    app.get('/coffees',async(req,res) => {
      // const cursor = coffeesCollection.find();
      // const result = await cursor.toArray();

      const result = await coffeesCollection.find().toArray()
      res.send(result)

      // data showing on client server 
    })

    // just get1 i item 
    app.get('/coffees/:id',async(req,res) => {
      const id = req.params.id;
      const query = {_id:new ObjectId(id)}
      const result = await coffeesCollection.findOne(query);
      res.send(result)

      // server id diye check korbo 
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

    // update process 
    // 8 number videor 8 minit theke suru 
    app.put('/coffees/:id',async(req,res) => {
      const id = req.params.id;
      const filter = {_id:new ObjectId (id)}
      const options = {upsert : true};
      const updatedCoffee = req.body;
      const updateDoc = {
        $set : updatedCoffee
      }
     

      // manual system 
       
      // const updateDoc = {
      //   $set:{
      //     name:updatedCoffee.name,
      //     supllier : updatedCoffee.supllier
      //   }
      // }


       const result = await coffeesCollection.updateOne(filter,updateDoc,options)
       
       res.send(result);
    })




    // dete process 
    app.delete('/coffees/:id',async(req,res) =>{
      // id jeta asche ota params hisebe asche 
      const id = req.params.id;
      // id ke gapla korte hobe karon mongo nijei gapla kore id rakhe 

      // object ta k import korte hoi naile data kaj kore na 
      const query = {_id :new ObjectId(id)};
      const result= await coffeesCollection.deleteOne(query);
      res.send(result)
    })

    // api data post pore users 

    app.post('/users',async (req,res) => {
      const userProfile = req.body;
      // console.log(userProfile);
      const result = await userCollection.insertOne(userProfile);
      res.send(result)
    })


    // data get  of user 

    app.get('/users',async(req,res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    })

    // user data patch 
    app.patch('/users',async(req,res) => {
      // console.log(req.body);
      const {email,lastSignInTime} = req.body;
      const filter = {email:email};
      const updateDoc = {
        $set:{
          lastSignInTime:lastSignInTime
        }
      }
      // upsert hoi sudo put er modde patch e na 
      const result = await userCollection.updateOne(filter,updateDoc);
      res.send(result)

    })


    // user data delete 
    app.delete('/users/:id',async(req,res) => {
      const id = req.params.id;
      console.log(id)
      const query = {_id:new ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result)
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