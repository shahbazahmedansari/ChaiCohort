const billAmountInput = document.getElementById("billAmount");
const tipPercentageInput = document.getElementById("tipPercentage");
const peopleNumberInput = document.getElementById("peopleNumber");
const calculateTipButton = document.getElementById("calculateTip");
const totalTipDisplay = document.getElementById("totalTip");
const tipPerPersonDisplay = document.getElementById("tipPerPerson");


function calculateTip() {
    const billAmount = parseFloat(billAmountInput.value);
    const tipPercenetage = parseFloat(tipPercentageInput.value);
    const numPeople = parseInt(peopleNumberInput.value);

    // validation
    if (Number.isNaN(billAmount) || Number.isNaN(tipPercenetage) || Number.isNaN(numPeople)) {
        alert("Please enter valid values for all fields");
        return;
    }

    const totalTip = (billAmount * tipPercenetage) / 100;
    const tipPerPerson = totalTip / numPeople;

    totalTipDisplay.textContent = `Total Tip: $${totalTip.toFixed(2)}`;
    tipPerPersonDisplay.textContent = `Tip Per Person: $${tipPerPerson.toFixed(2)}`;
}

calculateTipButton.addEventListener("click", calculateTip);
