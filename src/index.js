import "./style.css";
import _ from "lodash";

const ToDoTask = document.getElementById("ToDoTask");

const toDoslist = [
  {
    description: "wash car",
    completed: "false",
    index: "1",
  },
  {
    description: "complet project",
    completed: "false",
    index: "2",
  },
  {
    description: "go to Gym",
    completed: "false",
    index: "3",
  },
];

ToDoTask.innerHTML = `
  <article>
    <h2>Today's todo </h2>
    <iconify-icon icon="bx:refresh"></iconify-icon>
  </article>
  <hr>
  <form>
    <input type="text" id="todo" class="todo-input" placeholder="Add to your list...">
    <button type="submit" id="addBtn" value><iconify-icon icon="uil:enter"></iconify-icon></button>
  </form>
  <hr>
`;

function showtodos() {
  toDoslist.forEach((toDo) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task");
    listItem.innerHTML = ` 
      <input type="checkbox">
      <label>${toDo.description}</label>
      <iconify-icon icon="ph:dots-three-outline-vertical-fill" class="dots"></iconify-icon>
      <hr>  
    `;

    ToDoTask.append(listItem);
  });
}
showtodos();
