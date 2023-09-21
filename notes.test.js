const app = require("./notes");
const request = require("supertest");
const { expect } = require("@jest/globals");

// ------------------------------------------------------------

describe("TEST FOR POST", () => {
  let resultPost = undefined;

  // TEST FOR POST: Returning error if the body is empty
  it("Should return an error if the body/notes is empty", async () => {
    const postBody = {};
    resultPostEmpty = await request(app)
      .post("/notes")
      .set("Content-Type", "application/json")
      .send(postBody);

    expect(resultPostEmpty.status).toBe(400);
  });

  //   it("Should return a message if a notes was not posted due to and empty body", async () => {
  //     await expect(result.body).toBe(
  //       "The note field is empty so a note was not sent (つ﹏<。)"
  //     );
  //   });

  it("should add a note to the database", async () => {
    const postBody = {
      notes: "this is a test note :)",
    };
    resultPost = await request(app)
      .post("/notes")
      .set("Content-Type", "application/json")
      .send(postBody);

    expect(resultPost.status).toBe(201);
  });

  // TEST FOR POST : Sending a message back if succesfully posted
  it("Should return the a message if succesfully posted", () => {
    expect(resultPost.body.message).toBe("You have added a new note ( ´∀｀)b");
  });

  // ------------------------------------------------------------
  // TEST FOR GET

  describe("TEST FOR GET", () => {
    it(" /notes should return all notes", async () => {
      const resultGet = await request(app).get("/notes");
      expect(resultGet.status).toBe(200);
    });

    it("/notes/{id} should return that id's notes", async () => {
      const resultGetId = await request(app).get(
        "/notes/" + resultPost.body.id
      );
      expect(resultGetId.status).toBe(200);
      expect(resultGetId.body.id).toBe(resultPost.body.id);
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
        .patch("/notes/" + resultPost.body.id)
        .set("Content-Type", "application/json")
        .send(updateBody);

      expect(resultUpdate.status).toBe(200);
    });
  });

  // ------------------------------------------------------------
  // TEST FOR DElETE

  describe("TEST FOR DELETE ", () => {
    it("/notes/{id} should delete notes based on an id", async () => {
      resultDelId = await request(app).delete("/notes/" + resultUpdate.body.id);
      expect(resultDelId.status).toBe(200);
    });

    //
    it("/notes should delete all notes", async () => {
      resultDelAll = await request(app).delete("/notes");
      expect(resultDelAll.status).toBe(200);
    });
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
