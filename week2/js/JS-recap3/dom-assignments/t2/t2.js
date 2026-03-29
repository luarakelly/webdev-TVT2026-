// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here

// select the ul element
const todoListElement = document.querySelector("ul");

function addTodoItems() {
  for (let todo of todoList) {

    // create elements
    const li = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");

    // setup input
    input.type = "checkbox";
    input.id = `todo-${todo.id}`;
    input.checked = todo.completed;

    // setup label
    label.htmlFor = `todo-${todo.id}`; // IMPORTANT
    label.textContent = todo.task;

    // build structure
    li.appendChild(input);
    li.appendChild(label);

    // add to ul
    todoListElement.appendChild(li);
  }
}

addTodoItems();
