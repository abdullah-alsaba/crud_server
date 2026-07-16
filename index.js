const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.port || 7000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb://crud_db:xrdsmEw8vXNYW53N@ac-o5kwhso-shard-00-00.w7ff4t9.mongodb.net:27017,ac-o5kwhso-shard-00-01.w7ff4t9.mongodb.net:27017,ac-o5kwhso-shard-00-02.w7ff4t9.mongodb.net:27017/?ssl=true&replicaSet=atlas-gf2cia-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server running in ${port}`);
});
