// Dependencies
// ============================
const express = require("express");
const path = require("path");
const fs = require("fs");
// const { restart } = require("nodemon");
const { v4: uuidv4 } = require('uuid'); 
    // console.log("test")
    // console.log("uuid: " + uuidv4());

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
let notesData = require('./app/data/db/db.json')
    console.log(notesData)

// Displays all notes

app.get("/api/notes", function (req, res) {
    return res.json(notesData);
});


app.post("/api/notes", function (req, res) {

    let newNote = req.body;
//add a unique id to the newNote
    let idVariable = uuidv4();
    newNote["id"] = idVariable;
    console.log(newNote);

    //insert my new note into my "database" array
    notesData.push(newNote)
    //now i need to re-save the updated `notesData` with my `newNote` to my db.json
    //this json is a constructor function, its just in all caps
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

app.delete("/api/notes/:id", function (req, res) {
    console.log(req.params.id)

        //Use the Array.filter() method to filter out the matching element
        // myArray = myArray.filter(({id}) => id !== req.params.id);
            let noteID = req.params.id;
            notesData = notesData.filter(({id}) => id !==noteID
        )
        //Return any kind of success message.
        // res.json({success:true});
        res.send({message:"Success"})
        console.log(res)


});

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
