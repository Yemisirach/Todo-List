/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const addButton = document.getElementById(\"add\");\r\nconst input = document.getElementById(\"todo\");\r\nconst listContainer = document.getElementById(\"task-list\");\r\nconst clearAll = document.getElementById(\"clearAll\");\r\nlet newTodo = \"\";\r\nconst toDoList = [];\r\n\r\nconst handleCheckbox = (e) => {\r\n  index = Number(e.target.parentNode.getAttribute(\"id\"));\r\n  console.log(index);\r\n  toDoList[index - 1].completed = !toDoList[index - 1].completed;\r\n  console.log(toDoList);\r\n  localStorage.setItem(\"taskList\", JSON.stringify(toDoList));\r\n};\r\nconst deleteTask = (e) => {\r\n  console.log(toDoList);\r\n  const task = e.target.parentNode;\r\n  const li = task.querySelector(\"li\");\r\n  const taskList = document.getElementById(\"task-list\");\r\n  taskList.removeChild(task);\r\n  console.log(Number(li.getAttribute(\"id\")));\r\n  toDoList.splice(Number(li.getAttribute(\"id\") - 1), 1);\r\n  toDoList.forEach((task, index) => {\r\n    document.getElementById(task.index).setAttribute(\"id\", index + 1);\r\n    task.index = index + 1;\r\n  });\r\n  localStorage.setItem(\"taskList\", JSON.stringify(toDoList));\r\n  console.log(toDoList);\r\n};\r\n\r\nconst saveEditTask = (e) => {\r\n  const li = e.target.parentNode.parentNode;\r\n  const target = li.querySelector(\"#save\");\r\n  const input = li.querySelector('input[type=\"text\"]');\r\n  const text = input.value;\r\n  const P = document.createElement(\"p\");\r\n  P.textContent = text;\r\n  console.log(li);\r\n  li.replaceChild(P, target);\r\n  toDoList.filter((task) => task.index === Number(li.id))[0].name = text;\r\n  console.log(toDoList);\r\n  localStorage.setItem(\"taskList\", JSON.stringify(toDoList));\r\n};\r\n\r\nconst editTask = (e) => {\r\n  const task = e.target.parentNode;\r\n  const p = task.querySelector(\"p\");\r\n  const li = task.querySelector(\"li\");\r\n  const text = p.textContent;\r\n  const input = document.createElement(\"input\");\r\n  input.setAttribute(\"type\", \"text\");\r\n  input.value = text;\r\n  input.addEventListener(\"keypress\", (e) => {\r\n    if (e.key === \"Enter\") saveEditTask(e);\r\n  });\r\n  const saveButton = document.createElement(\"button\");\r\n  saveButton.textContent = \"Save\";\r\n  saveButton.addEventListener(\"click\", saveEditTask);\r\n  const div = document.createElement(\"div\");\r\n  div.setAttribute(\"id\", \"save\");\r\n  div.appendChild(input);\r\n  div.appendChild(saveButton);\r\n  li.replaceChild(div, p);\r\n  localStorage.setItem(\"taskList\", JSON.stringify(toDoList));\r\n};\r\n\r\nconst handleAddTask = (name = \"\", completed = false, newTask = true) => {\r\n  if (!name) return;\r\n  const index = toDoList.length + 1;\r\n  toDoList.push({ name, completed, index });\r\n  const deleteButton = document.createElement(\"button\");\r\n  deleteButton.textContent = \"Delete\";\r\n  deleteButton.addEventListener(\"click\", deleteTask);\r\n  const editButton = document.createElement(\"button\");\r\n  editButton.textContent = \"Edit\";\r\n  editButton.addEventListener(\"click\", editTask);\r\n  const checkbox = document.createElement(\"input\");\r\n  checkbox.setAttribute(\"type\", \"checkbox\");\r\n  checkbox.checked = completed;\r\n  checkbox.addEventListener(\"change\", handleCheckbox);\r\n  const task = document.createElement(\"div\");\r\n  const li = document.createElement(\"li\");\r\n  li.setAttribute(\"id\", toDoList.length);\r\n  const p = document.createElement(\"p\");\r\n  p.textContent = name;\r\n  li.appendChild(checkbox);\r\n  li.appendChild(p);\r\n  task.appendChild(li);\r\n  task.appendChild(deleteButton);\r\n  task.appendChild(editButton);\r\n  listContainer.appendChild(task);\r\n  input.value = \"\";\r\n  newTodo = \"\";\r\n  if (newTask) {\r\n    localStorage.setItem(\"taskList\", JSON.stringify(toDoList));\r\n  }\r\n};\r\n\r\n// this is were the java script code sarts to execute\r\n\r\ninput.addEventListener(\"input\", (e) => {\r\n  newTodo = e.target.value;\r\n});\r\n\r\naddButton.addEventListener(\"click\", (e) => handleAddTask(newTodo));\r\n\r\ninput.addEventListener(\"keypress\", (e) => {\r\n  if (e.key === \"Enter\") handleAddTask(newTodo);\r\n});\r\n\r\nclearAll.addEventListener(\"click\", (e) => {\r\n  localStorage.setItem(\"taskList\", JSON.stringify([]));\r\n  listContainer.innerHTML = \"\";\r\n});\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n  const initialList = localStorage.getItem(\"taskList\")\r\n    ? JSON.parse(localStorage.getItem(\"taskList\"))\r\n    : [];\r\n  initialList.forEach((task) =>\r\n    handleAddTask(task.name, task.completed, false)\r\n  );\r\n});\r\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;