const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const ul = document.getElementById("todo-list");

addBtn.addEventListener("click", function () {
    const value = todoInput.value;
    console.log(value);

    const li = document.createElement("li");
    li.innerText = value;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(deleteBtn);

    ul.appendChild(li);
    todoInput.value = "";
});
