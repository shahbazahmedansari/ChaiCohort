const limit = 200;

const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const warningMessage = document.getElementById("warningMessage");

function countCharacter() {
    const charCountValue = textInput.value.length;
    charCount.innerHTML = `${charCountValue} / ${limit} characters`;
    warningMessage.innerHTML = "";

    if (charCountValue < limit) {
        charCount.style.color = "green";
    } else if (charCountValue === limit) {
        charCount.style.color = "blue";
    } else {
        charCount.style.color = "red";
        warningMessage.innerHTML = "Character limit exceeded";
    }
}

textInput.addEventListener("input", countCharacter);