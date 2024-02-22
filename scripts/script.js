// Class to create the new task objects
class Task {
  constructor(id, title, description, priority, dueDate, status = "todo") {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = new Date(dueDate);
    this.status = status;
  }
}

// Function to add task
function addTask(title, description, priority, dueDate) {
  const newId = crypto.randomUUID();
  const newTask = new Task(
    newId,
    title,
    description,
    priority,
    dueDate,
    "todo"
  );
  todoList.push(newTask);
}

// Event listener to show form when clicked
document.querySelectorAll(".show-form").forEach(function (button) {
  button.addEventListener("click", function () {
    this.nextElementSibling.style.display = "block";
    this.style.display = "none";
  });
});

// Event listener to add task on form submit
document.querySelectorAll(".task-form").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = this.querySelector(".title").value;
    const description = this.querySelector(".description").value;
    const priority = this.querySelector(".priority").value;
    const dueDate = this.querySelector(".dueDate").value;

    addTask(title, description, priority, dueDate);

    this.reset();

    this.style.display = "none";
    this.previousElementSibling.style.display = "block";

    displayTasks(todoList, doneList);
  });
});

// Lists that contain all the tasks
let todoList = [];
let doneList = [];

// Tests start
addTask("Køb ind", "Føtex har tilbud på underhyler", "High", "2023-12-31");
console.log("This is the todo list", todoList);

const doneTask = new Task(
  crypto.randomUUID(),
  "Færdiggør projekt",
  "Aflever Todo APP kl. 23:59",
  "Low",
  "2024-02-22",
  "done"
);
doneList.push(doneTask);
console.log("This is the done list", doneList);
// Tests end

// Function to create task template
function taskTemplate(task) {
  return `
      <div class="task">
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          ${task.priority ? `<p>Priority: ${task.priority}</p>` : ""}
          ${
            task.dueDate && !isNaN(task.dueDate)
              ? `<p>Deadline: ${task.dueDate.toLocaleDateString("en-GB")}</p>`
              : ""
          }
          ${
            task.status === "todo"
              ? `<button class="button done" onclick="moveToDone('${task.id}')"><svg width="30px" height="30px" viewBox="2 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7" stroke="#b6c2cf" stroke-linecap="round" stroke-linejoin="round"/>
              </svg></button>`
              : `<button class="button not-done" onclick="moveToTodo('${task.id}')"><svg width="30px" height="30px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 21.4199H9C7.14348 21.4199 5.36302 20.6824 4.05026 19.3696C2.73751 18.0569 2 16.2764 2 14.4199C2 12.5634 2.73751 10.783 4.05026 9.47021C5.36302 8.15746 7.14348 7.41992 9 7.41992H22" stroke="#b6c2cf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18 11.4199L22 7.41992L18 3.41992" stroke="#b6c2cf" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg></button>`
          }
          <button class="button delete" onclick="deleteTask('${
            task.id
          }')"><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99997 8H6.5M6.5 8V18C6.5 19.1046 7.39543 20 8.5 20H15.5C16.6046 20 17.5 19.1046 17.5 18V8M6.5 8H17.5M17.5 8H19M9 5H15M9.99997 11.5V16.5M14 11.5V16.5" stroke="#b6c2cf" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    `;
}

// Function to move task to Done
function moveToDone(taskId) {
  let taskIndex = todoList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    let task = todoList[taskIndex];
    task.status = "done";
    todoList.splice(taskIndex, 1);
    doneList.push(task);
  }
  console.log(taskId + " has been moved to the done list");

  displayTasks(todoList, doneList);
}

// Function to move task to To Do
function moveToTodo(taskId) {
  let taskIndex = doneList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    let task = doneList[taskIndex];
    task.status = "todo";
    doneList.splice(taskIndex, 1);
    todoList.push(task);
  }
  console.log(taskId + " has been moved back to the to do list");

  displayTasks(todoList, doneList);
}

// Function to delete task
function deleteTask(taskId) {
  let taskIndex = todoList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    todoList.splice(taskIndex, 1);
    console.log(taskId + " has been deleted from the todo list");
  } else {
    taskIndex = doneList.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      doneList.splice(taskIndex, 1);
    }
    console.log(taskId + " has been deleted from the done list");
  }
  displayTasks(todoList, doneList);
}

// Function to display the tasks
function displayTasks(todoTasks, doneTasks) {
  let todoContainer = document.querySelector(
    ".todolist-container .tasks-container"
  );
  let doneContainer = document.querySelector(
    ".donelist-container .tasks-container"
  );

  todoContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  todoTasks.forEach(function (task) {
    todoContainer.innerHTML += taskTemplate(task);
  });

  doneTasks.forEach(function (task) {
    doneContainer.innerHTML += taskTemplate(task);
  });
}

displayTasks(todoList, doneList);
