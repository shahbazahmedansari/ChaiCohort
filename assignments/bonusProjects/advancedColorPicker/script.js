const colorInput = document.getElementById("colorInput");
const colorCode = document.getElementById("colorCode");
const copyButton = document.getElementById("copyButton");
const complementaryContainer = document.getElementById("complementaryContainer");
const saveColorButton = document.getElementById("saveColorButton");
const favoritesContainer = document.getElementById("favoritesContainer");

colorInput.addEventListener("input", () => {
    const selectedColor = colorInput.value;
    console.log(selectedColor);
    updateSelectedColor(selectedColor);
    showComplementoryColor(selectedColor);
});

function updateSelectedColor(color) {
    colorCode.textContent = color;
    colorCode.style.color = color;
}

function showComplementoryColor(color) {
    const complementoryColors = getComplementoryColor(color);
    complementaryContainer.innerHTML = ""; // clear previous color

    complementoryColors.forEach((compColor) => {
        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = compColor;
        complementaryContainer.appendChild(colorBox);
    });
}

function getComplementoryColor(color) {
    const base = parseInt(color.slice(1), 16);
    const complement = (0xFFFFFF ^ base).toString(16).padStart(6, "0");
    return [`#${complement}`];
}

copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(colorCode.textContent)
        .then(() => alert("Color copied to clipboard"))
        .catch(err => console.error("Failed to copy color", err));
});

saveColorButton.addEventListener('click', () => {
    const color = colorCode.textContent;
    addFavoriteColor(color);
});

function addFavoriteColor(color) {
    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.style.backgroundColor = color;
    colorBox.title = color;
    favoritesContainer.appendChild(colorBox);
}