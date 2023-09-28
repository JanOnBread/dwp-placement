// naming the select
const verseChoose = document.querySelector("input");

// where to display the poem
const noteDisplay = document.querySelector("pre[name = 'notes']");
const dateDisplay = document.querySelector("pre[name = 'date']");

// from the select, what verse is chosen we choose that verse
verseChoose.addEventListener("change", () => {
  const id = verseChoose.value;
  updateDisplay(id);
});

async function updateDisplay(id) {
  // Call `fetch()`, passing in the URL.
  url = "http://localhost:3002/notes/" + id;
  try {
    const response = await fetch(url, {
      method: "get",
      //dataType: "json",
      mode: "cors",
    });

    // checking if the reponse went through (in connecting to the server)
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
    noteDisplay.textContent = `Could not note verse: ${error}`;
    dateDisplay.textContent = ``;
  }
}

updateDisplay(0);
verseChoose.value = "0";
// working code
// if (error === "HTTP error") {
//     poemDisplay.textContent = `Could not fetch verse: ${error}`;
//   } else {
//     poemDisplay.textContent = `Could not fetch verse: ${error}`;
//   }
