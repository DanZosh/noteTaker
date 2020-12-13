const path = require("path");

const paths = function(app){
//PATH LINKS
//PATH to index homepage
app.get("/", function(req, res) {
    // console.log('PRINTING APP.GET')
// res.send("hello world!");
//the below failed before, but its because i hadn't brought in `path` yet, so i think it will work this time
    res.sendFile(path.join(__dirname, "./app/public/index.html"));
});
    // console.log('PRINTING APP.GET')
    // console.log(notes)

// PATH to notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/public/notes.html"));
});
}

module.exports = paths