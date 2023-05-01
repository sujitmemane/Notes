const archeivedContainer = document.querySelector("#archeived");
const searchInput = document.querySelector("[data-search]");
const message = document.querySelector("#message");
searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  let archeived = JSON.parse(localStorage.getItem("archeived"));
  archeived.forEach((note, index) => {
    const isVisible =
      note.title.toLowerCase().includes(value) ||
      note.body.toLowerCase().includes(value);
    const aBox = document.querySelector(`#note-${index}`);
    console.log(aBox);
    aBox.classList.toggle("hidden", !isVisible);
  });
});

const deleteANote = (index) => {
  console.log("click");
  let archeived = localStorage.getItem("archeived");
  if (archeived === null) {
    archeived = [];
  } else {
    archeived = JSON.parse(archeived);
  }
  let deletedNote = localStorage.getItem("deleted");
  if (deletedNote === null) {
    deletedNote = [];
  } else {
    deletedNote = JSON.parse(deletedNote);
  }
  deletedNote.push(archeived[index]);

  archeived.splice(index, 1);
  localStorage.setItem("archeived", JSON.stringify(archeived));
  localStorage.setItem("deleted", JSON.stringify(deletedNote));
  showArcheivedNotes();
};

const restoreANote = (index) => {
  let archeived = localStorage.getItem("archeived");
  if (archeived === null) {
    archeived = [];
  } else {
    archeived = JSON.parse(archeived);
  }
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }
  notes.push(archeived[index]);

  archeived.splice(index, 1);
  localStorage.setItem("archeived", JSON.stringify(archeived));
  localStorage.setItem("notes", JSON.stringify(notes));
  showArcheivedNotes();
};

const showArcheivedNotes = () => {
  let messagehtml = "";
  let archeived = JSON.parse(localStorage.getItem("archeived"));
  if (archeived.length === 0) {
    messagehtml += ` <h1 class="text-3xl text-center font-bold mx-auto container  px-2 ">
        NO ARCHEIVED NOTES FOUND
      </h1>`;
    message.innerHTML = messagehtml;
  }

  let archeivedhtml = "";
  for (let i = 0; i < archeived.length; i++) {
    console.log(i);
    archeivedhtml += `
      <div class='w-[350px] min-h-[300px]  border-2 p-4  shadow-lg'  id="note-${i}">
      <h1 class='text-3xl text-center font-bold mx-auto container border px-2 '>${archeived[i].title}</h1>
      <p>
      ${archeived[i].body}
      </p>     
      <div class="mx-auto mt-8 flex items-center  justify-between ">
                <button class="px-8 py-4 bg-[#212529] text-white font-bold uppercase text-md rounded  " onClick="restoreANote(${i})" >Restore</button>
                   <button class="px-8 py-4 bg-[#212529] text-white font-bold uppercase text-md rounded  " onClick="deleteANote(${i})" >Delete</button>
            </div>  
      </div>   
       
    `;
  }

  archeivedContainer.innerHTML = archeivedhtml;
};

showArcheivedNotes();
