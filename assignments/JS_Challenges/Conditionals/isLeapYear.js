// You just need to implement the isLeapYear function
function isLeapYear(year) {
    // Return "Leap Year" if the year is a leap year, otherwise return "Not a Leap Year"
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return "Leap Year";
    } else {
        return "Not a Leap Year";
    }
}

console.log(isLeapYear(2020));
console.log(isLeapYear(1900));
console.log(isLeapYear(2000));