import './style.css';

const Task_Title = document.querySelector("#new_task_title") as HTMLInputElement;
const add_button = document.getElementById("add_btn") as HTMLButtonElement;
const add_list = document.getElementById("list") as HTMLUListElement;

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task: { id: string; text: string }) => {
    addTaskToDOM(task.id, task.text);
  });
}
function addTaskToDOM(listid: string, text: string) {
  const li = document.createElement("li");
  li.id = listid;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.todo = listid;

  const span = document.createElement("span");
  span.innerText = text;

  const deleteButton = document.createElement("button");
deleteButton.innerHTML = `<img src="image/deletePNG.PNG" alt="Delete" style="width: 16px; height: 16px;" />`;

  deleteButton.addEventListener("click", () => {
  
    li.remove();

  

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.filter((task: { id: string }) => task.id !== listid);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  });

  checkbox.addEventListener("click", (ev) => {
    const target = ev.target as HTMLInputElement;
    const targettodo = target.dataset.todo;
    const targetspan = document.querySelector(`#${targettodo} span`) as HTMLSpanElement;
    if (targetspan) {
      targetspan.className = target.checked ? "checked" : "";
    }
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  add_list.appendChild(li);
}


add_button?.addEventListener("click", () => {
  const listid = `item-${Date.now()}`;
  const text = Task_Title.value;

  if (text.trim() === "") return; 

  addTaskToDOM(listid, text);

  
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push({ id: listid, text });
  localStorage.setItem("tasks", JSON.stringify(tasks));


  Task_Title.value = "";
  add_button.disabled = true;
});


Task_Title.addEventListener("keyup", (ev) => {
  const input = ev.target as HTMLInputElement;
  add_button.disabled = input.value.trim() !== "" ? false : true;
});

loadTasks();
