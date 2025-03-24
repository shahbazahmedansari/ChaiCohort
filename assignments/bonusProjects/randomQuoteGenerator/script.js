const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do what you can, with what you have, where you are.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Dream big and dare to fail.",
    "Believe in yourself and all that you are.",
    "Act as if what you do makes a difference. It does.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "Opportunities don't happen. You create them.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "Do what is right, not what is easy nor what is popular.",
    "Happiness is not something ready-made. It comes from your own actions.",
    "If you want to achieve greatness, stop asking for permission.",
    "Everything you’ve ever wanted is on the other side of fear.",
    "Your time is limited, so don’t waste it living someone else’s life.",
    "The best way to predict the future is to create it."
];

const generateButton = document.getElementById("generateButton");

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = quote;
}

generateButton.addEventListener("click", generateQuote);