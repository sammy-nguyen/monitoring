const express = require("express");
const path = require("path");
const app = express();

const Rollbar = require("rollbar");

let rollbar = new Rollbar({
  accessToken: "fa4427408b2e446ba87323a0438bc880",
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
