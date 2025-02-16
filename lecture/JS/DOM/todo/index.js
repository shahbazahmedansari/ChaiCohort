const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const ul = document.getElementById("todo-list");


addBtn.addEventListener('click', () => {
    const value = todoInput.value;
    console.log('User entered', value);

    const li = document.createElement('li');
    li.innerText = value;

    const delButton = document.createElement('button');
    delButton.innerText = "X";
    delButton.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(delButton);

    console.log(li);

    ul.appendChild(li);
    todoInput.value = "";
});
