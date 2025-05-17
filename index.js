// npm install korlam express , mongodb,cors,dotenv 

const express = require ('express');
const cors = require ('cors');
const app = express();
const port = process.env.PORT || 3000;

// middleware 
app.use(cors());
app.use(express.json());


app.get('/',(req,res) =>{
    res.send('coffe is getting hotter')
})

app.listen(port,() => {
    console.log(`server is runnig on port ${port}`)
})