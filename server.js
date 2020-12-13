const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", function(req, res) {
    // res.send("hello world!");
    //the below failed before, but its because i hadn't brought in `path` yet, so i think it will work this time
    res.sendFile(path.join(__dirname, "./app/public/index.html"));

  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });