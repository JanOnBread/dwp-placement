// Setting up Express server
const express = require("express");
const app = express();
app.use(express.json());
const port = 3002;
const url = "http://localhost:" + port;

app.listen(port, () => {
  console.log("The server is running at " + url);
});
//==================================================

// Setting up MongoDB (our Database)
const mongoose = require("mongoose");

const dataBaseLoc =
  "mongodb+srv://jcheung801:k1IDMrTBzqHGsLeY@cluster0.3wjqms8.mongodb.net/Placement?retryWrites=true&w=majority";

mongoose
  .connect(dataBaseLoc, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Our database is located at: " + dataBaseLoc);
  })
  .catch((error) => {
    console.log("A database was not set up");
    console.error(error);
  });

// defining a Schemea
const noteSchema = {
  _id: Number,
  date: String, // ie 13/9/2023
  dayName: String, // Wednesday
  notes: String,
};
const Note = mongoose.model("Note", noteSchema);

//=======================================================

// defining GET : will show us all current items in our database
app.get("/store", async (req, res) => {
  const allNotes = await Note.find({});
  try {
    return res.send(allNotes);
  } catch (error) {
    return res
      .status(500)
      .send("An error has occured - Database can't be shown");
  }
});

// defining POST : adds a new note
app.post("/notes", async (req, res) => {
  const count = await Note.count({});
  const id = count + 1;

  const document = new Note({
    _id: id,
    date: req.body.date,
    dayName: req.body.dayName,
    notes: req.body.notes,
  });

  // return an error is a field is empty
  if (
    req.body.date === undefined ||
    req.body.dayName === undefined ||
    req.body.notes === undefined
  ) {
    return res.status(400).send("A field is empty so a note was not sent ;( ");
  }

  // Saving our new note
  try {
    await document.save();
    console.log("document saved to db");
    return res.status(201).send("You have added a new note :)");
  } catch (error) {
    return res.status(500).send("A note was not sent :(");
  }
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

// app.get("/store", (req, res) => {
//   const testNote = new Note({
//     date: "13/9/2023",
//     dayName: "Wednesday",
//     notes: "Test notes",
//   });
//   testNote.save();

//   return res.send("added a note :)");
//   //   const notes = await Note.find();
// });
