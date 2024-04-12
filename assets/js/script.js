// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let toDoCard = $("#todo-cards");
let inProgressCard = $("#in-progress");
let doneCard =$("#done-cards");
let taskItem = '';
let taskCard = {};
let taskArray = [];


function getFromStorage(){
  taskArray = JSON.parse(localStorage.getItem("tasks")) || []
  renderAllCards()
}

//closes the modal
$('#close').on('click', function() {
  $('.modal').hide(); 
});

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

function renderAllCards(){
  const toDo = $('#todo-cards');
  toDo.empty();
  for( let i = 0; i < taskArray.length; i++ ){
    const taskItem = taskArray[i]
    // createTaskCard(taskItem).appendTo(toDo);
    createTaskCard(taskItem)
  }
}

// Todo: create a function to create a task card
function createTaskCard(taskItem) {
  console.log(taskItem);
    //for (let i = 0; i < taskItem.length; i++){
    let toDo = $("<div>")
    toDo.addClass('card project-card draggable my-3');
    toDo.addClass('drag');
    toDo.attr('draggable', 'true');
// const cardTitle = $('<div>').addClass('card-header h4').text(taskItem.title);
// const cardBody = $("<div>").addClass('card-body');
// const cardDecs = $("<p>").addClass('card-text').text(taskItem.decs);
// const cardDueDate = $('<p>').addClass('card-text').text(taskItem.date);
let button = $('<button>');
button.addClass("btn btn-outline-danger btn-sm delete");
button.text('delete');
button.attr('data-project-id', taskItem.id);
console.log(toDo)
toDo.append(button);
// Deletebutton.on('click', handleDeleteTask())
//this 

    ondragstart='exampleDrag(event)';
    let text = $("<p>")

    text.text(`title: ${taskItem.title}, 
      task description: ${taskItem.decs},
      due date: ${taskItem.date}`);
      toDo.append(text);
    toDoCard.append(toDo);
    return taskItem
//lines 58-66 works but but doesnt look right

    /*if (taskItem //is in to do){
change task itme color to red green
 }
 else if (taskItem //is in in progress){
change task item background color to 
}
else task color should eb blue */


  }

//   let test = $("#test");
//   let button = $("<button>");
//   button.addClass("btn btn-danger");
//   test.append(button);
// // Todo: create a function to render the task list and make cards draggable

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  // event.preventDefault()
  let title = $("#titleInput").val();
  let decs = $("#TaskDescInput").val();
  let date = $("#taskDueDate").val();
  // let button = 
  let taskCard ={
    title: title,
    decs: decs,
    date: date,
  }

  taskArray.push(taskCard);
  updateState();
  renderAllCards();
}

function deletCard (){
  function deleteCard(button) {
    // Get the parent element (card) of the clicked button
    var card = button.parentNode;
    // Remove the card from the card container
    card.parentNode.removeChild(card);}

}


function updateState() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const projectId = $(this).attr('data-project-id');
  const projects = getFromStorage(); 
  projects.forEach((project) => {
    if (project.id === projectId) {
      projects.splice(projects.indexOf(project), 1);
    }
  });
  getFromStorage(taskItem)
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
$("#taskSubmit").on("click", function(event){
  handleAddTask(event);
})
// renderTaskList();
});



// Initialize an empty object to store user input
let userInputObject = {};

// Listen for input events on input fields
$('input').on('input', function() {
    // Update the userInputObject with the new input
    let inputKey = $(this).attr('name'); // Assuming the input field has a name attribute
    let inputValue = $(this).val();
    
    userInputObject[inputKey] = inputValue;

    // Save the updated object to local storage
    localStorage.setItem('userInputData', JSON.stringify(userInputObject));
    updateState();
});

getFromStorage();



///drag and drop 
// function exampleDrag(e){
//   const id = e.target.getAttribute("drag")
//   e.dataTransfer.setData('text/plain', id)
// }

function exampleDrop(e){
  e.preventDefault()
  const data = e.dataTransfer.getData('text/plain')
  console.log(data)
}

function exampleDropOver(e){
  e.preventDefault()
}
//this works but only for one item in one place and it doesnt put the text i need back into it 
$(document).ready(function() {
  $('.drag').on('dragstart', function(e) {
    e.originalEvent.dataTransfer.setData('text/plain', 'draggedItem');
  });

  $('#todo-cards').on('dragover', function(e){
    e.preventDefault();
  })
$('#todo-cards').on('drop', function(e){
  e.preventDefault();
  var data = e.originalEvent.dataTransfer.getData('text/plain');
  if (data === "draggedItem"){
    $(this).text("work");
  }
})

//   $('#done-cards').on('dragover', function(e){
//     e.preventDefault();
//   })

//   $('#done-cards').on('drop', function(e){
//     e.preventDefault();
//     var data = e.originalEvent.dataTransfer.getData('text/plain');
//     if (data === "draggedItem"){
//       $(this).text("work");
//     }
//   })

//   $('#in-progress').on('dragover', function(e) {
//     e.preventDefault();
//   });

//   $('#in-progress').on('drop', function(e) {
//     e.preventDefault();
//     var data = e.originalEvent.dataTransfer.getData('text/plain');
//     if (data === 'draggedItem') {
//       $(this).text("worked");
//     }
//   });
// });


// $().ready(function() {
//   $('.drag').on('dragstart', function(e) {
//     e.originalEvent.dataTransfer.setData('text/plain', 'draggedItem');
//   });
//   $('#done-cards').on('dragover', function(e){
//     e.preventDefault();
//   })

//   $('#done-cards').on('drop', function(e){
//     e.preventDefault();
//     var data = e.originalEvent.dataTransfer.getData('text/plain');
//     if (data === "draggedItem"){
//       $(this).text("work");
//     }
//   })
});