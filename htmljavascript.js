function eraseText() {
  document.getElementById("note").value = "";
}

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
  url = "http://localhost:3002/notes/" + id;
  try {
    const response = await fetch(url, {
      method: "get",
      //dataType: "json",
      mode: "cors",
    });

    // checking if the response went through (in connecting to the server)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // set the response json as jsonData and only return the note
    const jsonData = await response.json();

    noteDisplay.textContent = jsonData.notes;
    dateDisplay.textContent = jsonData.date;

    // =========================================
  } catch (error) {
    //const text = await response.text();
    //poemDisplay.textContent = String(text);
    noteDisplay.textContent = `Could not fetch verse: ${error}`;
    dateDisplay.textContent = ``;
  }
}
// when html page is refeshed, show note with id 1
updateDisplay(0);
idChoose.value = "0";

///==============================
// working code
// if (error === "HTTP error") {
//     poemDisplay.textContent = `Could not fetch verse: ${error}`;
//   } else {
//     poemDisplay.textContent = `Could not fetch verse: ${error}`;
//   }
