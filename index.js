const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const jwt = require('jsonwebtoken'); 
const app = express();
const port = process.env.PORT || 5000;

  // middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pyi9p.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();

    console.log('Database Connected');

    const productCollection = client.db('db_manufacture').collection('parts');

    //all item load 

    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });



    // single item load 
    app.get('/products/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const services = await productCollection.findOne(query);
      res.send(services);
    })

    // some chage for problem heroku server 

  }

  finally {

  }
}

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Manufacturer website is running')
})

app.listen(port, () => {
  console.log('listening to the port', port);
})

