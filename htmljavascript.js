// removes previous note
urlGloble = "http://localhost:3002/notes/";
const messageDisplay = document.querySelector("pre[name = 'message']");

// -------------------------------------------------------------------
// POSTING AND PATCHING

// Get the checkboxes

const postBox = document.getElementById("postPatchPosting");
const patchBox = document.getElementById("postPatchPatching");
// the sections that contains our id selector
const patchIdBox = document.getElementById("patchByIdChoose");

// Hide or show the id selector depending if patch or post is checked
function postOrPatch() {
  if (postBox.checked == true) {
    patchIdBox.style.display = "none";
  }
  if (patchBox.checked == true) {
    patchIdBox.style.display = "block";
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

  // sending our request
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

    patchIdBox.style.display = "none";
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} `);
    }
  } catch (error) {
    // *needs more error handling here *
  }
}

patchIdBox.style.display = "none";
// -------------------------------------------------------------------

// GET
// Script for getting notes by Id

// listen to Id
const getId = document.querySelector("input[name =getId]");

// where to display the data
const noteDisplay = document.querySelector("pre[name = 'getNotes']");
const dateDisplay = document.querySelector("pre[name = 'getDate']");

// listen to id and show that id's notes
getId.addEventListener("change", () => {
  const id = getId.value;
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
getId.value = 0;

// -------------------------------------------------------------------

// DEL

// Get the checkbox
const delAllBox = document.getElementById("delByAll");
const delIdBox = document.getElementById("delById");
const expandDelForm = document.getElementById("delByIdChoose");

function expandFormFunc() {
  // If the checkbox is checked, display the output text
  if (delAllBox.checked == true) {
    expandDelForm.style.display = "none";
  }
  if (delIdBox.checked == true) {
    expandDelForm.style.display = "block";
  }
}

const delByIdInput = document.getElementById("delByIdInput");

async function delNotes() {
  // If the checkbox is checked, display the output text
  let id = null;

  if (delIdBox.checked == true) {
    id = delByIdInput.value;
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
delIdBox.value = "checked";
delByIdInput.value = "0";
