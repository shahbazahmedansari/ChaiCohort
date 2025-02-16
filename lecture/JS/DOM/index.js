function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

const toggleBtn = document.getElementById("toggle-btn");
const changeColor = "white";

toggleBtn.addEventListener("click", () => {
    if (!changeColor || changeColor == "white") {
        document.body.style.backgroundColor = "black";
    } else {
        document.body.style.backgroundColor = "white";
    }
});