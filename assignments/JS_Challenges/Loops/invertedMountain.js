function invertedMountain(n) {
    let result = '';
    for (let i = n; i >= 1; i--) {
        result += "*".repeat(i);
        if (i > 1) result += "\n";
    }
    return result;
}

console.log(invertedMountain(5));