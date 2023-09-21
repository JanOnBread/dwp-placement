const app = require("./notes");
const request = require("supertest");
const { expect } = require("@jest/globals");

// ------------------------------------------------------------

// Test for POST

describe("Test for notes.js ", () => {
  let result = undefined;

  // TEST FOR POST: Returning error if the body is empty
  it("Should return an error if the body/notes is empty", async () => {
    const postBody = {};
    result = await request(app)
      .post("/notes")
      .set("Content-Type", "application/json")
      .send(postBody);

    expect(result.status).toBe(400);
  });

  //   it("Should return a message if a notes was not posted due to and empty body", async () => {
  //     await expect(result.body).toBe(
  //       "The note field is empty so a note was not sent (つ﹏<。)"
  //     );
  //   });

  // TEST FOR POST: Adding a note in the data base
  it("should add a note to the database", async () => {
    const postBody = {
      notes: "this is a test note :)",
    };
    result = await request(app)
      .post("/notes")
      .set("Content-Type", "application/json")
      .send(postBody);

    expect(result.status).toBe(201);
  });

  // TEST FOR POST : Sending a message back if succesfully posted
  it("Should return the a message if succesfully posted", () => {
    expect(result.body.message).toBe("You have added a new note ( ´∀｀)b");
  });

  // TEST FOR GET : getting all notes
  describe("TEST FOR GET", () => {
    it(" /notes should return all notes", async () => {
      const result = await request(app).get("/notes");
      expect(result.status).toBe(200);
    });

    it("/notes/{id} should return all notes", async () => {
      const result = await request(app).get("/notes");
      expect(result.status).toBe(200);
    });
  });

  // TEST FOR DElETE
  describe("TEST FOR DELETE ", () => {
    it("should delete notes based on an id", async () => {
      result = await request(app).delete("/notes/" + result.body.id);
      expect(result.status).toBe(200);
    });

    it("should delete all notes", async () => {
      result = await request(app).delete("/notes");
      expect(result.status).toBe(200);
    });
  });
});

// ------------------------------------------------------------

// Test for DELETE
// describe("Test for DELETE /notes/{id} ", () => {
//   let result = undefined;

// });

// describe("Test for DELETE /notes", () => {
//   let result = undefined;

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
