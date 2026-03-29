// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: false,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: false,
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
// select the dialog and form elements
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".add-btn");
const form = dialog.querySelector("form");
const inputField = form.querySelector("input[type='text']");

function renderTodoItems() {
  for (let todo of todoList) {
    // create elements
    const li = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const deleteButton = document.createElement("button");

    // setup input
    input.type = "checkbox";
    input.id = `todo-${todo.id}`;
    input.checked = todo.completed;

    // Add event listener to the checkbox
    input.addEventListener("change", function() {
      todo.completed = input.checked;
      console.log(`Task "${todo.task}" is now ${todo.completed ? "completed" : "not completed"}.`);
      console.log(todo.completed);
    });

    // setup label
    label.htmlFor = `todo-${todo.id}`;
    label.textContent = todo.task;

    // setup delete button
    deleteButton.id = `delete-${todo.id}`;
    deleteButton.textContent = "Delete";

    // Add event listener to the delete button
    deleteButton.addEventListener("click", function() {
      // Remove the todo item from the array
      const index = todoList.findIndex(item => item.id === todo.id);
      if (index !== -1) {
        todoList.splice(index, 1);
        console.log(`Task "${todo.task}" has been deleted.`);
        console.log(todoList);
      }
      // Remove the list item from the DOM
      todoListElement.removeChild(li);
    });

    // build structure
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(deleteButton);

    // add to ul
    todoListElement.appendChild(li);
  }

}

renderTodoItems();

function addNewTask(task) {
  // Generate a new ID
  const newId = todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1;

  const newTodo = {
    id: newId,
    task: task,
    completed: false
  };

  // Add to array
  todoList.push(newTodo);
  console.log(`Added new task: "${task}"`);
  console.log(todoList);

  // Create DOM elements for the new task (reuse your render code)
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const deleteButton = document.createElement("button");

  input.type = "checkbox";
  input.id = `todo-${newTodo.id}`;
  input.checked = newTodo.completed;

  input.addEventListener("change", function() {
    newTodo.completed = input.checked;
    console.log(`Task "${newTodo.task}" is now ${newTodo.completed ? "completed" : "not completed"}.`);
  });

  label.htmlFor = `todo-${newTodo.id}`;
  label.textContent = newTodo.task;

  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function() {
    const index = todoList.findIndex(item => item.id === newTodo.id);
    if (index !== -1) todoList.splice(index, 1);
    todoListElement.removeChild(li);
    console.log(`Deleted task: "${newTodo.task}"`);
    console.log(todoList);
  });

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(deleteButton);

  todoListElement.appendChild(li);
}

addBtn.addEventListener("click", () => {
  dialog.showModal();
  inputField.value = "";
  inputField.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTask = inputField.value.trim();
  if (newTask === "") return;
  addNewTask(newTask);
  dialog.close();
});


