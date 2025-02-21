const addButton = document.getElementById("addButton");
const ulTaskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

const todos = [];

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    ulTaskList.innerText = "";
    const taskInput = document.getElementById("taskInput");

    todos.push({
        id: Date.now(),
        completed: false,
        title: taskInput.value,
    });
    taskInput.value = "";
    renderList();
    updateTasks();
});

function updateTasks() {
    const totalNumberofTasks = todos.length;
    totalTasks.innerText = `Total tasks: ${totalNumberofTasks}`;
    const completedNumber = todos.filter(todo => todo.completed);
    completedTasks.innerText = `Completed: ${completedNumber.length}`;
}

function renderList() {
    todos.map(todo => {
        const newList = document.createElement("li");
        newList.classList.add("task-item");
        const para = document.createElement("p");
        para.innerText = todo.title;

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.addEventListener("change", (e) => {
            e.preventDefault();
            todo.completed = !todo.completed;
            if (todo.completed === true) {
                para.style.color = "#95a5a6";
                para.style.textDecoration = "line-through";
            } else {
                para.style.color = "";
                para.style.textDecoration = "";
            }
            updateTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            newList.remove();
        });

        newList.appendChild(checkBox);
        newList.appendChild(para);
        newList.appendChild(deleteButton);

        ulTaskList.appendChild(newList);
    });
}