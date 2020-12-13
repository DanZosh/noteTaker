const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

//PATH LINKS
//PATH to index homepage
app.get("/", function(req, res) {
    // res.send("hello world!");
    res.sendFile(path.join(__dirname, "./app/public/index.html"));
});

// PATH to notes page
const notes = app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/notes.html"));
});

//DECOUPLING THE htmlRoutes.js file isn't working at this point:
// require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
