let tasks = [];

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");

const trashIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">' +
  '<path d="M9 3h6l1 2h4v2H4V5h4l1-2zm-3 6h12l-1 12H7L6 9zm4 2v8h2v-8h-2zm4 0v8h2v-8h-2z"/>' +
  "</svg>";

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({
    id: Date.now(),
    description: text,
    completed: false,
  });

  input.value = "";
  renderTasks();
}

function toggleTask(id) {
  tasks.forEach((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function renderTasks() {
  list.innerHTML = "";

  const pending = tasks.filter((task) => !task.completed);
  const done = tasks.filter((task) => task.completed);
  const ordered = pending.concat(done);

  ordered.forEach((task) => {
    const li = document.createElement("li");
    li.className = "flex items-center gap-3 py-2 border-b-2 border-gray-200";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className =
      "appearance-none shrink-0 w-5 h-5 rounded-md border-2 border-gray-700 cursor-pointer checked:bg-gray-500 checked:border-gray-500";
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.textContent = task.description;
    text.className = task.completed ? "grow line-through text-gray-400" : "grow";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = trashIcon;
    deleteBtn.className = "btn btn-ghost btn-xs";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTask();
});

renderTasks();
