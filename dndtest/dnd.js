// Select needed DOM elements
const draggables = document.getElementsByClassName("draggable");
const solution = document.getElementById("solution");
let solutionString = document.getElementById("solutionString");

// Add event listeners
for (let i = 0; i < draggables.length; i++){
  console.log("added event listener");
  draggables[i].addEventListener("dragstart", onDragStart);
  draggables[i].setAttribute('draggable', true);
}

solution.addEventListener("dragover", onDragOver);
solution.addEventListener("drop", onDrop);

// Set up element to be dragged
function onDragStart(e){
  console.log("dragged");
  e
    .dataTransfer
    .setData('text/plain', e.target.id);
  e
    .dataTransfer
    .effectAllowed = 'copy';
}

function onDragOver(e){
  console.log("dragged");
  e.preventDefault();
}

function onDrop(e) {
  console.log("dropped");
  const id = e
    .dataTransfer
    .getData('text');

  const draggableElement = document.getElementById(id);
  const copy = draggableElement.cloneNode(true);
  const solution = event.target;

  solution.appendChild(copy);

  event
    .dataTransfer
    .clearData();

  updateString();
}

function updateString(){
  const children = solution.children;
  console.log(children.length);
  let answer = "";

  for (let i = 0; i < children.length; i++){
    console.log(i)
    answer = answer.concat(children[i].innerText);
    console.log(children[i].innerText);
    console.log(answer);
  }

  solutionString.innerText = answer;
}
