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

// Defining our model
const Note = mongoose.model("Note", noteSchema);

//=====================================================

// POST

// Defining a Schema
const noteSchema = {
  _id: Number, // auto-generated
  date: String, // auto-generated
  notes: String, // custom imputed (body),"Today I learnt that ..."
};

// Creating a new note

async function createNewNote(req) {
  //generating new id
  const maxSchemas = await Note.findOne().sort({ _id: -1 }).exec();
  const id = maxSchemas === null ? 0 : maxSchemas._id + 1;

  // // getting current data and time
  const date = String(new Date());

  // Adding requests to schema
  const document = new Note({
    _id: id,
    date: date,
    notes: req.body.notes,
  });

  // Saving our new note
  await document.save();
  const result = {
    message: "You have added a new note ( ´∀｀)b",
    id,
  };

  return result;
}

//=====================================================

// GET

async function getAllNotes() {
  await Note.find({});
}

// Function to find a note given an Id + error catch it
// sidenote: not for notes that doesn't exist since that returns a null
async function checkNoteById(res, id) {
  // adding a try catch to test if a note, given an Id, exists
  try {
    return await notesService.findById(id).exec();
  } catch (error) {
    return res
      .status(500)
      .send(
        "An error occurred with when trying to finding this note by it's ID" +
          " (this is possibly a server error and not that the note doesn't exits) ఠ్ఠᗣఠ్ఠ )"
      );
  }
}

async function getById(res, id) {
  await Note.checkNoteById(res, id);
}
//=====================================================

// PATCH

async function findByIdAndUpdate(id, notes) {
  await Note.findByIdAndUpdate(id, { notes: notes });
}

//-----------------------------------------------
//getById
//getAll
//updateOne

module.exports = {
  createNewNote,
  getAllNotes,
  checkNoteById,
  getById,
};
