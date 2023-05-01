const deletedContainer = document.querySelector("#deleted");
const searchInput = document.querySelector("[data-search]");
const message = document.querySelector("#message");
searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  let deleted = JSON.parse(localStorage.getItem("deleted"));
  deleted.forEach((note, index) => {
    const isVisible =
      note.title.toLowerCase().includes(value) ||
      note.body.toLowerCase().includes(value);
    const aBox = document.querySelector(`#note-${index}`);
    console.log(aBox);
    aBox.classList.toggle("hidden", !isVisible);
  });
});

const restoreNote = (index) => {
  let deletedNote = localStorage.getItem("deleted");
  if (deletedNote === null) {
    deletedNote = [];
  } else {
    deletedNote = JSON.parse(deletedNote);
  }
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  notes.push(deletedNote[index]);
  deletedNote.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("deleted", JSON.stringify(deletedNote));
  showDeletedNotes();
};

const pdNote = (index) => {
  let deletedNote = localStorage.getItem("deleted");
  if (deletedNote === null) {
    deletedNote = [];
  } else {
    deletedNote = JSON.parse(deletedNote);
  }
  deletedNote.splice(index, 1);
  localStorage.setItem("deleted", JSON.stringify(deletedNote));
  showDeletedNotes();
};
const showDeletedNotes = () => {
  let messagehtml = "";

  let deleted = JSON.parse(localStorage.getItem("deleted"));
  let deletedhtml = "";
  if (deleted.length === 0) {
    messagehtml += `
    <h1 class='text-3xl text-center font-bold mx-auto container  px-2 '>NO DELETED NOTES FOUND</h1>
    `;
    message.innerHTML = messagehtml;
  }

  for (let i = 0; i < deleted.length; i++) {
    console.log(i);
    deletedhtml += `
      <div class='w-[350px] min-h-[300px]  border-2 p-4  shadow-lg' id='note-${i}'>
      <h1 class='text-2xl my-2 text-center font-bold uppercase'>${deleted[i].title}</h1>
      <p>
      ${deleted[i].body}
      </p>    
       <div class="mx-auto mt-8 flex items-center  justify-between ">
                <button class="px-8 py-4 bg-[#212529] text-white font-bold uppercase text-md rounded  " onClick="restoreNote(${i})" >Restore</button>
                   <button class="px-8 py-4 bg-[#212529] text-white font-bold uppercase text-md rounded  " onClick="pdNote(${i})" >Wipe Out</button>
            </div>  
      </div>  
    `;
  }

  deletedContainer.innerHTML = deletedhtml;
  console.log(deleted);
};

showDeletedNotes();
