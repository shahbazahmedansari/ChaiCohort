// You just need to implement the workingDays function
function workingDays(days) {
    // your code here
    let totalWorkingDays = 0;
    for (let i = 0; i < days.length; i++) {
        if (days[i] === "Saturday" || days[i] === "Sunday") {
            totalWorkingDays = totalWorkingDays + 0;
        } else {
            totalWorkingDays++;
        }
    }
    return totalWorkingDays;
}

console.log(workingDays(["Monday", "Friday", "Saturday"]));
