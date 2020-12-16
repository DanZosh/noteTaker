// Dependencies
// ============================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { restart } = require("nodemon");

// Sets up the Express App
// ============================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./app/public"))


// //PATHS 

//PATH htmls
//PATH to index.html 
app.get("/", function(req, res) {
    //sending a get request to my server to get something at '/'
    // res.send("hello world!");
    res.sendFile(path.join(__dirname, "./app/public/index.html"));
    //and i send back an html file
});

// PATH to notes.html 
const notes = app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/notes.html"));
});



//PATH data
//GET the notes that exist in the db
//Loading the data into memory as a javascript variable
const notesData = require('./app/data/db/db.json')
    console.log(notesData)

  // Displays all notes
// In the browser im the client. I send a request to the server via the search bar to get the function stored at the location "api/notes"
app.get("/api/notes", function (req, res) {
    // console.log(notes)
    return res.json(notesData);
});

//POST the note from the client to the server. The server should save that post in the db.json; and then return it to the client 
app.post("/api/notes", function (req, res) {

    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    //the client is posting to the server
    let newNote = req.body;
    //insert my new note into my "database" array
    notesData.push(newNote)
    //now i need to re-save the updated `notesData` with my `newNote` to my db.json
    //this json is a constructor function, its just oin all caps
    fs.writeFile("./app/data/db/db.json",JSON.stringify(notesData),(err)=>
    { 
        if (err) {
            console.log(err)
        }else{ 
            console.log("File written successfully\n"); 
            //this json is related to express somehow
            res.json(notesData)
        }
    })
    return
}
);

// app.delete("/api/notes/:boop", function (req, res) {
//     // this accesses what is sent up
//     req.params.boop
//for loop here




app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
