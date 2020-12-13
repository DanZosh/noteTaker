const express = require("express");
const path = require("path");

const app = express();
    console.log('TEST HERE')
    console.log(app)
const PORT = process.env.PORT || 3001;

//PATH LINKS
//PATH to index homepage
app.get("/", function(req, res) {
    console.log('PRINTING APP.GET')
    // res.send("hello world!");
    //the below failed before, but its because i hadn't brought in `path` yet, so i think it will work this time
    res.sendFile(path.join(__dirname, "./app/public/index.html"));
  });

// PATH to notes page
const notes = app.get("/notes", function(req, res) {
    
    // res.send("hello world!");
    //the below failed before, but its because i hadn't brought in `path` yet, so i think it will work this time
    res.sendFile(path.join(__dirname, "./app/public/notes.html"));
  });
    // console.log('PRINTING APP.GET')
    // console.log(notes)
    
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

 