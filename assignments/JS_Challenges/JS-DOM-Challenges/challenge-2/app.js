const redButton = document.getElementById("redButton");
const greenbutton = document.getElementById("greenButton");
const blueButton = document.getElementById("blueButton");
const purpleButton = document.getElementById("purpleButton");
const resetButton = document.getElementById("resetButton");
const mainHeading = document.getElementById("mainHeading");

redButton.addEventListener("click", () => {
    mainHeading.style.color = "#e74c3c";
});

greenbutton.addEventListener("click", () => {
    mainHeading.style.color = "#2ecc71";
});

blueButton.addEventListener("click", () => {
    mainHeading.style.color = "#3498db";
});

purpleButton.addEventListener("click", () => {
    mainHeading.style.color = "#9b59b6";
});

resetButton.addEventListener("click", () => {
    mainHeading.style.color = "#34495e";
});
