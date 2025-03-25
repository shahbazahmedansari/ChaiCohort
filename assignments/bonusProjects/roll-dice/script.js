const dice = document.getElementById("dice");
const rollButton = document.getElementById("rollButton");
const resultMessage = document.getElementById("resultMessage");

const diceFaces = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];

function rollDice() {
    const randomIndex = Math.floor(Math.random() * 6);

    dice.innerText = diceFaces[randomIndex];

    resultMessage.innerText = `You rolled a ${randomIndex + 1}`;
}

rollButton.addEventListener("click", rollDice);
