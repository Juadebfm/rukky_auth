require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

// initialize express
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to db
connectDB();

// Overall middleware (a must do)
app.use(express.json());

// routes

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to auth backend" });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server running on a port ${PORT}`);
});
