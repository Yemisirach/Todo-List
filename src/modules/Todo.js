class Todo {
  constructor() {
    this.showMenu();
    this.updateStatus();
    editTask();
    deleteTask();
    clear();
  }
  showMenu = (selectedTask) => {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", (e) => {
      if (e.target.tagName != "I" || e.target != selectedTask) {
        menuDiv.classList.remove("show");
      }
    });
  };

  updateStatus = (selectedTask) => {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
      taskName.classList.add("checked");
      todos[selectedTask.id].status = "completed";
    } else {
      taskName.classList.remove("checked");
      todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
  };

  editTask = (taskId, textName) => {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
  };

  deleteTask = (deleteId, filter) => {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
  };
}

export default Todo;
