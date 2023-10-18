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
    const Products = client.db("BrandShopDB").collection("Products");
    //! Brands Port
    app.get("/brands", async (req, res) => {
      const target = await Brands.find();
      const result = await target.toArray();
      res.send(result);
    });
    //! Add Product
    app.post("/product-add", async (req, res) => {
      const product = req.body;
      const result = await Products.insertOne(product);
      res.send(result);
    });
    //! Brand Wise Product
    app.get("/products/:brand", async (req, res) => {
      const brand = req.params.brand;
      const query = { brandName: brand };
      const target = Products.find(query);
      const result = await target.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is Running on Port: ${port}`);
});
