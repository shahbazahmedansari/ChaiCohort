const startButton = document.getElementById("startButton");
const timeInput = document.getElementById("timeInput");
const countdownDisplay = document.getElementById("countdownDisplay");

function startTimer() {
    let valueInSeconds = parseInt(timeInput.value);
    if (isNaN(valueInSeconds)) {
        countdownDisplay.innerText = "Please enter a valid number";
        countdownDisplay.style.color = "red";
        return;
    }

    if (valueInSeconds <= 0) {
        countdownDisplay.innerText = "Please enter a number > 0";
        countdownDisplay.style.color = "red";
        return;
    }

    let timeInterval = setInterval(() => {
        valueInSeconds--;
        countdownDisplay.innerText = `Time remaining: ${valueInSeconds} seconds`;

        function resumeTimer() {
            if (timeInterval) {
                timeInterval = setInterval(() => {
                    valueInSeconds--;
                    countdownDisplay.innerText = `Time remaining: ${valueInSeconds} seconds`;
                    if (valueInSeconds <= 0) {
                        clearInterval(timeInterval);
                        countdownDisplay.innerText = "Time Up 🕣";
                    }
                }, 1000);
            }
        }

        function pauseTimer() {
            clearInterval(timeInterval);
        }

        const newDiv = document.createElement("div");
        const resumeButton = document.createElement("button");
        resumeButton.innerText = "Resume";
        resumeButton.addEventListener("click", resumeTimer);

        const pauseButton = document.createElement("button");
        pauseButton.innerText = "Pause";
        pauseButton.addEventListener("click", pauseTimer);

        newDiv.appendChild(resumeButton);
        newDiv.appendChild(pauseButton);

        countdownDisplay.appendChild(newDiv);
        if (valueInSeconds <= 0) {
            clearInterval(timeInterval);
            countdownDisplay.innerText = "Time Up 🕣";
        }
    }, 1000);
}

// Task: Create a resume and pause button while the countdown is working

startButton.addEventListener("click", startTimer);