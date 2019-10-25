// Select needed DOM elements
const draggables = document.getElementsByClassName("draggable");
const answerBox = document.getElementById("answerBox");
const answerString = document.getElementById("answerString");
const statement = document.getElementById("statement");
const statementEventTable = document.getElementById("statementEvents");

// Add event listeners
for (let i = 0; i < draggables.length; i++){
  draggables[i].addEventListener("dragstart", onDragStart);
  draggables[i].setAttribute('draggable', true);
}
answerBox.addEventListener("dragover", onDragOver);
answerBox.addEventListener("drop", onAnswerDrop);

let statementEventSymbols = [];
let statementEventEnglish = [];
let questionStatement = "";

// Get question from server, requires server call
questionStatement = questionStatement.concat("Quincy, who studies hard, also will pass, unless Sidney will fail to pass only on the condition that he fails to study hard.")
statementEventSymbols.push("U", "Q", "S", "X");
statementEventEnglish.push("Quincy studies hard", "Quincy will pass", "Sidney will pass", "Sidney studies hard");

// Display question
statement.innerText = questionStatement;

// Add statement event buttons
for (let i = 0; i < statementEventSymbols.length; i++){
  // create row
  let newRow = document.createElement("tr");

  // create symbol data cell
  newRow.appendChild(document.createElement("td"));

  // create draggable
  newButton = document.createElement("div");
  newButton.classList.add("draggable");
  newButton.addEventListener("dragstart", onDragStart);
  newButton.setAttribute('draggable', true);
  newButton.innerText = statementEventSymbols[i];
  newButton.id = statementEventSymbols[i];

  // add button to symbol data cell 
  newRow.children[0].appendChild(newButton);

  // add english cell
  newRow.appendChild(document.createElement("td"));
  newRow.children[1].innerText  = statementEventEnglish[i];

  // add row to table
  statementEventTable.appendChild(newRow);
}

// Store info of dragged element 
function onDragStart(e){
  console.log(e.target.id);
  e.dataTransfer.setData('text/plain', e.target.id);
  // If menu object, copy, else move
  if (e.target.classList.contains("active")){
    e.dataTransfer.effectAllowed = 'move';
  }
  else {
    e.dataTransfer.effectAllowed = 'copy';
  }
}

function onDragOver(e){
  console.log("over");
  e.preventDefault();
}

// When object dragged into an answer container 
function onAnswerDrop(e) {
  // Get id of dragged object
  const id = e.dataTransfer.getData('text');

  const draggedElement = document.getElementById(id);
  console.log(draggedElement.id);
  console.log(e.target.id);

  let target = draggedElement;
  // If menu object, copy, else move
  if (target.classList.contains("active")) {
    answerBox.appendChild(target);
    target.addEventListener("dragstart", onDragStart);
  }

  else {
    target = draggedElement.cloneNode(true);
    // get collection of all elements with same id
    const sameId = document.getElementsByClassName(id);
    target.id = target.id.concat(sameId.length.toString());
    e.target.appendChild(target);
    target.classList.add("active");
    target.addEventListener("dragstart", onDragStart);
      if (target.classList.contains("container")){
        innerBoxes = target.children;
        for (let i = 0; i < target.children.length; i++){
          console.log("one box activated")
          innerBoxes[i].addEventListener("dragover", onDragOver);
          innerBoxes[i].addEventListener("drop", onAnswerDrop);
        }
      }
  }

  e.dataTransfer.clearData();

  updateString();
}

function updateString(){
  const children = answerBox.children;
  let answer = "";

  for (let i = 0; i < children.length; i++){
    answer = answer.concat(children[i].innerText);
  }

  answerString.innerText = answer;
}
