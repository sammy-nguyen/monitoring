const express = require("express");
const path = require("path");
var Rollbar = require("rollbar");



var rollbar = new Rollbar({
  accessToken: "fa4427408b2e446ba87323a0438bc880",
  captureUncaught: true,
  captureUnhandledRejections: true,
});


const app = express();
app.use(express.json());




app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.log("Congrats, html file showed up ");
});




app.get("/style", (req, res) => {
  let { name } = req.body;
  res.sendFile(path.join(__dirname, "/public/index.css"));
});



let movies = [];
app.post("/api/movie", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = movies.findIndex(movieName => movieName === name);

  if (index === -1 && name !== "") {
    movies.push(name);
    rollbar.log("MOVIE added successfully", {author: "Squid Game",type: "manual entry"})
    res.status(200).send(movies);
  } else if (name === "") {
    rollbar.error("No name given");
    res.status(400).send("Please provide a movie's name.");
  } else {
    rollbar.critical("This movie already exist");
    res.status(400).send("that movie already exists");
  }
});












app.use(rollbar.errorHandler());

const port = process.env.PORT || 4444;

app.listen(port, () => console.log(`running ${port}!`));
