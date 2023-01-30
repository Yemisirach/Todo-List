const addButton = document.getElementById("add");
const input = document.getElementById("todo");
const listContainer = document.getElementById("task-list");
const clearAll = document.getElementById("clearAll");
let newTodo = "";
const toDoList = [];

const handleCheckbox = (e) => {
  index = Number(e.target.parentNode.getAttribute("id"));
  console.log(index);
  toDoList[index - 1].completed = !toDoList[index - 1].completed;
  console.log(toDoList);
  localStorage.setItem("taskList", JSON.stringify(toDoList));
};
const deleteTask = (e) => {
  console.log(toDoList);
  const task = e.target.parentNode;
  const li = task.querySelector("li");
  const taskList = document.getElementById("task-list");
  taskList.removeChild(task);
  console.log(Number(li.getAttribute("id")));
  toDoList.splice(Number(li.getAttribute("id") - 1), 1);
  toDoList.forEach((task, index) => {
    document.getElementById(task.index).setAttribute("id", index + 1);
    task.index = index + 1;
  });
  localStorage.setItem("taskList", JSON.stringify(toDoList));
  console.log(toDoList);
};

const saveEditTask = (e) => {
  const li = e.target.parentNode.parentNode;
  const target = li.querySelector("#save");
  const input = li.querySelector('input[type="text"]');
  const text = input.value;
  const P = document.createElement("p");
  P.textContent = text;
  console.log(li);
  li.replaceChild(P, target);
  toDoList.filter((task) => task.index === Number(li.id))[0].name = text;
  console.log(toDoList);
  localStorage.setItem("taskList", JSON.stringify(toDoList));
};

const editTask = (e) => {
  const task = e.target.parentNode;
  const p = task.querySelector("p");
  const li = task.querySelector("li");
  const text = p.textContent;
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = text;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveEditTask(e);
  });
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", saveEditTask);
  const div = document.createElement("div");
  div.setAttribute("id", "save");
  div.appendChild(input);
  div.appendChild(saveButton);
  li.replaceChild(div, p);
  localStorage.setItem("taskList", JSON.stringify(toDoList));
};

const handleAddTask = (name = "", completed = false, newTask = true) => {
  if (!name) return;
  const index = toDoList.length + 1;
  toDoList.push({ name, completed, index });
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", deleteTask);
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", editTask);
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = completed;
  checkbox.addEventListener("change", handleCheckbox);
  const task = document.createElement("div");
  const li = document.createElement("li");
  li.setAttribute("id", toDoList.length);
  const p = document.createElement("p");
  p.textContent = name;
  li.appendChild(checkbox);
  li.appendChild(p);
  task.appendChild(li);
  task.appendChild(deleteButton);
  task.appendChild(editButton);
  listContainer.appendChild(task);
  input.value = "";
  newTodo = "";
  if (newTask) {
    localStorage.setItem("taskList", JSON.stringify(toDoList));
  }
};

// this is were the java script code sarts to execute

input.addEventListener("input", (e) => {
  newTodo = e.target.value;
});

addButton.addEventListener("click", (e) => handleAddTask(newTodo));

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleAddTask(newTodo);
});

clearAll.addEventListener("click", (e) => {
  localStorage.setItem("taskList", JSON.stringify([]));
  listContainer.innerHTML = "";
});
document.addEventListener("DOMContentLoaded", () => {
  const initialList = localStorage.getItem("taskList")
    ? JSON.parse(localStorage.getItem("taskList"))
    : [];
  initialList.forEach((task) =>
    handleAddTask(task.name, task.completed, false)
  );
});
