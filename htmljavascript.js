// removes previous note
urlGloble = "http://localhost:3002/notes/";
const messageDisplay = document.querySelector("pre[name = 'message']");

// -------------------------------------------------------------------
// POSTING AND PATCHING

// Get the checkboxes

const postBox = document.getElementById("posting");
const patchBox = document.getElementById("patching");
// the sections that contains our id selector
const patchChooseIdBox = document.getElementById("patchByIdChoose");

// Hide or show the id selector depending if patch or post is checked
function postOrPatch() {
  if (postBox.checked == true) {
    patchChooseIdBox.style.display = "none";
  }
  if (patchBox.checked == true) {
    patchChooseIdBox.style.display = "block";
  }
}

// Sending a post/patch request

// grabbing elements
//  id (for patching)
const idForPatch = document.getElementById("patchByIdInput");
//  notes
const postPatchNote = document.getElementById("postPatchNotes");

async function postPatchNotesFunc() {
  let id = null;
  let HTTPmethod = null;

  if (patchBox.checked == true) {
    id = patchByIdInput.value;
    HTTPmethod = "PATCH";
  } else {
    id = "";
    HTTPmethod = "POST";
  }

  // sending our request d
  try {
    const response = await fetch(urlGloble + id, {
      method: HTTPmethod,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        notes: postPatchNote.value,
      }),
    });

    const jsonData = await response.json();

    // checking if the response went through (in connecting to the server)
    messageDisplay.textContent = jsonData.message;

    patchChooseIdBox.style.display = "none";
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} `);
    }
    patchChooseIdBox.style.display = "none";
  } catch (error) {
    // *needs more error handeling here *
  }
}

patchChooseIdBox.style.display = "none";
// -------------------------------------------------------------------

// GET
// Script for getting notes by Id

// listen to Id
const idChoose = document.querySelector("input[name =getId]");

// where to display the data
const noteDisplay = document.querySelector("pre[name = 'getNotes']");
const dateDisplay = document.querySelector("pre[name = 'getDate']");

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
idChoose.value = 0;

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
