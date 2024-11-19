let database = {};

//=====================================================

// POST

// Creating a new note

async function createNewNote(req) {
  //generating new id
  const maxSchemas = Object.keys(database).length;
  const id = maxSchemas === 0 ? 0 : maxSchemas;

  // getting current data and time
  const date = String(new Date());
  const idString = id.toString();
  // Add note to our database
  database[idString] = {
    _id: id,
    date: date,
    notes: req.body.notes,
  };

  // Saving our new note
  const result = {
    message: "You have added a new note ( ´∀｀)b",
    id,
  };

  return result;
}

//=====================================================

// GET

async function getAllNotes() {
  //return await Note.find({});
}

// Function to find a note given an Id + error catch it
// side note: not for notes that doesn't exist since that returns a null
async function getById(res, id) {
  // adding a try catch to test if a note, given an Id, exists
  try {
    return database[id.toString()]; //Note.findById(id).exec();
  } catch (error) {
    return res
      .status(500)
      .send(
        "An error occurred with when trying to finding this note by it's ID \n (this is possibly a server error and not that the note doesn't exits) ఠ్ఠᗣఠ్ఠ )"
      );
  }
}

//=====================================================

// PATCH

async function updateById(id, notes) {
  // getting current data and time
  const date = String(new Date());

  const idString = id.toString();
  return (database[idString] = {
    _id: id,
    date: date,
    notes: notes,
  });
}

//=====================================================

// DELETE

async function delById(idAsString) {
  delete database[idAsString];
}

async function deleteAllNotes() {
  database = {};
}

//-----------------------------------------------

module.exports = {
  createNewNote,
  getAllNotes,
  getById,
  updateById,
  delById,
  deleteAllNotes,
};
