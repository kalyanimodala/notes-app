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

        let deleteBtn=document.createElement("button");
        deleteBtn.textContent="Delete";

        deleteBtn.addEventListener("click",function() {
            notes.splice(i,1);
            saveNotes();
            displayNotes();
        });
        li.appendChild(deleteBtn);
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
