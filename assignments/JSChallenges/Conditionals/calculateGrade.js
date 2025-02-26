// You just need to implement the calculateGrade function
function calculateGrade(marks) {
    // Return grade based on the marks
    if (marks >= 90) {
        return "A";
    } else if (marks >= 80 && marks < 90) {
        return "B";
    } else if (marks >= 70 && marks < 80) {
        return "C";
    } else if (marks >= 60 && marks < 70) {
        return "D";
    } else {
        return "F";
    }
}

console.log(calculateGrade(85));
console.log(calculateGrade(45));
console.log(calculateGrade(92));