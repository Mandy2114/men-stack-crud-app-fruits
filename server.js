const dotenv = require("dotenv")
dotenv.config();


// Here is where we import modules
// We begin by loading Express
const express = require("express");
const mongoose = require("mongoose")

const app = express();

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});