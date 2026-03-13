let input=document.getElementById("noteInput");
let button=document.getElementById("addBtn");
let clearBtn=document.getElementById("clearBtn");
let list=document.getElementById("noteList");
let notes=[];
button.addEventListener("click",function() {
    let note=input.value;
    if(note === "") return;
    notes.push(note);
    displayNotes();
    saveNotes();
    input.value="";
});
input.addEventListener("keydown",function(event) {
    if(event.key === "Enter") {
        button.click();
    }
});
function displayNotes() {
    list.innerHTML="";
    for(let i=0;i<notes.length;i++) {
        let li=document.createElement("li");
        li.textContent=notes[i];

        let buttonGroup=document.createElement("div");

        let editBtn=document.createElement("button");
        editBtn.textContent="Edit";
        editBtn.className="edit-btn";

        editBtn.addEventListener("click",function() {
            let updatedNote=prompt("Edit your note:",notes[i]);
            if(updatedNote!==null) {
                notes[i]=updatedNote;
                saveNotes()
                displayNotes()
            }
        });
        let deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click",function() {
            notes.splice(i,1);
            saveNotes();
            displayNotes();
        });
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(buttonGroup);
        list.appendChild(li);
    }
}


function saveNotes() {
    localStorage.setItem("notes",JSON.stringify(notes));
}
let savedNotes = 
JSON.parse(localStorage.getItem("notes"));

if(savedNotes) {
    notes = savedNotes;
    displayNotes();
}
clearBtn.addEventListener("click",function() {
    notes=[];
    saveNotes();
    displayNotes();
});
