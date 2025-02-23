const displayValue = document.getElementById("displayValue");
const clearButton = document.getElementById("clear-button");

function appendValue(value) {
    displayValue.value += value;
}

function clearDisplay() {
    displayValue.value = "";
}

function calculateResult() {
    try {
        displayValue.value = eval(displayValue.value);
    } catch (error) {
        displayValue.value = "Error";
    }
}

clearButton.addEventListener("click", clearDisplay);
