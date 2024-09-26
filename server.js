const dotenv = require("dotenv");
dotenv.config();

// Here is where we import modules
// We begin by loading Express
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: false }));

const Fruit = require("./models/fruit.js");

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
  // res.send("This route sends the user a form page!");
});

app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  await Fruit.create(req.body);

  res.redirect("/fruits");
});

app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: allFruits });
});

app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
