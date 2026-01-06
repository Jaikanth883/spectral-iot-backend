const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let latestSpectralData = [];

app.post("/data", (req, res) => {
  latestSpectralData = req.body;
  console.log("Data received:", latestSpectralData.length);
  res.status(200).send("Data stored");
});

app.get("/data", (req, res) => {
  res.json(latestSpectralData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
