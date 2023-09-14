
// Setting up Express server 
const express = require('express');
const app = express();
const port = 3002; 
const url = "http://localhost:" + port 

app.listen(port, () => {
    console.log("The server is running at " + url )
})

//==================================================

// Setting up MongoDB (our Database)
const mongoose = require("mongoose");

const dataBaseLoc = "mongodb://localhost:27017"; 

mongoose.connect(dataBaseLoc, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
    const noteSchema = {
        date: String, // ie 13/9/2023
        dayName: String, // Wednesday 
        notes: String, 
    }
    const Note = mongoose.model("Note", noteSchema);
    console.log ("Our database is located at: " + dataBaseLoc)
    // defining a schema 
    
}); 






//=========================================

// // testing by adding one note
// const Note = mongoose.model("Note", noteSchema);
// const newNote = new Note({
//     date: "13/9/2023",
//     dayName: "Wednesday" ,
//     notes: "Test note",     
// });
// newNote.save()
// .then(() => {
//     console.log('Save User at MongoDB');
//   })
//   .catch((error) => {
//     console.error(error);
// });; 



