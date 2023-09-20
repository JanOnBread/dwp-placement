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

//  GET : will show us all current items in our database
app.get("/notes", async (req, res) => {
  try {
    allNotes = await Note.find({});
    return res.send(allNotes);
  } catch (error) {
    return res
      .status(500)
      .send("An error has occured - Database can't be shown (⋟﹏⋞)");
  }
});

// --------------------------------------------------
// GET BY ID: /store/[id] returns on that id entry

async function checkNoteById(res, id) {
  // adding a try catch to test Note.findById
  let noteById = undefined;

  try {
    noteById = await Note.findById(id).exec();
    return noteById;
  } catch (error) {
    return res
      .status(500)
      .send(
        "An error occured with when trying to finding this note by it's ID" +
          " (this is possibly a server error and not that the note doesn't exits) ఠ్ఠᗣఠ్ఠ )"
      );
  }
}

app.get("/notes/:_id", async (req, res) => {
  //const noteById = await Note.findById(req.params).exec();
  const noteById = checkNoteById(res, req.params._id);

  if (noteById === null) {
    return res.status(404).send("There is no entry with this id ( ＞Д＜ )ゝ ");
  } else {
    return res.send(noteById);
  }
});

// --------------------------------------------------
// DELETE BY ID: /delete/[id] deleted that id entry
app.delete("/notes/:_id", async (req, res) => {
  //const noteById = await Note.findById(req.params).exec();
  const noteById = checkNoteById(res, req.params._id);
  if (noteById === null) {
    return res.status(404).send("There is no entry with this id ( ＞Д＜ )ゝ ");
  } else {
    await Note.findByIdAndRemove(req.params).exec();
    return res
      .status(200)
      .send("this note has been deleted successfully deleted ٩(`･ω･´)و ");
  }
});

// --------------------------------------------------
//  POST : adds a new note
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

// --------------------------------------------------
// UPDATE BY ID: /update/[id] changes the note for that entry
app.patch("/notes/:_id/", async (req, res) => {
  //const noteById = await Note.findById(req.params).exec();
  const noteById = checkNoteById(res, req.params._id);

  if (noteById === null) {
    return res.status(404).send("There is no entry with this id ( ＞Д＜ )ゝ ");
  } else {
    await Note.findByIdAndUpdate(req.params._id, { notes: req.body.notes });
    return res
      .status(200)
      .send("this note has been updated successfully ٩(`･ω･´)و ");
  }
});
