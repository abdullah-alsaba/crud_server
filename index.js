const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 7000;

app.use(cors());
app.use(express.json())





app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server running in ${port}`);
});
