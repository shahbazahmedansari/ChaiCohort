const addBtn = document.getElementById("add-btn");
const ul = document.getElementById("todo-list");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

const todos = [];

addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    ul.innerText = "";

    const todoInput = document.getElementById("todo-input");

    todos.push({
        id: Date.now(),
        completed: false,
        title: todoInput.value,
    });
    renderTodo();
    updateTasks();
    todoInput.value = "";
});

function updateTasks() {
    const totalTaskNumber = todos.length;
    totalTasks.innerText = `Total Tasks: ${totalTaskNumber}`;
    const completedFilter = todos.filter(todo => todo.completed);
    completedTasks.innerText = `Completed: ${completedFilter.length}`;
}

function renderTodo() {
    todos.map(todo => {
        const newList = document.createElement("li");
        newList.classList.add("newList");
        const newDiv = document.createElement("div");
        newDiv.classList.add("textDiv");
        const para = document.createElement("p");
        para.innerText = todo.title;

        const checkBox = document.createElement("input");
        checkBox.type = "checkBox";
        checkBox.classList.add("complete-checkbox");
        checkBox.addEventListener("change", (e) => {
            e.preventDefault();
            todo.completed = !todo.completed;
            if (todo.completed) {
                para.style.color = "gray";
                para.style.textDecoration = "line-through";
            } else {
                para.style.color = "";
                para.style.textDecoration = "";
            }
            updateTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
            const todoIndex = todos.findIndex(t => t.id === todo.id);
            if (todoIndex !== -1) {
                todos.splice(todoIndex, 1);
                newList.remove();
            }
            updateTasks();
        });

        newDiv.appendChild(checkBox);
        newDiv.appendChild(para);
        newList.appendChild(newDiv);
        newList.appendChild(deleteButton);
        ul.appendChild(newList);
    });
}
