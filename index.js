const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());





var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "fa4427408b2e446ba87323a0438bc880",
  captureUncaught: true,
  captureUnhandledRejections: true,
});





app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.log("Congrats, html file showed up ");
});









app.get("/api/quote", (req, res) => {
  const quotes = [
    "You can get everything in life you want if you will just help enough other people get what they want",
    "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    "I never dreamed about success. I worked for it.",
  ];
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuotes = quotes[randomIndex];

  res.status(200).send(randomQuotes);
});








app.use(rollbar.errorHandler());

const port = process.env.PORT || 4444;

app.listen(port, () => console.log(`running ${port}!`));
