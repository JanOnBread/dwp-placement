// removes previous note
urlGloble = "http://localhost:3002/notes/";
const messageDisplay = document.querySelector("pre[name = 'message']");

// -------------------------------------------------------------------

// GET
// Script for getting notes by Id

// listen to Id
const idChoose = document.querySelector("input");

// where to display the data
const noteDisplay = document.querySelector("pre[name = 'notes']");
const dateDisplay = document.querySelector("pre[name = 'date']");

// listen to id and show that id's notes
idChoose.addEventListener("change", () => {
  const id = idChoose.value;
  updateDisplay(id);
});

// notes to fetch notes
async function updateDisplay(id) {
  // Call `fetch()`, passing in the URL.
  try {
    const response = await fetch(urlGloble + id, {
      method: "get",
      //dataType: "json",
      mode: "cors",
    });

    // set the response json as jsonData and only return the note
    const jsonData = await response.json();

    // checking if the response went through (in connecting to the server)
    if (!response.ok) {
      messageDisplay.textContent = jsonData.message;
      throw new Error(`HTTP error: ${response.status} `);
    }

    noteDisplay.textContent = jsonData.notes;
    dateDisplay.textContent = jsonData.date;
    messageDisplay.textContent = "";

    // =========================================
  } catch (error) {
    noteDisplay.textContent = `Could not fetch note \n ${error}`;
    dateDisplay.textContent = "";
  }
}
// when html page is refreshed, show note with id 1
updateDisplay(0);
idChoose.value = "0";
//

// -------------------------------------------------------------------

// DEL

// Get the checkbox
const allBox = document.getElementById("byAll");
const idBox = document.getElementById("byId");
const expandForm = document.getElementById("DelByIdChoose");

function expandFormFunc() {
  // If the checkbox is checked, display the output text
  if (allBox.checked == true) {
    expandForm.style.display = "none";
  }
  if (idBox.checked == true) {
    expandForm.style.display = "block";
  }
}

async function delNotes() {
  // If the checkbox is checked, display the output text
  let id = null;

  if (idBox.checked == true) {
    id = DelByIdInput.value;
    console.log(id);
  } else {
    if (
      confirm(
        "This will delete all notes in the database and this actions can't be undone. Do you still wish to continue?"
      ) == false
    ) {
      return;
    }

    id = "";
  }

  try {
    const response = await fetch(urlGloble + id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    });
    const jsonData = await response.json();

    // checking if the response went through (in connecting to the server)
    messageDisplay.textContent = jsonData.message;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} `);
    }
  } catch (error) {
    console.log(error);
  }
}
idBox.value = "checked";
DelByIdInput.value = "0";
///==============================
// working code
// if (error === "HTTP error") {
//     poemDisplay.textContent = `Could not fetch verse: ${error}`;
//   } else {
//     poemDisplay.textContent = `Could not fetch verse: ${error}`;
//   }

// const messageDisplay = document.querySelector("pre[name = 'message']");

// function messageUpdate()  {

//   notesFormPost.addEventListener("submit", function(event) {

//     fetch(urlGloble, {
//     method: "POST",
//   }
//    )

//   messageDisplay.textContent = jsonData.message;

// }
