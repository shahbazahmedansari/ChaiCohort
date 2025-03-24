const colorInput = document.getElementById("colorInput");
const colorCode = document.getElementById("colorCode");
const copyButton = document.getElementById("copyButton");
const complementaryContainer = document.getElementById("complementaryContainer");
const saveColorButton = document.getElementById("saveColorButton");
const favoritesContainer = document.getElementById("favoritesContainer");

colorInput.addEventListener("input", () => {
    const selectedColor = colorInput.value;
    updateColorCode(selectedColor);
    showCompensatoryColor(selectedColor);
});

function showCompensatoryColor(color) {
    const complementoryColors = getCompensatoryColor(color);
    complementaryContainer.innerHTML = "";

    complementoryColors.forEach((color) => {
        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color;
        complementaryContainer.appendChild(colorBox);
    });
}

function getCompensatoryColor(compColor) {
    const base = parseInt(compColor.slice(1), 16);
    const complement = (0xFFFFFF ^ base).toString(16).padStart(6, "0");
    return [`#${complement}`];
}

function updateColorCode(color) {
    colorCode.innerHTML = color;
    colorCode.style.color = color;
}

copyButton.addEventListener("click", () => {
    const color = colorCode.innerHTML;
    navigator.clipboard.writeText(color);
    alert("Color copied to clipboard");
});

saveColorButton.addEventListener("click", () => {
    const color = colorCode.innerHTML;
    addFavoriteColor(color);
});

function addFavoriteColor(color) {
    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.style.backgroundColor = color;
    colorBox.title = color;
    favoritesContainer.appendChild(colorBox);
}