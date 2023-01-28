import './style.css';

const todoInput = document.querySelector('.todo-input input');
const taskBox = document.querySelector('.task-box');
const clearAll = document.querySelector('.clear');
const filters = document.querySelectorAll('.filters span');
let editId;
let isEditTask = false;
let todos = JSON.parse(localStorage.getItem('todo-list'));

function showTodo(filter) {
  let liTag = '';
  if (todos) {
    todos.forEach((todo, id) => {
      const completed = todo.status === 'completed' ? 'checked' : '';
      if (filter === todo.status || filter === 'all') {
        liTag += `<li class="task">
        <article class="task-manager">
                          <label for="${id}">
                              <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                              <p class="${completed}">${todo.name}</p>
                          </label>
                          <div class="menu">
                              <i onclick="showMenu(this)" id="showMenu" class="uil uil-ellipsis-h"></i>
                              <ul class="task-menu">
                                  <li class="editTask" onclick="editTask(${id}, "${todo.name}")"><i class="uil uil-pen"></i></li>
                                  <li class="deleteTask" onclick="deleteTask(${id}, "${filter}")"><i class="uil uil-trash"></i></li>
                              </ul>
                          </div>
                      </li>
                      </article>
                           <hr>`;
      }
    });
  }
  taskBox.innerHTML = liTag;
}
showTodo();

filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('span.active').classList.remove('active');
    btn.classList.add('active');
    showTodo(btn.id);
  });
});
clearAll.addEventListener('click', () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo();
});

todoInput.addEventListener('keyup', (e) => {
  const userTask = todoInput.value.trim();
  if (e.key === 'Enter' && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      const taskInfo = { name: userTask, status: 'pending' };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    todoInput.value = '';
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo(document.querySelector('span.active').id);
  }
});

const showMenu = document.querySelector('#showMenu');

showMenu.addEventListener('click', (selectedTask) => {
  const menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add('show');
  document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'I' || e.target !== selectedTask) {
      menuDiv.classList.remove('show');
    }
  });
});

const updateStatus = document.querySelector('refreshe');

updateStatus.addEventListener('click', (selectedTask) => {
  const taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add('checked');
    todos[selectedTask.id].status = 'completed';
  } else {
    taskName.classList.remove('checked');
    todos[selectedTask.id].status = 'pending';
  }
  localStorage.setItem('todo-list', JSON.stringify(todos));
});

const editTask = document.querySelector('.editTask');

editTask.addEventListener('click', (taskId, textName) => {
  editId = taskId;
  isEditTask = true;
  todoInput.value = textName;
  todoInput.focus();
  todoInput.classList.add('active');
});

const deleteTask = document.querySelector('.deleteTask');

deleteTask.addEventListener('click', (deleteId, filter) => {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo(filter);
});
