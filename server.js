const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.send("hello world!");
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });