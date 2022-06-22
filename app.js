// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.getElementById("#todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); //this checks if the document loads up then run the function
//todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("onChange", filterTodo);

//Functions

//function to add todo items when the add todo button is clicked
function addTodo() {

  //Create List item (li)
  const newTodo = document.createElement("li");
  newTodo.setAttribute("id", "todo");
  newTodo.classList.add("list-group-item"); //adding the class to the li to add the bootstrap styling

  //another div for the input and buttons within the list item
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("input-group", "d-flex");

  //adding the text inputted by the user as a new list item
  const todoItem = document.createElement("p");
  todoItem.classList.add("p-2", "flex-grow-1");
  todoItem.innerText = todoInput.value;
  todoDiv.appendChild(todoItem);

  //save todo to local storage
  saveLocalTodo(todoInput.value);

  //completed checkbox button
  const completedButton = document.createElement("input");
  completedButton.classList.add("completeCheck", "form-check-input");
  completedButton.setAttribute("type", "checkbox");
  completedButton.setAttribute("value", " ");
  todoDiv.appendChild(completedButton); //adding the button to the div

  //delete button
  const deleteButton = document.createElement("i");
  deleteButton.classList.add("bi", "bi-trash", "btnDel", "p-2");
  todoDiv.appendChild(deleteButton);

  //appending the todoDiv to the list item created
  newTodo.appendChild(todoDiv);
  //appending the list item to the ul
  todoList.appendChild(newTodo);

  //clear todoInput value
  todoInput.value = "";
}

//function to delete or check todo item
function deleteCheck(e) {
  const item = e.target; //whatever is being clicked on

  //Delete todo
  if (item.classList[0] === "bi") {
    const todo = item.parentElement.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodo(todo);
    //remove the todo after the animation completes
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  

  //complete todo
  if (item.classList[0] === "completeCheck") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  }
  
}

//function for filter
function filterTodo() {

  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    if (!todo.style) return;
    switch (document.getElementById("todoFilterSelect").value) {
      case "all":
        todo.style.display = "block";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "block";
          } else {
            todo.style.display = "none";
        }
        break;
    }
  });
}

//function to save todos in local storage
function saveLocalTodo(todo) {
  let todos=[];
  //check if there is already a todo in the local storage
  if (localStorage.getItem("todos") !== null) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//function to be able to see the todos saves in the local storage on the page itself so that they can be edited
function getTodos() {
  let todos =[];
  //check if there is already a todo in the local storage
  if (localStorage.getItem("todos") !== null)  {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create List item (li)
  const newTodo = document.createElement("li");
  newTodo.setAttribute("id", "todo");
  newTodo.classList.add("list-group-item"); //adding the class to the li to add the bootstrap styling

  //another div for the input and buttons within the list item
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("input-group", "d-flex");

  //adding the text inputted by the user as a new list item
  const todoItem = document.createElement("p");
  todoItem.classList.add("p-2", "flex-grow-1");
  todoItem.innerText = todo;
  todoDiv.appendChild(todoItem);

  //completed checkbox button
  const completedButton = document.createElement("input");
  completedButton.classList.add("completeCheck", "form-check-input");
  completedButton.setAttribute("type", "checkbox");
  completedButton.setAttribute("value", " ");
  todoDiv.appendChild(completedButton); //adding the button to the div

  //delete button
  const deleteButton = document.createElement("i");
  deleteButton.classList.add("bi", "bi-trash", "btnDel", "p-2");
  todoDiv.appendChild(deleteButton);

  //appending the todoDiv to the list item created
  newTodo.appendChild(todoDiv);
  //appending the list item to the ul
  todoList.appendChild(newTodo);
  });
}

//function to remove todo items from local storage when user deleted them
function removeLocalTodo(todo) {
  let todos;
  //check if there is already a todo in the local storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
