// Selectors for grabbing every things button, input, list
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list"); 
const filterOption = document.querySelector(".filter-todo");

// Event lisenters
document.addEventListener("DOMcontentLoaded", getTodos()); // check if the page is loaded then call getTodo function
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(e) {
    //prevent from submetting
    e.preventDefault();

    //ToDo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; 
    newTodo.classList.add("todo-item"); //for css styling
    todoDiv.appendChild(newTodo); // stick list into Div
    // Add ToDo to local storage
    saveLocalTodos(todoInput.value);
    // Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class = 'fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Delete Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class = 'fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append list to div
    todoList.appendChild(todoDiv); 
    // Add todo to the local storage
    //saveLocalTodos(todoInput.value);
    // Clearing the input after hitting submit button
    todoInput.value = "";

}

function deleteCheck (e) {
   // console.log(e.target); // To see what's being clicked
   const item = e.target;
   
   // Delete item
   if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function() {
    todo.remove();
    });
   }
   
      // Check todo 
      if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed"); // switching case of todo from uncompleted to completed
    }      
}

// Filter function
function filterTodo (e) {
    // Grab all todos
    const todos = todoList.childNodes;

    // Loop through todos and check every todo status then display it
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed" :
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// Store todos in local storage
function saveLocalTodos(todo) {
    // Check if something is already there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Delete waht's located in local storage
function getTodos() {
    
    // Check if something is already there
    let todos;
    if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos")); // Get content back
    }
    // Loop over the lists 
    todos.forEach(function(todo){
        //ToDo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; 
    newTodo.classList.add("todo-item"); //for css styling
    todoDiv.appendChild(newTodo); // stick list into Div
       
    // Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class = 'fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Delete Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class = 'fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append list to div
    todoList.appendChild(todoDiv); 
    })
    
}

// Removing list content upon refresh
function removeLocalTodos (todo){
    // Check if something is already there
    let todos;
    if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos")); // Get content back
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    // Set the result of removing stuff back into local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}