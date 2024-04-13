// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));
let toDoCard = $("#todo-cards");
let inProgressCard = $("#in-progress-card");
let doneCard = $("#done-cards");
// let taskItem = '';
// let taskCard = {};
let form = $("#formModal");
let lanes = $(".swim-lanes")
// let taskArray = [];


function getFromStorage() {
  let taskArray = JSON.parse(localStorage.getItem("tasks")) || []
  return taskArray
}

function setLocalStorage(taskArray) {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

//closes the modal
$('#close').on('click', function () {
  $('.modal').hide();
});

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

function renderAllCards() {
  const toDo = $('#todo-cards');
  const taskArray = getFromStorage();
  toDo.empty();
  inProgressCard = $("#in-progress-cards");
  inProgressCard.empty();
  doneCard = $("#done-cards");
  doneCard.empty();
  for (let task of taskArray) {
    if (task.status == "to-do") {
      createTaskCard(task).appendTo(toDo);
    }
    else if (task.status == "in-progress") {
      createTaskCard(task).appendTo(inProgressCard);
    }
    else if (task.status == "done") {
      createTaskCard(task).appendTo(doneCard);
    }
    // const taskItem = taskArray[i]
    // // createTaskCard(taskItem).appendTo(toDo);
    // createTaskCard(taskItem)
  }
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    }
  });
}

// Todo: create a function to create a task card
function createTaskCard(taskItem) {
  // console.log(taskItem);
  //for (let i = 0; i < taskItem.length; i++){
  let toDo = $("<div>")
  toDo.addClass('card project-card draggable my-3');
  // toDo.addClass('drag');
  toDo.attr("data-project-id", taskItem.id)
  // toDo.attr('draggable', 'true');
  const cardTitle = $('<div>').addClass('card-header h4').text(taskItem.title);
  const cardBody = $("<div>").addClass('card-body');
  const cardDecs = $("<p>").addClass('card-text').text(taskItem.decs);
  const cardDueDate = $('<p>').addClass('card-text').text(taskItem.date);

  // $('.delete').on('click', function(){
  //   var card = button.parentNode;
  //   // Remove the card from the card container
  //   card.parentNode.removeChild(card);})

  cardBody.append(cardDecs);
  cardBody.append(cardDueDate);
  toDo.append(cardTitle);
  toDo.append(cardBody);
  let button = $('<button>');
  button.addClass("btn btn-outline-danger btn-sm delete");
  button.text('delete');
  button.attr('data-project-id', taskItem.id);
  // console.log(toDo)
  cardBody.append(button);

  if (taskItem.date && taskItem.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(taskItem.date, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
    toDo.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
   toDo.addClass('bg-danger text-white');
      button.addClass('border-light');
    }
  }
return toDo
}

//   let test = $("#test");
//   let button = $("<button>");
//   button.addClass("btn btn-danger");
//   test.append(button);
// // Todo: create a function to render the task list and make cards draggable

// Todo: create a function to handle adding a new task
function handleAddTask() {
  // event.preventDefault()
  let title = $("#titleInput").val();
  let decs = $("#TaskDescInput").val();
  let date = $("#taskDueDate").val();
  // let button = 
  let taskCard = {
    title: title,
    decs: decs,
    date: date,
    id: crypto.randomUUID(),
    status: "to-do"
  }
const taskArray = getFromStorage();

  taskArray.push(taskCard);
  setLocalStorage(taskArray);
  renderAllCards();

  $("#titleInput").val("");
  $("#TaskDescInput").val("");
  $("#taskDueDate").val("");
}


// deleteButtons.forEach(function(button) {
//     button.addEventListener('click', function() {
//         deleteCard(this); // Call deleteCard function with the clicked button as an argument
//     });
// });

// function deleteCard(button) {
//   $('.delete').on('click', function () {
//     var card = button.parentNode;
//     // Remove the card from the card container
//     card.parentNode.removeChild(card);
//   })
// };



// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const projectId = $(this).attr('data-project-id');
  const projects = getFromStorage();
  projects.forEach((project, i) => {
    if (project.id === projectId) {
      projects.splice(i, 1);
    }
  });
  setLocalStorage(projects);
  renderAllCards();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const projects = getFromStorage();
  const taskId = ui.draggable[0].dataset.projectId;
  const newStatus = event.target.id;

  for (let project of projects) {
    if (project.id === taskId) {
      project.status = newStatus;
    }
  }

setLocalStorage(projects);
  renderAllCards();
}

lanes.on("click", ".delete", handleDeleteTask);

form.on("click", "#taskSubmit", function(e){
  e.preventDefault();
  handleAddTask(),
  form.modal("hide");
})

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderAllCards();

  $('#taskDueDate').datepicker({
  changeMonth: true,
  changeYear: true,
});

// ? Make lanes droppable
$('.lane').droppable({
  accept: '.draggable',
  drop: handleDrop,
});
console.log("works?")
  // renderTaskList();
});