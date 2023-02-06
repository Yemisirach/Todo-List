import "./style.css";
import clearCompleted from "./module/clearAll.js";

const addButton = document.getElementById("add");
const input = document.getElementById("todo");
const listContainer = document.getElementById("task-list");
const clearAll = document.getElementById("clearAll");
let newTodo = "";
let toDoList = [];

const handleCheckbox = (e) => {
  const index = Number(e.target.parentNode.getAttribute("id"));
  toDoList[index - 1].completed = !toDoList[index - 1].completed;
  localStorage.setItem("taskList", JSON.stringify(toDoList));
};
const deleteTask = (e) => {
  const task = e.target.parentNode.parentNode.parentNode;
  const li = task.querySelector("li");
  const taskList = document.getElementById("task-list");
  taskList.removeChild(task);
  toDoList.splice(Number(li.getAttribute("id") - 1), 1);
  toDoList.forEach((task, index) => {
    document.getElementById(task.index).setAttribute("id", index + 1);
    task.index = index + 1;
  });
  localStorage.setItem("taskList", JSON.stringify(toDoList));
};

const saveEditTask = (e) => {
  const li = e.target.parentNode.parentNode;
  const target = li.querySelector("#save");
  const input = li.querySelector('input[type="text"]');
  const text = input.value;
  const P = document.createElement("p");
  P.textContent = text;
  li.replaceChild(P, target);
  toDoList.filter((task) => task.index === Number(li.id))[0].name = text;
  localStorage.setItem("taskList", JSON.stringify(toDoList));
};

const editTask = (e) => {
  const task = e.target.parentNode.parentNode.parentNode;
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
  div.style.display = "flex";
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
  deleteButton.setAttribute("class", "uil uil-trash");
  deleteButton.addEventListener("click", deleteTask);
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "uil uil-pen");
  editButton.addEventListener("click", editTask);
  const menu = document.createElement("li");
  menu.setAttribute("class", "uil uil-ellipsis-v");
  const taskmenu = document.createElement("article");
  taskmenu.setAttribute("class", "menulist");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkbox.checked = completed;
  checkbox.addEventListener("change", handleCheckbox);
  const task = document.createElement("div");
  task.setAttribute("class", "task-menu");
  const li = document.createElement("li");
  li.setAttribute("id", toDoList.length);
  li.setAttribute("class", "list");
  const horizontal = document.createElement("hr");
  const p = document.createElement("p");

  p.textContent = name;
  li.appendChild(checkbox);
  li.appendChild(p);
  task.appendChild(li);
  taskmenu.appendChild(deleteButton);
  taskmenu.appendChild(editButton);
  task.appendChild(taskmenu);
  menu.appendChild(taskmenu);
  task.appendChild(menu);
  listContainer.appendChild(horizontal);
  listContainer.appendChild(task);
  input.value = "";
  newTodo = "";
  if (newTask) {
    localStorage.setItem("taskList", JSON.stringify(toDoList));
  }
};

input.addEventListener("input", (e) => {
  newTodo = e.target.value;
  console.log(newTodo);
});

addButton.addEventListener("click", () => handleAddTask(newTodo));

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleAddTask(newTodo);
});

clearAll.addEventListener("click", () => {
  const newLists = clearCompleted(toDoList);
  toDoList = [];
  localStorage.setItem("taskList", JSON.stringify(newLists));
  listContainer.innerHTML = "";
  newLists.forEach((task) => handleAddTask(task.name, task.completed, false));
});
document.addEventListener("DOMContentLoaded", () => {
  const initialList = localStorage.getItem("taskList")
    ? JSON.parse(localStorage.getItem("taskList"))
    : [];
  initialList.forEach((task) =>
    handleAddTask(task.name, task.completed, false)
  );
});
