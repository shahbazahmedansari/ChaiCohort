const inputText = document.getElementById("inputText");
const checkPalindromeButton = document.getElementById("checkPalindrome");
const resultDisplay = document.getElementById("result");

function checkPalindorme() {
    const text = inputText.value.toLowerCase().replace(/[^a-z0-9]/g, "");
    console.log(text);
    const reversedText = text.split("").reverse().join("");
    console.log(reversedText);

    if (text === reversedText) {
        resultDisplay.innerText = `${inputText.value} is a Palindrome`;
        resultDisplay.style.color = "green";
    } else {
        resultDisplay.innerText = `${inputText.value} is NOT a Palindrome`;
        resultDisplay.style.color = "red";
    }
}

checkPalindromeButton.addEventListener("click", checkPalindorme);