function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

const themeButton = document.getElementById("toggle-btn");

themeButton.addEventListener("click", () => {
    const currentColor = document.body.style.backgroundColor;
    if (!currentColor || currentColor == "white") {
        changeBackgroundColor("black");
        themeButton.innerText = "Light Mode";
    } else {
        changeBackgroundColor("white");
        themeButton.innerText = "Dark Mode";
    }
});
