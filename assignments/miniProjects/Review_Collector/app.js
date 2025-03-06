const submitBtn = document.getElementById("submitBtn");
const outputDiv = document.getElementById("replace-div");
const stars = document.querySelectorAll(".stars");
let selectedRating = 0;

function color(n) {
    selectedRating = n;
    stars.forEach((star, i) => {
        star.style.color = i < n ? "gold" : "#000";
    });
}

submitBtn.addEventListener("click", () => {
    const userName = document.getElementById("name");
    const review = document.getElementById("textarea");

    if (userName.value === "" || review.value === "" || selectedRating === 0) {
        alert("Please enter the required details and select a rating.");
        return;
    }
    outputDiv.innerHTML = "";

    const ul = document.createElement("ul");
    ul.classList.add("ulCard");

    const liCard = document.createElement("li");
    liCard.classList.add("liCard");

    const nameSpan = document.createElement("span");
    nameSpan.innerHTML = userName.value;
    liCard.appendChild(nameSpan);

    const starSpan = document.createElement("span");
    starSpan.innerHTML = "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating);
    liCard.appendChild(starSpan);

    const reviewSpan = document.createElement("span");
    reviewSpan.innerHTML = review.value;
    liCard.appendChild(reviewSpan);


    ul.appendChild(liCard);
    outputDiv.appendChild(ul);
    userName.value = "";
    review.value = "";
    stars.forEach((star) => (star.style.color = "#000"));
});