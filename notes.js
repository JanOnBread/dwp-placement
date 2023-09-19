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
  "mongodb+srv://janet:CF49WrEQOsdJ3ukN@janet-notes.mspqjdv.mongodb.net/placement?retryWrites=true&w=majority";
//Local "mongodb+srv://jcheung801:afyRjrtKZbmaz5N5@cluster0.3wjqms8.mongodb.net/Placement?retryWrites=true&w=majority";

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
  notes: String, // "Today I learnt that ....."
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
      .send("An error has occured - Database can't be shown (⋟﹏⋞)");
  }
});

// GET BY ID: /store/[id] returns on that id entry
app.get("/store/:_id", async (req, res) => {
  const noteById = await Note.findById(req.params).exec();

  if (noteById === null) {
    return res.status(404).send("There is no entry with this id ( ＞Д＜ )ゝ ");
  } else {
    return res.send(noteById);
  }
});

// DELETE BY ID: /store/[id] deleted that id entry
app.delete("/store/:_id", async (req, res) => {
  const noteById = await Note.findById(req.params).exec();

  if (noteById === null) {
    return res.status(404).send("There is no entry with this id ( ＞Д＜ )ゝ ");
  } else {
    await Note.findByIdAndRemove(req.params).exec();
    return res
      .status(200)
      .send("this note has been deleted successfully deleted ٩(`･ω･´)و ");
  }
});

// defining POST : adds a new note
app.post("/notes", async (req, res) => {
  const maxSchemas = await Note.findOne().sort({ _id: -1 }).exec();
  const count = maxSchemas._id;

  const id = count + 1;
  const date = String(new Date());

  // Schemas
  const document = new Note({
    _id: id,
    date: date,
    notes: req.body.notes,
  });

  // return an error is a field is empty
  if (req.body.notes === undefined) {
    return res
      .status(400)
      .send("The note field is empty so a note was not sent (つ﹏<。)");
  }
  // Saving our new note
  try {
    await document.save();
    console.log("document saved to db");
    return res.status(201).send("You have added a new note ( ´∀｀)b");
  } catch (error) {
    return res
      .status(500)
      .send("An error occured so a note was not posted ( ఠ్ఠᗣఠ్ఠ )");
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
