const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

// MongoDB URI
const uri =
  "mongodb://crud_db:xrdsmEw8vXNYW53N@ac-o5kwhso-shard-00-00.w7ff4t9.mongodb.net:27017,ac-o5kwhso-shard-00-01.w7ff4t9.mongodb.net:27017,ac-o5kwhso-shard-00-02.w7ff4t9.mongodb.net:27017/?ssl=true&replicaSet=atlas-gf2cia-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Declare globally
let userCollection;

async function run() {
  try {
    await client.connect();

    const db = client.db("crud_db");
    userCollection = db.collection("users");

    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

run();

// Home Route
app.get("/", (req, res) => {
  res.send("Hello Server");
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await userCollection.find().toArray();
  res.send(users);
});

// Get Single User
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const query = {
    _id: new ObjectId(id),
  };

  const user = await userCollection.findOne(query);

  res.send(user);
});


app.post('/users', async (req, res)=>{
  const newUser = req.body
  const result = await userCollection.insertOne(newUser)
  res.send(result)
  console.log(newUser)

  console.log(newUser)
})


app.delete('/users/:id',async (req, res) => {
  const id = req.params.id
  const query = {
    _id : new ObjectId(id)
  }
  const result = await userCollection.deleteOne(query)
  res.send(result)
})


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
