// Dependencies
// ============================
const express = require("express");
const path = require("path");
const fs = require("fs");
// const { restart } = require("nodemon");
const { v4: uuidv4 } = require('uuid'); 
    console.log("test")
    console.log("uuid: " + uuidv4());

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


// RETURN the contents at `notes.html `
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

    //use the fs module to read the file
    //then parse the file contents wiht JSON.parse to get the real data 
    //send the parsed data back to the client with res.json()
    return res.json(notesData);
});

//POST the note from the client to the server. The server should save that post in the db.json; and then return it to the client 
app.post("/api/notes", function (req, res) {
    //post is used for creating new things
    //Access the POSTed data in `req.body`
    //Use the fs module to read the file
    //THEN parse the file contents with JSON.parse() to the real data
    //Push the req.body to the array lst
    //JSON.stringify() the array list back into a JSON string
    //THEN save the contents back to the `db.JSON` with the `fs` module

    
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    //the client is posting to the server
    
    let newNote = req.body;
//add a unique id to the newNote
    let idVariable = uuidv4();
    newNote["id"] = idVariable;
    console.log(newNote);

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

// app.delete("/api/notes/:id", function (req, res) {
//     //Access the :id from  `req.params.id`
//     //Use the fs module to read the file
//     //THEN parse the file contents with JSON.parse() to the real data
//     // Option A
//         // Then find the matching index using Array.findIndex()
//         //Remove the target element using Array.splice()
//     //Option B
//         //Use the Array.filter() method to filter out the matching element
//         // myArray = myArray.filter(({id}) => id !== req.params.id);
//         //Return any kind of success message.
//     const noteID = req.params.id;
    
//     console.log(noteID)
// // for loop here
// }

// PATH to index.html 
app.get("*", function(req, res) {
    //sending a get request to my server to get something at '/'. And i send back an html file
    // RETURN the contents at `index.html`
    res.sendFile(path.join(__dirname, "./app/public/index.html"));
    //
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
