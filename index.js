const express = require("express");
const path = require("path");
const app = express();

const Rollbar = require("rollbar");

let rollbar = new Rollbar({
  accessToken: "e880b8ef56ef41d9a0984915fe6a167c",
  captureUncaught: true,
  captureUnhandledRejections: true,
});



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.info("Congrats, html file showed up ")
});








app.use(rollbar.errorHandler());

const port = process.env.PORT || 4444;

app.listen(port, () => console.log(`running ${port}!`));
