const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opj08k2.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
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

    const userdatabase = client.db('usersDB').collection('users')
    const productDatabase = client.db('productDB').collection('products')
    const brandDatabase = client.db('productDB').collection('Brands')
    const cartDatabase = client.db('productDB').collection('Cart')

    app.get('/user', async(req, res)=>{
        const cursor = userdatabase.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.post('/user', async(req, res)=>{
        const user = req.body;
        console.log(user);
        const result = await userdatabase.insertOne(user)
        res.send(result)

    })
    
    app.get('/addproduct', async(req, res)=>{
        const cursor = productDatabase.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/addproduct', async(req, res)=>{
        const cursor = productDatabase.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.post('/addproduct', async(req, res)=>{
        const product = req.body;
        const result = await productDatabase.insertOne(product)
        res.send(result)

    })

    app.get('/brands', async(req, res)=>{
        const cursor = brandDatabase.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.post('/cart', async(req, res)=>{
      const cart = req.body;
      const result = await cartDatabase.insertOne(cart)
      res.send(result)
    })

    app.get('/cart', async(req, res)=>{
      const cursor = cartDatabase.find()
      const result = await cursor.toArray()
      res.send(result)
  })

  app.delete('/cart/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await cartDatabase.deleteOne(query)
    res.send(result)
  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('Hello from server')
})

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
})