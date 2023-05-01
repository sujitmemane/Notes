console.log("sujitmemane");
const newNote = document.querySelector("#newNote");
const closeNote = document.querySelector("#closeNote");
const addNote = document.querySelector("#addNote");
const mainBox = document.querySelector("#mainBox");
const noteBox = document.querySelector(".note-box");
const noteHeadingText = document.querySelector("#heading");
const noteBodyText = document.querySelector("#bodyText");
const notesMain = document.querySelector("#notes");
const searchInput = document.querySelector("[data-search]");
const message = document.querySelector("#message");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  let notes = JSON.parse(localStorage.getItem("notes"));
  notes.forEach((note, index) => {
    const isVisible =
      note.title.toLowerCase().includes(value) ||
      note.body.toLowerCase().includes(value);
    const noteBox = document.querySelector(`#note-${index}`);
    noteBox.classList.toggle("hidden", !isVisible);
  });
});

const addNoteToNotes = () => {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  console.log(notes);
  let title = noteHeadingText.value;
  let body = noteBodyText.value;
  if (title === "" || body === "") {
    alert("Dont Submit Your Note without writing Title or Text");
    return;
  }

  const noteObj = {
    title: title,
    body: body,
  };
  notes.push(noteObj);
  localStorage.setItem("notes", JSON.stringify(notes));
  noteHeadingText.value = "";
  noteBodyText.value = "";
  showNotes();
  mainBox.classList.add("hidden");
  newNote.classList.remove("hidden");
};

const deleteNote = (index) => {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  let deletedNote = localStorage.getItem("deleted");
  if (deletedNote === null) {
    deletedNote = [];
  } else {
    deletedNote = JSON.parse(deletedNote);
  }
  deletedNote.push(notes[index]);
  console.log(deletedNote);
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("deleted", JSON.stringify(deletedNote));
  showNotes();
};

const archeiveNote = (index) => {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  let archeived = localStorage.getItem("archeived");
  if (archeived === null) {
    archeived = [];
  } else {
    archeived = JSON.parse(archeived);
  }
  archeived.push(notes[index]);

  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("archeived", JSON.stringify(archeived));
  console.log(archeived);

  showNotes();
};

function showNotes() {
  let messagehtml = "";
  let noteHtml = "";
  let notes = JSON.parse(localStorage.getItem("notes"));
  console.log(notes);

  for (let i = 0; i < notes.length; i++) {
    console.log(i);
    noteHtml += `
      <div class='w-[350px] min-h-[300px]  border-2 p-4  shadow-lg note-box'  id="note-${i}">
      <h1 class='text-2xl my-2 text-center font-bold uppercase'>${notes[i].title}</h1>
      <p>
      ${notes[i].body}
      </p>

       <div class="mx-auto mt-8">
                <button class="px-8 py-4 bg-[#212529] text-white font-bold uppercase text-md rounded  " onClick="archeiveNote(${i})" >Archeive</button>
                <button class="px-12 py-4 bg-[#212529] text-white font-bold uppercase text-md rounded  " id=${i}
                onClick="deleteNote(${i})"
                   >Delete </button>
            </div>
      </div>  
    `;
  }
  console.log(noteHtml);

  notesMain.innerHTML = noteHtml;
  if (notes.length === 0) {
    messagehtml += `
    <h1 class='text-3xl text-center font-bold mx-auto container  px-2 '>CREATE YOUR NOTE</h1>
    `;
    message.innerHTML = messagehtml;
  }
}

newNote.addEventListener("click", () => {
  console.log("clicked");
  mainBox.classList.remove("hidden");
  newNote.classList.add("hidden");
});
closeNote.addEventListener("click", () => {
  console.log("close button clicked");
  mainBox.classList.add("hidden");
  newNote.classList.remove("hidden");
});

addNote.addEventListener("click", addNoteToNotes);
showNotes();
