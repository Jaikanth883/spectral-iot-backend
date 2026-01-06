const express = require("express");
const cors = require("cors");

const app = express();

// Railway provides PORT automatically
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---------------- DATA STORAGE ----------------
let latestSpectralData = [];
let sendData = false;

// ---------------- ROUTES ----------------

// health check (IMPORTANT for Railway)
app.get("/", (req, res) => {
  res.send("Spectral IoT Backend Running");
});

// ESP32 sends data
app.post("/data", (req, res) => {
  latestSpectralData = req.body;
  res.send("Data received");
});

// UI fetches data
app.get("/data", (req, res) => {
  res.json(latestSpectralData);
});

// ESP32 checks control state
app.get("/control", (req, res) => {
  res.json({ send: sendData });
});

// UI start button
app.post("/start", (req, res) => {
  sendData = true;
  res.send("Started");
});

// UI stop button
app.post("/stop", (req, res) => {
