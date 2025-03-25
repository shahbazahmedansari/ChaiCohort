const colorButton = document.getElementById("colorButton");

function updateBackgroundColor() {
    // Color: RGB
    // R: 0 - 255
    // G: 0 - 255
    // B: 0 - 255

    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

colorButton.addEventListener("click", updateBackgroundColor);