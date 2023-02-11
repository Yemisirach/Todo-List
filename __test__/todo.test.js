import indexModule from "../src/index.js";

import { handleAddTask, dom } from "./src/index.js";

document.body.innerHTML = `<body>
<section id="outer-cont">
  <div class="wrapper" id="toDoContainer">
    <article class="todo-heder">
      <h2>Today's todo</h2>
    </article>
    <hr />
    <div class="todo-input">
      <input type="text" id="todo" placeholder="Add a new task..." />
      <li class="uil-refreshe refreshe">
        <button id="add">
          <iconify-icon icon="bx:refresh"></iconify-icon>
        </button>
      </li>
    </div>
    <ul id="task-list"></ul>
    <div id="clear">
      <button id="clearAll">Clear All completed</button>
    </div>
  </div>
</section>
</body>`;
describe("Add task list and local Storage", () => {
  dom();
  test("check local Storage is null", () => {
    expect(JSON.parse(localStorage.getItem("taskList"))).toEqual(null);
  });

  test("check add task ", () => {
    handleAddTask("yemi", "false", true);
    handleAddTask("yemi", "false", true);
    handleAddTask("yemi", "false", true);
    handleAddTask("yemi", "false", true);
    handleAddTask("yemi", "false", true);
    expect(JSON.parse(localStorage.getItem("taskList")).length).toBe(5);
  });
});
describe("Assert edit task ", () => {
  it("assert edit", () => {
    handleAddTask("yemi", "false", true);
    const tasks = document.querySelector("#task-list");
    const editIcon = tasks.querySelector(".uil-pen");
    let p = tasks.querySelector("p");
    expect(p.textContent).toBe("yemi");

    editIcon.click();
    const editor = tasks.querySelector("#save");
    const input = editor.querySelector("input");
    const saveButton = editor.querySelector("button");
    input.value = "new value";
    saveButton.click();
    p = tasks.querySelector("p");
    expect(p.textContent).toBe("new value");
  });
});

describe("DOM for Add and delete task", () => {
  test("Delet task from task list", () => {
    const tasks = document.querySelector("#task-list");
    let deleteButton = tasks.querySelector(".uil-trash");
    deleteButton.click();
    expect(JSON.parse(localStorage.getItem("taskList")).length).toBe(5);
    deleteButton = tasks.querySelector(".uil-trash");
    deleteButton.click();
    expect(JSON.parse(localStorage.getItem("taskList")).length).toBe(4);
    deleteButton = tasks.querySelector(".uil-trash");
    deleteButton.click();
    expect(JSON.parse(localStorage.getItem("taskList")).length).toBe(3);
    deleteButton = tasks.querySelector(".uil-trash");
    deleteButton.click();
    expect(JSON.parse(localStorage.getItem("taskList")).length).toBe(2);
    deleteButton = tasks.querySelector(".uil-trash");
    deleteButton.click();
    expect(JSON.parse(localStorage.getItem("taskList")).length).toBe(1);
  });
});
