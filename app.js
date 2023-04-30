console.log("sujitmemane");
const newNote = document.querySelector("#newNote");
const closeNote = document.querySelector("#closeNote");
const addNote = document.querySelector("#addNote");
const mainBox = document.querySelector("#mainBox");

const noteHeadingText = document.querySelector("#heading");
const noteBodyText = document.querySelector("#bodyText");
const notesMain = document.querySelector("#notes");

let notes = [];
const addNoteToNotes = () => {
  const title = noteHeadingText.value;
  const body = noteBodyText.value;
  console.log(title, body);
  const noteObj = {
    title: title,
    body: body,
  };
  notes.push(noteObj);
  showNotes();
};

function showNotes() {
  let noteHtml = "";
  console.log(noteHtml);
  for (let i = 0; i < notes.length; i++) {
    console.log(i);
    noteHtml += `
      <div class='w-[350px] min-h-[300px]  border-2 p-4  shadow-lg'>
      <h1 class='text-2xl my-2 text-center font-bold uppercase'>${notes[i].title}</h1>
      <p>
      ${notes[i].body}
      </p>

       <div class="mx-auto mt-8">
                <button class="px-8 py-4 bg-[#212529] text-white font-bold uppercase text-md rounded  " >Archeive</button>
                <button class="px-12 py-4 bg-[#212529] text-white font-bold uppercase text-md rounded  "
                   >Delete </button>
            </div>
      </div>  
    `;
  }
  console.log(noteHtml);

  notesMain.innerHTML = noteHtml;
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
