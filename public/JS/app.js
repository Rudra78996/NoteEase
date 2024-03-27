let add = document.querySelector("span");
let container = document.querySelector(".container");
let body = document.querySelector("body");
add.addEventListener("click", ()=>{
    createTask();
});
function createTask(){
    let newNote = document.createElement("div");
    newNote.classList.add("newNote");
    let h2 = document.createElement("h1");
    h2.innerText = "New Note"
    let textarea = document.createElement("textarea");
    textarea.setAttribute("rows","6");
    textarea.setAttribute("cols","40");
    textarea.setAttribute("placeholder","enter your note ..");
    let createBtn = document.createElement("button");
    createBtn.innerText="Create Note";
    createBtn.classList.add("custom-btn");
    let closeBtn = document.createElement("button");
    closeBtn.innerText="Close"
    closeBtn.classList.add("close-btn");
    closeBtn.classList.add("btn","btn-secondary");
    closeBtn.classList.add("btn","btn-primary");
    newNote.append(h2, textarea, createBtn, closeBtn);
    body.append(newNote);
    createBtn.addEventListener("click", ()=>{
        let content = textarea.value;
        textarea.value="";
        body.removeChild(newNote);
        saveNote(content);
        screenNote(content);
    })
    closeBtn.addEventListener("click", ()=>{
        body.removeChild(newNote);
    });
}
function screenNote(content){
        let note = document.createElement("div");
        note.classList.add("task");
        let upperNote = document.createElement("div");
        let para = document.createElement("p");
        upperNote.appendChild(para);
        para.innerText=content;
        
        upperNote.classList.add("upperNote");
        note.appendChild(upperNote);
        
        let editButton = document.createElement("button");
        editButton.classList.add("custom-btn");
        editButton.setAttribute("id","editButton");
        editButton.innerHTML='<span class="material-symbols-outlined edit">edit</span>'

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("custom-btn")
        deleteButton.setAttribute("id","deleteButton");
        deleteButton.innerHTML='<span class="material-symbols-outlined delete">delete</span>'
        
        let footer = document.createElement("div");
        footer.classList.add("footer");
        footer.appendChild(editButton);
        footer.appendChild(deleteButton);
        
        note.appendChild(footer);
        
        container.appendChild(note);
        deleteButton.addEventListener("click", (el)=>{
            deleteNote(content);
            container.removeChild(note);
        });
        editButton.addEventListener("click", ()=>{
            let edit = document.createElement("div");
            edit.classList.add("newNote");

            let h2 = document.createElement("h1");
            h2.innerText = "Edit Note";

            let textarea = document.createElement("textarea");
            textarea.setAttribute("rows","6");
            textarea.setAttribute("cols","40");
            textarea.value=para.innerText;

            let saveBtn = document.createElement("button");
            saveBtn.innerText="Save";
            saveBtn.classList.add("custom-btn");

            let closeBtn = document.createElement("button");
            closeBtn.innerText="Close";
            closeBtn.classList.add("close-btn");
            closeBtn.classList.add("btn","btn-secondary");
            closeBtn.classList.add("btn","btn-primary");

            edit.append(h2, textarea, saveBtn, closeBtn);
            body.append(edit);

            saveBtn.addEventListener("click", ()=>{
                let editedContent = textarea.value; 
                body.removeChild(edit);
                deleteNote(para.innerText);
                saveNote(editedContent);
                para.innerText = editedContent;
            });
            closeBtn.addEventListener("click", ()=>{
                body.removeChild(edit);
            });
        });  
    };

async function getNotes(){
   try{
    const response = await axios.get("http://localhost:8080/data");
    for(let note of response.data){
        screenNote(note["notes"]);
    }
   } catch(e){
    console.log(e);
   }
} 
getNotes();

function saveNote(data){
    axios.post("http://localhost:8080/data", {
      note: data,
    })
    .then((response) => {
      console.log(response);
    })
    .catch(error=>{
        // console.log(error);
    });
}
function deleteNote(data){
    axios.post("http://localhost:8080/delete", {
        note: data
    })
    .then((response) => {
        // console.log(response);
    })
    .catch(error=>{
        // console.log(error);
    });
}

