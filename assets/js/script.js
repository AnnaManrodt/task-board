// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let toDoCard = $("#todo-cards");
let taskItem = '';
let taskCard = '';
// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
  let taskItem = JSON.parse(localStorage.getItem("taskCard"))
  console.log(taskItem);
  // taskItem.push(taskCard);
  for (let i = 0; i < taskItem.length; i++){
  let toDo = $("<div>")
  toDo.addClass('card');
  toDo.text(taskItem);
  toDoCard.append(toDo);}

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
createTaskCard();

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  // event.preventDefault()
let title = $("#titleInput").val();
let decs = $("#TaskDescInput").val();
let date = $("#taskDueDate").val();
let taskCard ={
  title: title,
  decs: decs,
  date: date
}
localStorage.setItem("taskCard", JSON.stringify(taskCard));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
$("#taskSubmit").on("click", function(event){
  handleAddTask(event);
})
renderTaskList();
});
