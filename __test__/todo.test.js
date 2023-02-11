import indexModule from "../src/index.js";

const handleAddTask = indexModule.handleAddTask;
const dom = indexModule.dom;

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
    let editIcon = tasks.querySelector(".uil-pen");
    // console.log(tasks.innerHTML);
    let p = tasks.querySelector("p");
    // console.log(p.textContent);
    expect(p.textContent).toBe("yemi");

    editIcon.click();
    let editor = tasks.querySelector("#save");
    let input = editor.querySelector("input");
    let saveButton = editor.querySelector("button");
    input.value = "new value";
    saveButton.click();
    p = tasks.querySelector("p");
    expect(p.textContent).toBe("new value");
    // console.log(p.textContent);
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
