function shinyDiamondRug(n) {
    let result = "";

    // Upper part of the diamond
    for (let i = 1; i <= n; i++) {
        let spaces = " ".repeat(n - i);
        let stars = "*".repeat(2 * i - 1);
        result += stars + spaces + "\n";
    }

    // Lower part of the diamond
    for (let i = n - 1; i >= 1; i--) {
        let spaces = " ".repeat(n - i);
        let stars = "*".repeat(2 * i - 1);
        result += spaces + stars;
        if (i > 1) result += "\n";
    }
}

console.log(shinyDiamondRug(3));