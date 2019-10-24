const draggables = document.getElementsByClassName("draggable");
const dropzone = document.getElementById("dropzone");

for (let i = 0; i < draggables.length; i++){
  console.log("added event listener");
  draggables[i].addEventListener("dragstart", onDragStart);
}

dropzone.addEventListener("dragover", onDragOver);
dropzone.addEventListener("drop", onDrop);

function onDragStart(e){
  console.log("dragged");
  e
    .dataTransfer
    .setData('text/plain', e.target.id);
  e
    .currentTarget
    .style
    .backgroundColor = 'yellow';
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
  const dropzone = event.target;

  dropzone.appendChild(draggableElement);

  event
    .dataTransfer
    .clearData();
}
