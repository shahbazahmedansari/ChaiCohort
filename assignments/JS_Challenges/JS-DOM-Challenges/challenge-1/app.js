const toggleButton = document.getElementById("toggleButton");
const statusText = document.getElementById("status");
const bulb = document.getElementById("bulb");
const body = document.getElementById("body");

toggleButton.addEventListener("click", () => {
    if (toggleButton.innerText === "Turn On") {
        body.classList.add("dark-mode");
        bulb.classList.remove("off");
        toggleButton.innerText = "Turn Off";
        statusText.innerText = "Status: On";
    } else {
        body.classList.remove("dark-mode");
        bulb.classList.add("off");
        toggleButton.innerText = "Turn On";
        statusText.innerText = "Status: Off";
    }
});
