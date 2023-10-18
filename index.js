const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Brand Shop Server is Running");
});
app.listen(port, () => {
  console.log(`Server is Running on Port: ${port}`);
});
