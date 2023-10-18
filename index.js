const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Brand Shop Server is Running");
});
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bfs9yhw.mongodb.net/?retryWrites=true&w=majority`;
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
    console.log("You successfully connected to MongoDB!");
    //!DB Collection
    const Brands = client.db("BrandShopDB").collection("Brands");
    //! Brands Port
    app.get("/brands", async (req, res) => {
      const target = Brands.find();
      const result = await target.toArray();
      res.send(result);
      // https://i.ibb.co/F6xRtkg/nike.png
      // https://i.ibb.co/9tqnTtc/zara.png
      // https://i.ibb.co/RCrtnCR/adidas.png
      // https://i.ibb.co/c3KCgDP/Banner.jpg
      // https://i.ibb.co/3pvWSgw/gucci.png
      // https://i.ibb.co/C03rGDm/h-m.png
      // https://i.ibb.co/VxyrJd3/levis.png
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is Running on Port: ${port}`);
});
