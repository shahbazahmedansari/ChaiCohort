const toggleBtn = document.querySelector(".toggle-btn");
const panel = document.querySelector(".panel");
const closeBtn = document.querySelector(".close-btn");

toggleBtn.addEventListener("click", () => {
    panel.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    panel.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if (!toggleBtn.contains(e.target)) {
        panel.classList.remove("active");
    }
});