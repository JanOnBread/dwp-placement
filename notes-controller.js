const notesService = require("./notes-service");

// Getting required modules
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3002;
const url = "http://localhost:" + port;

app.use(
  cors({
    credentials: true,
    origin: url,
  })
);

app.listen(port, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", port);
});

console.log("The server is running at " + url);
console.log("Open API address:" + url + "/openapi");
//===========================================

// OPEN API

const OpenApiValidator = require("express-openapi-validator");
const file = fs.readFileSync("./openapi.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

// INSTALLING MIDDLEWARE

app.use(
  OpenApiValidator.middleware({
    ignoreUndocumented: true,
    apiSpec: swaggerDocument,
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  })
);

// SHOW VALIDATOR PAGE
app.use("/openapi", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//----------------------------------------------------
//  GET  HTML PAGE
app.use(express.static(path.join(__dirname)));

app.get("/", async (req, res) => {
  try {
    return res
      .status(200)
      .json({
        message: "Index page is up!",
      })
      .sendFile(__dirname + "/index.html");
  } catch (error) {
    return res.status(500).json({
      message: "An error has occurred (⋟﹏⋞)",
    });
  }
});

//----------------------------------------------------

//=============================================================

//      HTTP METHODS

//=============================================================

//  POST : adds a new note

app.post("/notes", async (req, res) => {
  // return an error if the note field is empty

  if (req.body.notes === undefined || req.body.notes.length == 0) {
    return res.status(400).json({
      message: "The note field is empty so a note was not sent (つ﹏<。)",
    });
  }

  // Saving our new note into our database
  try {
    const result = await notesService.createNewNote(req);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred so a note was not posted ( ఠ్ఠᗣఠ్ఠ )",
    });
  }
});

// ------------------------------------------------------------
//  GET : will show us all current notes in our database

app.get("/notes", async (req, res) => {
  try {
    allNotes = await notesService.getAllNotes();
    return res.status(200).send(allNotes);
  } catch (error) {
    return res.status(500).json({
      message: "An error has occurred - Database can't be shown (⋟﹏⋞)",
    });
  }
});

// ------------------------------------------------------------

// GET BY ID: /notes/[id] returns based on id

app.get("/notes/:_id", async (req, res) => {
  const noteById = await notesService.getById(res, req.params._id);

  if (noteById === undefined) {
    return res
      .status(404)
      .json({ message: "There is no entry with this id ( ＞Д＜ )ゝ" });
  } else {
    return res.status(200).send(noteById);
  }
});

// ------------------------------------------------------------

// UPDATE BY ID: /update/[id] changes the note for that entry

app.patch("/notes/:_id/", async (req, res) => {
  const noteById = await notesService.getById(res, req.params._id);

  if (noteById === undefined) {
    return res
      .status(404)
      .json({ message: "There is no entry with this id ( ＞Д＜ )ゝ " });
  } else {
    if (req.body.notes === undefined || req.body.notes.length == 0) {
      return res.status(400).json({
        message: "The note field is empty the note was not updated (つ﹏<。)",
      });
    }
    try {
      await notesService.updateById(Number(req.params._id), req.body.notes);
      return res
        .status(200)
        .json({ message: "this note has been updated successfully ٩(`･ω･´)و" });
    } catch (error) {
      return res.status(500).json({
        message:
          "An error has occurred - not was not updated (⋟﹏⋞) - this is possibly a server error",
      });
    }
  }
});
//------------------------------------------------------------

// DELETE BY ID: /delete/[id] deleted that id entry

app.delete("/notes/:_id", async (req, res) => {
  //const noteById = await Note.findById(req.params).exec();
  const noteById = await notesService.getById(res, req.params._id);

  if (noteById === undefined) {
    return res
      .status(404)
      .json({ message: "There is no entry with this id ( ＞Д＜ )ゝ " });
  } else {
    try {
      await notesService.delById(req.params._id);
      return res.status(200).json({
        message: "this note has been deleted successfully deleted ٩(`･ω･´)و",
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "An error has occurred - this note was note deleted (⋟﹏⋞)- Possible server error",
      });
    }
  }
});

// DELETE ALL: /delete/all deleted all notes

app.delete("/notes/", async (req, res) => {
  try {
    await notesService.deleteAllNotes();
    return res
      .status(200)
      .json({ message: "All notes have been deleted ٩(`･ω･´)و" });
  } catch (error) {
    return res.status(500).json({
      message: "An error has occurred - all notes where note deleted (⋟﹏⋞)",
    });
  }
});

//======================================================

// Error messenger handler
app.use((err, req, res, next) => {
  // format errors
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
//=====================================================

module.exports = app;
