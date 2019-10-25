// Select needed DOM elements
const draggables = document.getElementsByClassName("draggable");
const answerBox = document.getElementById("answerBox");
const answerString = document.getElementById("answerString");

// Add event listeners
for (let i = 0; i < draggables.length; i++){
  draggables[i].addEventListener("dragstart", onDragStart);
  draggables[i].setAttribute('draggable', true);
}
answerBox.addEventListener("dragover", onDragOver);
answerBox.addEventListener("drop", onAnswerDrop);

// Store info of dragged element 
function onDragStart(e){
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
  e.preventDefault();
}

// When object dragged into an answer container 
function onAnswerDrop(e) {
  // Get id of dragged object
  const id = e.dataTransfer.getData('text');

  const draggedElement = document.getElementById(id);
  console.log(draggedElement.id);

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
    console.log(target.id);
    target.classList.add("active");
    target.addEventListener("dragstart", onDragStart);
      if (target.classList.contains("container")){
        innerBoxes = target.children;
        for (let i = 0; i < target.children.length; i++){
          innerBoxes[i].addEventListener("dragover", onDragOver);
          innerBoxes[i].addEventListener("drop", onAnswerDrop);
        }
      }
  }

  e.dataTransfer.clearData();

  updateString();
}

function onBoxDrop(e) {
  console.log("Dropped in inner");

  event
    .dataTransfer
    .clearData();

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
