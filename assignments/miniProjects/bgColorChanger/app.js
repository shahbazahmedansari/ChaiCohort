const input = document.getElementById("inputColor");
const addBtn = document.getElementById("addBtn");
const newBtnDiv = document.getElementById("newBtnContainer");

function FilterToHex(val) {
    val = val.trim();
    if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
        return val;
    }
    return val;
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value === "") {
        alert("Please enter a color input");
        return;
    }
    const value = FilterToHex(input.value);
    const newBtn = document.createElement("button");
    newBtn.innerHTML = input.value;
    newBtn.setAttribute("type", "submit");
    newBtn.classList.add("newBtn");
    console.log(newBtn);

    newBtnDiv.appendChild(newBtn);
    newBtn.addEventListener("click", onNewBtnClick(value));
    input.value = "";
});



function onNewBtnClick(value) {
    return function (e) {
        e.preventDefault();
        document.body.style.backgroundColor = value;
    };
}




