// Defining Constants

const app = require("./notes");
const request = require("supertest");
const { expect } = require("@jest/globals");

// ------------------------------------------------------------

// making Id a globel vaiable
let id = null;

describe("TEST FOR POST", () => {
  it("Should return an error if the body/notes is empty", async () => {
    const postBody = {}; // creating an empty note
    const resultPostEmpty = await request(app)
      .post("/notes")
      .set("Content-Type", "application/json")
      .send(postBody);
    expect(resultPostEmpty.status).toBe(400);
    expect(resultPostEmpty.text).toBe(
      "The note field is empty so a note was not sent (つ﹏<。)"
    );
  });

  it("Should add a new note into the database", async () => {
    postBody = {
      notes: "this is a test note :)",
    };
    const resultPost = await request(app)
      .post("/notes")
      .set("Content-Type", "application/json")
      .send(postBody);
    expect(resultPost.status).toBe(201);
    expect(resultPost.body.message).toBe("You have added a new note ( ´∀｀)b");

    id = resultPost.body.id;
  });
});

// ------------------------------------------------------------
// TEST FOR GET

describe("TEST FOR GET", () => {
  it(" /notes should return all notes", async () => {
    const resultGet = await request(app).get("/notes");
    expect(resultGet.status).toBe(200);
  });

  it("/notes/{id} should return that id's notes", async () => {
    const resultGetId = await request(app).get("/notes/" + String(id));
    expect(resultGetId.status).toBe(200);
    expect(resultGetId.body._id).toBe(id);
  });

  it("/notes/{invalid id} should return an error", async () => {
    const resultGetId = await request(app).get("/notes/" + String(id + 1));
    expect(resultGetId.status).toBe(404);
    expect(resultGetId.text).toBe("There is no entry with this id ( ＞Д＜ )ゝ");
  });
});

// ------------------------------------------------------------
// TEST FOR UPDATE

describe("TEST FOR UPDATE ", () => {
  it("/notes/{id} with a body, should update the note", async () => {
    const updateBody = {
      notes: "this is a update",
    };
    resultUpdate = await request(app)
      .patch("/notes/" + id)
      .set("Content-Type", "application/json")
      .send(updateBody);

    expect(resultUpdate.status).toBe(200);
    expect(resultUpdate.text).toBe(
      "this note has been updated successfully ٩(`･ω･´)و"
    );

    const resultUpdateNewNote = await request(app).get("/notes/" + id);
    expect(resultUpdateNewNote.body.notes).toBe("this is a update");
  });
});

// ------------------------------------------------------------
// TEST FOR DElETE

describe("TEST FOR DELETE ", () => {
  it("/notes/{id} should delete notes based on an id", async () => {
    resultDelId = await request(app).delete("/notes/" + id);
    expect(resultDelId.status).toBe(200);
    expect(resultDelId.text).toBe(
      "this note has been deleted successfully deleted ٩(`･ω･´)و"
    );
  });

  //
  it("/notes should delete all notes", async () => {
    resultDelAll = await request(app).delete("/notes");
    expect(resultDelAll.status).toBe(200);
    expect(resultDelAll.text).toBe("All notes have been deleted ٩(`･ω･´)و");
  });
});

// ------------------------------------------------------------

// Test for DELETE

//   //   it("Should return the a message if all notes have been succesfully deleted", () => {
//   //     expect(result.span).toBe("All notes have been deleted ٩(`･ω･´)و");
//   //   });
// });

// ------------------------------------------------------------

// Test for UPDATE

//==================================

// it("should add a note to the database", async () => {
//     const postBody = {
//       notes: "this is a test note :)",
//     };
//     const result = await request(app)
//       .post("/notes")
//       .set("Content-Type", "application/json")
//       .send(postBody);

//     expect(result.status).toBe(201);
//     // expect message to be'You have added a new note ( ´∀｀)b' (useing .body somewhere)

//     // send a delete request to the database
//     // expect the delete request .status to be 200
//     console.log(result.body);
//   });
