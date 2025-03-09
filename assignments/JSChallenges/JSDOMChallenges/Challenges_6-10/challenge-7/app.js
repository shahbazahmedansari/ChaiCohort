const accordianBtn = document.querySelectorAll(".accordion-button");
Array.from(accordianBtn);

accordianBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;
        const content = btn.nextElementSibling;
        console.log(item, content);

        const arrow = document.querySelector(".arrow");
        console.log(arrow);

        item.classList.toggle("active");

        // Expand or collapse the accordian
        if (item.classList.contains("active")) {
            content.style.maxHeight = content.scrollHeight + "px"; // add the size of the content
            arrow.textContent = "↓";
        } else {
            content.style.maxHeight = null;
            arrow.textContent = "↑"; // Change arrow direction
        }
    });
});